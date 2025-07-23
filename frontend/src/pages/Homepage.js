import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Paper } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/Students.png"; // Original image path
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <FullPageBackground>
            <Container maxWidth="lg" sx={styles.innerContainer}>
                <Grid container spacing={0} sx={styles.mainGridContainer}>
                    <Grid item xs={12} md={6} sx={styles.contentGrid}>
                        <StyledContentPaper elevation={0}>
                            <StyledTitle variant="h3">
                                Welcome to
                                <br />
                                School Management
                                <br />
                                System
                            </StyledTitle>
                            <br />
                            <StyledText variant="body1">
                                Streamline school management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth sx={styles.loginButton}>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{
                                            ...styles.guestLoginButton,
                                            mt: 2,
                                            mb: 3,
                                        }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                                <Typography variant="body2" sx={styles.signupPrompt}>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={styles.signupLink}>
                                        Sign up
                                    </Link>
                                </Typography>
                            </StyledBox>
                        </StyledContentPaper>
                    </Grid>
                    <Grid item xs={12} md={6} sx={styles.imageGrid}>
                        <img src={Students} alt="Students" style={styles.imageStyle} />
                    </Grid>
                </Grid>
            </Container>
        </FullPageBackground>
    );
};

export default Homepage;

const FullPageBackground = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures it covers the full viewport height */
  width: 100vw; /* Ensures it covers the full viewport width */
  background: linear-gradient(135deg, #f0e6f2 0%, #e6f2f0 100%); /* Applied gradient here */
  padding: 40px 20px; /* Overall padding around the centered content */
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const StyledContentPaper = styled(Paper)`
  padding: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 40px;
    align-items: center;
    text-align: center;
  }
  @media (max-width: 600px) {
    padding: 30px;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  width: 100%;
  max-width: 380px;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const StyledTitle = styled(Typography)`
  font-size: 3.5rem;
  color: #2c3e50;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.1;
  margin-bottom: 25px;

  @media (max-width: 900px) {
    font-size: 2.8rem;
  }
  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
`;

const StyledText = styled(Typography)`
  color: #555555;
  margin-top: 20px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: 1.7;
  font-size: 1.05rem;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 900px) {
    font-size: 0.95rem;
    margin-top: 15px;
    margin-bottom: 25px;
  }
  @media (max-width: 600px) {
    font-size: 0.88rem;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const styles = {
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    mainGridContainer: {
        minHeight: 'calc(100vh - 80px)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.18), 0px 8px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        flexDirection: { xs: 'column', md: 'row' },
    },
    contentGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '30px', sm: '40px', md: '0px' },
        boxSizing: 'border-box',
    },
    imageGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: '30px',
        boxSizing: 'border-box',
    },
    imageStyle: {
        width: '90%',
        height: 'auto',
        maxHeight: 'calc(100vh - 100px)',
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto',
    },
    loginButton: {
        padding: '12px 24px',
        fontSize: '1.05rem',
        fontWeight: 600,
        borderRadius: '8px',
        textTransform: 'none',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
        },
    },
    guestLoginButton: {
        color: "#6a0572",
        borderColor: "#6a0572",
        '&:hover': {
            borderColor: "#a4508b",
            color: "#a4508b",
            backgroundColor: 'rgba(164, 80, 139, 0.05)'
        },
        padding: '12px 24px',
        fontSize: '1.05rem',
        fontWeight: 500,
        borderRadius: '8px',
        textTransform: 'none',
    },
    signupPrompt: {
        fontSize: '0.9rem',
        color: '#555555',
        mt: 2,
    },
    signupLink: {
        color: '#6a0572',
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
};