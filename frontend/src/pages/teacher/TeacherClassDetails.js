import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem, Container, CircularProgress } from '@mui/material';
import { BlackButton, BlueButton, LightPurpleButton, PurpleButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
        return <Typography variant="h6" sx={styles.errorText}>Error loading class details.</Typography>;
    }

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    });

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
        };
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };
        return (
            <>
                <LightPurpleButton
                    variant="contained"
                    onClick={() =>
                        navigate("/Teacher/class/student/" + row.id)
                    }
                    sx={styles.viewButton}
                >
                    View
                </LightPurpleButton>
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" sx={styles.buttonGroup}>
                        <Button onClick={handleClick} sx={styles.splitButtonMain}>{options[selectedIndex]}</Button>
                        <PurpleButton
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                            sx={styles.splitButtonDropdown}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </PurpleButton>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper sx={styles.popperPaper}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                    sx={styles.menuItem}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </>
        );
    };

    return (
        <Container maxWidth="lg" sx={styles.container}>
            {loading ? (
                <Typography variant="h6" sx={styles.loadingText}>Loading class details...</Typography>
            ) : (
                <>
                    <Typography variant="h4" sx={styles.pageTitle}>
                        Class Details
                    </Typography>
                    {getresponse ? (
                        <Paper elevation={3} sx={styles.noStudentsPaper}>
                            <Typography variant="h6" sx={styles.noStudentsText}>
                                No Students Found in this Class.
                            </Typography>
                        </Paper>
                    ) : (
                        <Paper sx={styles.tableWrapperPaper}>
                            <Typography variant="h5" sx={styles.studentsListTitle}>
                                Students List:
                            </Typography>

                            {Array.isArray(sclassStudents) && sclassStudents.length > 0 &&
                                <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                        </Paper>
                    )}
                </>
            )}
        </Container>
    );
};

export default TeacherClassDetails;

const styles = {
    container: {
        mt: 4,
        mb: 4,
        minHeight: 'calc(100vh - 64px - 32px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    loadingText: {
        color: '#555555',
        fontSize: '1.1rem',
        fontWeight: 500,
        textAlign: 'center',
        mt: 5,
    },
    errorText: {
        color: '#E53935',
        fontSize: '1.1rem',
        fontWeight: 500,
        textAlign: 'center',
        mt: 5,
    },
    pageTitle: {
        fontSize: '2.2rem',
        fontWeight: 600,
        color: '#6a0572',
        mb: 3,
        textAlign: 'center',
    },
    noStudentsPaper: {
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        mt: 4,
    },
    noStudentsText: {
        color: '#777777',
        fontSize: '1.1rem',
        fontWeight: 500,
    },
    tableWrapperPaper: {
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        width: '100%',
        boxSizing: 'border-box',
        mt: 2,
    },
    studentsListTitle: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: '#333333',
        mb: 2,
    },
    viewButton: {
        minWidth: 'unset',
        padding: '6px 16px',
        fontSize: '0.85rem',
        mr: 1,
    },
    buttonGroup: {
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        '& .MuiButtonGroup-contained .MuiButton-contained': {
            borderRadius: '8px',
        },
    },
    splitButtonMain: {
        backgroundColor: '#2196f3',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1976d2',
        },
        padding: '6px 16px',
        fontSize: '0.85rem',
        textTransform: 'none',
    },
    splitButtonDropdown: {
        backgroundColor: '#6a0572',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4508b',
        },
        padding: '6px 8px',
    },
    popperPaper: {
        borderRadius: '8px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        mt: 1,
    },
    menuItem: {
        fontSize: '0.9rem',
        color: '#333333',
        '&:hover': {
            backgroundColor: 'rgba(106, 5, 114, 0.05)',
            color: '#6a0572',
        },
        '&.Mui-selected': {
            backgroundColor: 'rgba(106, 5, 114, 0.1)',
            color: '#6a0572',
            fontWeight: 600,
        },
    },
};