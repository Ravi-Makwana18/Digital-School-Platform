import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Students} alt="Students" />
                            <Title>
                                Total Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Classes} alt="Classes" />
                            <Title>
                                Total Classes
                            </Title>
                            <Data start={0} end={numberOfClasses} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Teachers} alt="Teachers" />
                            <Title>
                                Total Teachers
                            </Title>
                            <Data start={0} end={numberOfTeachers} duration={2} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <CardImage src={Fees} alt="Fees" />
                            <Title>
                                Fees Collection
                            </Title>
                            <Data start={0} end={50000} duration={2} prefix="₹" />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
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

export default AdminHomePage;