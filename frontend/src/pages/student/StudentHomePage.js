import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Subject} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Assignment} alt="Assignments" />
                            <Title>
                                Total Assignments
                            </Title>
                            <Data start={0} end={15} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <ChartContainer elevation={3}>
                            {
                                response ?
                                    <Typography variant="h6" sx={styles.noDataText}>No Attendance Found</Typography>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Typography variant="h6" sx={styles.loadingText}>Loading Attendance...</Typography>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <ChartTitle variant="h6">Overall Attendance</ChartTitle>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    )
                                                        :
                                                        <Typography variant="h6" sx={styles.noDataText}>No Attendance Found</Typography>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </ChartContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
                            borderRadius: '8px',
                        }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

const ChartContainer = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 15px;
`;


const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const Title = styled.p`
  font-size: 1.15rem;
  color: #555555;
  font-weight: 500;
  margin-bottom: 12px;
`;

const Data = styled(CountUp)`
  font-size: 2.2rem;
  color: #6a0572;
  font-weight: 700;
`;

const styles = {
    loadingText: {
        color: '#555555',
        fontSize: '1.1rem',
        fontWeight: 500,
    },
    noDataText: {
        color: '#777777',
        fontSize: '1.1rem',
        fontWeight: 500,
    },
};

export default StudentHomePage;