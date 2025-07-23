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
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
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
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={8} onClick={() => navigateHandler("Admin")}>
              <Box sx={styles.iconBox}>
                <AccountCircle sx={styles.iconStyle} />
              </Box>
              <StyledTypography variant="h5">
                Admin
              </StyledTypography>
              <Typography variant="body2" sx={styles.cardDescription}>
                Login as an administrator to access the dashboard to manage app data.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={8} onClick={() => navigateHandler("Student")}>
              <Box sx={styles.iconBox}>
                <School sx={styles.iconStyle} />
              </Box>
              <StyledTypography variant="h5">
                Student
              </StyledTypography>
              <Typography variant="body2" sx={styles.cardDescription}>
                Login as a student to explore course materials and assignments.
              </Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={8} onClick={() => navigateHandler("Teacher")}>
              <Box sx={styles.iconBox}>
                <Group sx={styles.iconStyle} />
              </Box>
              <StyledTypography variant="h5">
                Teacher
              </StyledTypography>
              <Typography variant="body2" sx={styles.cardDescription}>
                Login as a teacher to create courses, assignments, and track student progress.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ ml: 2 }}>Please Wait</Typography>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(135deg, #afbacfff 0%, #507ba4ff 100%); /* Using your primary/secondary colors */
  min-height: 100vh; /* Ensure it covers full viewport height */
  display: flex;
  justify-content: center;
  align-items: center; /* Center content vertically */
  padding: 40px 20px; /* More padding for overall spacing */
  box-sizing: border-box; /* Include padding in element's total width and height */
`;

const StyledPaper = styled(Paper)`
  padding: 30px; /* Increased padding */
  text-align: center;
  background-color: #ffffff; /* White background for cards */
  color: #333333; /* Dark text for contrast */
  cursor: pointer;
  border-radius: 15px; /* More rounded corners */
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15), 0px 5px 15px rgba(0, 0, 0, 0.08); /* Enhanced layered shadow */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Smooth transitions */
  height: 100%; /* Ensure cards fill grid height */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute content nicely */

  &:hover {
    transform: translateY(-8px); /* More pronounced lift effect */
    box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.2), 0px 8px 20px rgba(0, 0, 0, 0.1); /* Stronger shadow on hover */
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 1.8rem; /* Larger title for user roles */
  font-weight: 700; /* Bolder text */
  color: #6a0572; /* Primary purple color */
  margin-bottom: 15px; /* Space below title */
`;

const styles = {
  iconBox: {
    mb: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#a4508b',
    margin: '0 auto 20px auto',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
  },
  iconStyle: {
    fontSize: '3.5rem', 
    color: '#ffffff',
  },
  cardDescription: {
    fontSize: '0.95rem',
    color: '#555555',
    lineHeight: 1.6,
  },
};