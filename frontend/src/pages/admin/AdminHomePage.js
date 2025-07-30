import { Container, Grid, Paper, Typography, Box, LinearProgress, Chip, Card } from '@mui/material'
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

// Icons
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const SectionTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(106, 5, 114, 0.3), transparent);
    margin-left: 16px;
  }
`;

const StatsOverview = styled(Box)`
  margin-top: 8px;
  margin-bottom: 24px;
`;

const ProgressIndicator = styled(Box)`
  margin-top: 16px;
  
  .MuiLinearProgress-root {
    height: 8px;
    border-radius: 4px;
    background-color: rgba(106, 5, 114, 0.1);
  }
  
  .MuiLinearProgress-bar {
    background: linear-gradient(to right, #6a0572, #9546c4);
    border-radius: 4px;
  }
`;

const ProgressLabel = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  span {
    font-size: 0.875rem;
    color: #555;
    font-weight: 500;
  }
  
  .value {
    color: #6a0572;
    font-weight: 600;
  }
`;

const StyledChip = styled(Chip)`
  background: ${props => props.positive ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)'};
  color: ${props => props.positive ? '#2ecc71' : '#e74c3c'};
  font-weight: 500;
  margin-left: 8px;
  
  .MuiChip-icon {
    color: ${props => props.positive ? '#2ecc71' : '#e74c3c'};
  }
`;

const FeatureCard = styled(Card)`
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f9fa;
  border-left: 4px solid #6a0572;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a0572 0%, #9546c4 100%);
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(106, 5, 114, 0.3);
  
  svg {
    color: white;
    font-size: 24px;
  }
`;

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
    
    // Mock data for progress indicators
    const attendance = 87;
    const assignments = 65;
    const examScores = 78;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <PeopleAltRoundedIcon />
                            </IconWrapper>
                            <Title>
                                Total Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2} />
                            <StyledChip
                                icon={<TrendingUpIcon />}
                                label="5% increase"
                                size="small"
                                positive="true"
                            />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <SchoolRoundedIcon />
                            </IconWrapper>
                            <Title>
                                Total Classes
                            </Title>
                            <Data start={0} end={numberOfClasses} duration={2} />
                            <StyledChip
                                icon={<TrendingUpIcon />}
                                label="New class added"
                                size="small"
                                positive="true"
                            />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <GroupOutlinedIcon />
                            </IconWrapper>
                            <Title>
                                Total Teachers
                            </Title>
                            <Data start={0} end={numberOfTeachers} duration={2} />
                            <StyledChip
                                icon={<TrendingUpIcon />}
                                label="2 new hires"
                                size="small"
                                positive="true"
                            />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <AttachMoneyIcon />
                            </IconWrapper>
                            <Title>
                                Fees Collection
                            </Title>
                            <Data start={0} end={50000} duration={2} prefix="₹" />
                            <StyledChip
                                icon={<TrendingUpIcon />}
                                label="12% collected"
                                size="small"
                                positive="true"
                            />
                        </StyledPaper>
                    </Grid>
                    
                    <Grid item xs={12} md={7}>
                        <Paper sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
                            borderRadius: '12px',
                            mb: 3
                        }}>
                            <SectionTitle>School Performance</SectionTitle>
                            <StatsOverview>
                                <ProgressIndicator>
                                    <ProgressLabel>
                                        <span>Student Attendance</span>
                                        <span className="value">{attendance}%</span>
                                    </ProgressLabel>
                                    <LinearProgress variant="determinate" value={attendance} />
                                </ProgressIndicator>
                                
                                <ProgressIndicator>
                                    <ProgressLabel>
                                        <span>Assignment Completion</span>
                                        <span className="value">{assignments}%</span>
                                    </ProgressLabel>
                                    <LinearProgress variant="determinate" value={assignments} />
                                </ProgressIndicator>
                                
                                <ProgressIndicator>
                                    <ProgressLabel>
                                        <span>Average Exam Scores</span>
                                        <span className="value">{examScores}%</span>
                                    </ProgressLabel>
                                    <LinearProgress variant="determinate" value={examScores} />
                                </ProgressIndicator>
                            </StatsOverview>
                        </Paper>
                        
                        <Paper sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
                            borderRadius: '12px',
                        }}>
                            <SectionTitle>Recent Notices</SectionTitle>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={5}>
                        <Paper sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
                            borderRadius: '12px',
                            height: '100%'
                        }}>
                            <SectionTitle>Quick Actions</SectionTitle>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <PeopleAltRoundedIcon />
                                        </FeatureIcon>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Add Student
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Register new students to the system
                                        </Typography>
                                    </FeatureCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <GroupOutlinedIcon />
                                        </FeatureIcon>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Add Teacher
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Add new teachers to faculty
                                        </Typography>
                                    </FeatureCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <MenuBookIcon />
                                        </FeatureIcon>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Manage Subjects
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Add or edit class subjects
                                        </Typography>
                                    </FeatureCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <FeatureCard>
                                        <FeatureIcon>
                                            <AssignmentTurnedInIcon />
                                        </FeatureIcon>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            Post Notice
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Create announcements for school
                                        </Typography>
                                    </FeatureCard>
                                </Grid>
                            </Grid>
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
  position: relative;
  overflow: hidden;
  background: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #6a0572, #9546c4);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, #6a0572 0%, #9546c4 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0px 6px 15px rgba(106, 5, 114, 0.25);
  
  svg {
    color: white;
    font-size: 28px;
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