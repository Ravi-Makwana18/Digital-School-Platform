import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { AccountCircle, School, Group, AdminPanelSettings, Person, SupervisorAccount } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "ravi@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      }
      else {
        navigate('/Adminlogin');
      }
    }
    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Raj";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      }
      else {
        navigate('/Studentlogin');
      }
    }
    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "rohan@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <PageHeader>Choose User Role</PageHeader>
      <PageSubheader>Select the type of account you want to access</PageSubheader>
      
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard onClick={() => navigateHandler("Admin")}>
              <RoleIconWrapper role="admin">
                <AdminPanelSettings fontSize="large" />
              </RoleIconWrapper>
              <CardContent>
                <RoleTitle>Administrator</RoleTitle>
                <RoleFeaturesList>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Manage all users
                  </RoleFeature>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Control classes & subjects
                  </RoleFeature>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Post notices & announcements
                  </RoleFeature>
                </RoleFeaturesList>
                <SelectRoleButton role="admin">Select Role</SelectRoleButton>
              </CardContent>
            </RoleCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard onClick={() => navigateHandler("Student")}>
              <RoleIconWrapper role="student">
                <Person fontSize="large" />
              </RoleIconWrapper>
              <CardContent>
                <RoleTitle>Student</RoleTitle>
                <RoleFeaturesList>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    View assigned subjects
                  </RoleFeature>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Track attendance & marks
                  </RoleFeature>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Submit complaints
                  </RoleFeature>
                </RoleFeaturesList>
                <SelectRoleButton role="student">Select Role</SelectRoleButton>
              </CardContent>
            </RoleCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <RoleCard onClick={() => navigateHandler("Teacher")}>
              <RoleIconWrapper role="teacher">
                <SupervisorAccount fontSize="large" />
              </RoleIconWrapper>
              <CardContent>
                <RoleTitle>Teacher</RoleTitle>
                <RoleFeaturesList>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Manage assigned classes
                  </RoleFeature>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Record attendance & marks
                  </RoleFeature>
                  <RoleFeature>
                    <FeatureIcon>✓</FeatureIcon>
                    Submit reports
                  </RoleFeature>
                </RoleFeaturesList>
                <SelectRoleButton role="teacher">Select Role</SelectRoleButton>
              </CardContent>
            </RoleCard>
          </Grid>
        </Grid>
      </Container>
      
      <BackLink onClick={() => navigate('/')}>
        <BackIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </BackIcon>
        Return to Home
      </BackLink>
      
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(4px)',
          background: 'rgba(0,0,0,0.5)'
        }}
        open={loader}
      >
        <Box sx={styles.loaderContainer}>
          <CircularProgress color="inherit" thickness={4} size={48} />
          <Typography variant="h6" sx={styles.waitingText}>
            Authenticating...
          </Typography>
        </Box>
      </Backdrop>
      
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(135deg, #6a0572 0%, #a4508b 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const PageHeader = styled(Typography)`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const PageSubheader = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  text-align: center;
  max-width: 600px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const RoleCard = styled(Card)`
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.18);
    
    &::after {
      opacity: 1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:nth-child(1)::after {
    background: linear-gradient(90deg, #FF5722, #FF9800);
  }
  
  &:nth-child(2)::after {
    background: linear-gradient(90deg, #2196F3, #00BCD4);
  }
  
  &:nth-child(3)::after {
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
  }
`;

const RoleIconWrapper = styled.div`
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => {
    if (props.role === "admin") return "linear-gradient(135deg, #FF9800, #FF5722)";
    if (props.role === "student") return "linear-gradient(135deg, #2196F3, #03A9F4)";
    if (props.role === "teacher") return "linear-gradient(135deg, #4CAF50, #8BC34A)";
    return "linear-gradient(135deg, #9C27B0, #673AB7)";
  }};
  color: white;
  
  svg {
    font-size: 60px;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
  }
`;

const RoleTitle = styled(Typography)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
`;

const RoleFeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
`;

const RoleFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #495057;
  font-weight: 500;
`;

const FeatureIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: rgba(106, 5, 114, 0.1);
  color: #6a0572;
  border-radius: 50%;
  margin-right: 12px;
  font-size: 0.85rem;
  font-weight: 700;
`;

const SelectRoleButton = styled.button`
  background: ${props => {
    if (props.role === "admin") return "linear-gradient(135deg, #FF9800, #FF5722)";
    if (props.role === "student") return "linear-gradient(135deg, #2196F3, #03A9F4)";
    if (props.role === "teacher") return "linear-gradient(135deg, #4CAF50, #8BC34A)";
    return "linear-gradient(135deg, #a4508b, #6a0572)";
  }};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    filter: brightness(1.05);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 60px;
  padding: 10px 20px;
  border-radius: 30px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }
`;

const BackIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 40px',
    borderRadius: '16px',
    backgroundColor: 'rgba(33, 37, 41, 0.8)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  waitingText: {
    mt: 2,
    fontWeight: 500,
    color: '#fff',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  }
};