import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Box } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <Paper elevation={3} sx={styles.tablePaper}>
                <Typography variant="h5" sx={styles.sectionTitle}>
                    Subject Marks
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow sx={styles.tableHeaderRow}>
                            <StyledTableCell sx={styles.tableHeaderCell}>Subject</StyledTableCell>
                            <StyledTableCell sx={styles.tableHeaderCell}>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index} sx={styles.tableBodyRow}>
                                    <StyledTableCell sx={styles.tableBodyCell}>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell sx={styles.tableBodyCell}>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    };

    const renderChartSection = () => {
        return (
            <Paper elevation={3} sx={styles.chartPaper}>
                <Typography variant="h5" sx={styles.sectionTitle}>
                    Subject Marks Chart
                </Typography>
                {subjectMarks.length > 0 ? (
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                ) : (
                    <Typography variant="h6" sx={styles.noDataText}>No marks data for chart yet.</Typography>
                )}
            </Paper>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Paper elevation={3} sx={styles.classDetailsPaper}>
                <Typography variant="h5" sx={styles.sectionTitle}>
                    Class Details
                </Typography>
                <Typography variant="h6" sx={styles.classDetailText}>
                    You are currently in Class: <Typography component="span" sx={styles.classDetailValue}>{sclassDetails && sclassDetails.sclassName}</Typography>
                </Typography>
                <Typography variant="h6" sx={styles.subjectsListTitle}>
                    And these are the subjects:
                </Typography>
                <Box sx={styles.subjectsListBox}>
                    {subjectsList && subjectsList.length > 0 ?
                        subjectsList.map((subject, index) => (
                            <Typography variant="subtitle1" key={index} sx={styles.subjectItem}>
                                {subject.subName} ({subject.subCode})
                            </Typography>
                        ))
                        :
                        <Typography variant="body1" sx={styles.noDataText}>No subjects found for your class.</Typography>
                    }
                </Box>
            </Paper>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Typography variant="h6" sx={styles.loadingText}>Loading subject details...</Typography>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={styles.bottomNavPaper} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table View"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                        sx={styles.bottomNavAction}
                                    />
                                    <BottomNavigationAction
                                        label="Chart View"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                        sx={styles.bottomNavAction}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </Container>
    );
};

export default StudentSubjects;

const styles = {
    tablePaper: {
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        mb: 8,
    },
    chartPaper: {
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        mb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '450px',
    },
    classDetailsPaper: {
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        mt: 4,
    },
    sectionTitle: {
        fontSize: '1.8rem',
        fontWeight: 600,
        color: '#6a0572',
        mb: 3,
        textAlign: 'center',
    },
    tableHeaderRow: {
        backgroundColor: '#F8F9FA',
    },
    tableHeaderCell: {
        fontWeight: 600,
        color: '#495057',
        fontSize: '0.95rem',
        padding: '12px 16px',
    },
    tableBodyRow: {
        '&:hover': {
            backgroundColor: '#F0F3F6',
        },
    },
    tableBodyCell: {
        color: '#343A40',
        fontSize: '0.9rem',
        padding: '10px 16px',
    },
    bottomNavPaper: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
    },
    bottomNavAction: {
        color: '#666666',
        '&.Mui-selected': {
            color: '#6a0572',
            fontWeight: 600,
        },
    },
    loadingText: {
        color: '#555555',
        fontSize: '1.1rem',
        fontWeight: 500,
        textAlign: 'center',
        mt: 5,
    },
    noDataText: {
        color: '#777777',
        fontSize: '1.1rem',
        fontWeight: 500,
        textAlign: 'center',
    },
    classDetailText: {
        fontSize: '1.1rem',
        color: '#555555',
        mb: 1.5,
    },
    classDetailValue: {
        fontWeight: 600,
        color: '#333333',
    },
    subjectsListTitle: {
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#333333',
        mt: 3,
        mb: 2,
    },
    subjectsListBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    subjectItem: {
        fontSize: '1rem',
        color: '#495057',
        padding: '5px 10px',
        backgroundColor: '#f0f3f6',
        borderRadius: '5px',
        width: 'fit-content',
        margin: '0 auto',
    },
};