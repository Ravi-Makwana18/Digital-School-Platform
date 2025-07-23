import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png"; // Assuming this is student icon
import Lessons from "../../assets/subjects.svg"; // Assuming this is lessons/subjects icon
import Tests from "../../assets/assignment.svg"; // Assuming this is tests/assignments icon
import Time from "../../assets/time.svg"; // Assuming this is time/hours icon
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Students} alt="Students" />
                            <Title>
                                Class Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Lessons} alt="Lessons" />
                            <Title>
                                Total Lessons
                            </Title>
                            <Data start={0} end={numberOfSessions} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Tests} alt="Tests" />
                            <Title>
                                Tests Taken
                            </Title>
                            <Data start={0} end={5} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Time} alt="Time" />
                            <Title>
                                Total Hours
                            </Title>
                            <Data start={0} end={17} duration={2} suffix="hrs" />
                        </StyledPaper>
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

const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 220px; /* Consistent card height */
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 12px; /* Consistent rounded corners */
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.05); /* Layered shadow */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Smooth hover */

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
  color: #555555; /* Muted gray for titles */
  font-weight: 500;
  margin-bottom: 12px;
`;

const Data = styled(CountUp)`
  font-size: 2.2rem;
  color: #6a0572; /* Primary purple for data numbers */
  font-weight: 700;
`;

export default TeacherHomePage;