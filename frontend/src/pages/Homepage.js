import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Paper, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/Students.png"; 
import { LightPurpleButton } from '../components/buttonStyles';
import { School, Group, Person, CheckCircle } from '@mui/icons-material';

const Homepage = () => {
    const isMobile = useMediaQuery('(max-width:900px)');
    
    return (
        <FullPageBackground>
            <Container maxWidth="lg" sx={styles.innerContainer}>
                <Grid container spacing={0} sx={styles.mainGridContainer}>
                    <Grid item xs={12} md={6} sx={styles.contentGrid}>
                        <StyledContentPaper elevation={0}>
                            <GradientBadge>Digital School Platform</GradientBadge>
                            <StyledTitle variant="h3">
                                Transform Your 
                                <GradientText> School </GradientText>
                                Management
                            </StyledTitle>
                            <br />
                            <StyledText variant="body1">
                                Streamline school operations with our comprehensive management system. 
                                Connect administrators, teachers, and students on one powerful platform.
                            </StyledText>
                            
                            <FeatureGrid container spacing={2}>
                                <FeatureItem item xs={12} sm={6}>
                                    <FeatureIcon>
                                        <School />
                                    </FeatureIcon>
                                    <FeatureText>Class Management</FeatureText>
                                </FeatureItem>
                                <FeatureItem item xs={12} sm={6}>
                                    <FeatureIcon>
                                        <Group />
                                    </FeatureIcon>
                                    <FeatureText>Student Tracking</FeatureText>
                                </FeatureItem>
                                <FeatureItem item xs={12} sm={6}>
                                    <FeatureIcon>
                                        <Person />
                                    </FeatureIcon>
                                    <FeatureText>Teacher Portal</FeatureText>
                                </FeatureItem>
                                <FeatureItem item xs={12} sm={6}>
                                    <FeatureIcon>
                                        <CheckCircle />
                                    </FeatureIcon>
                                    <FeatureText>Attendance System</FeatureText>
                                </FeatureItem>
                            </FeatureGrid>
                            
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth sx={styles.loginButton}>
                                        Get Started
                                        <ArrowIcon>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 4L21 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </ArrowIcon>
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
                                        Try Demo Access
                                    </Button>
                                </StyledLink>
                                <SignUpContainer>
                                    <Typography variant="body2" sx={styles.signupPrompt}>
                                        New to the platform?{' '}
                                        <Link to="/Adminregister" style={styles.signupLink}>
                                            Create an account
                                        </Link>
                                    </Typography>
                                </SignUpContainer>
                            </StyledBox>
                        </StyledContentPaper>
                    </Grid>
                    <Grid item xs={12} md={6} sx={styles.imageGrid}>
                        <ImageContainer>
                            <ImageOverlay />
                            <img src={Students} alt="Students" style={styles.imageStyle} />
                            {!isMobile && (
                                <>
                                    <FloatingBadge top="15%" left="10%">
                                        <BadgeIcon>👨‍🎓</BadgeIcon>
                                        <BadgeText>Student Portal</BadgeText>
                                    </FloatingBadge>
                                    <FloatingBadge top="30%" left="75%">
                                        <BadgeIcon>👩‍🏫</BadgeIcon>
                                        <BadgeText>Teacher Dashboard</BadgeText>
                                    </FloatingBadge>
                                    <FloatingBadge top="70%" left="20%">
                                        <BadgeIcon>📊</BadgeIcon>
                                        <BadgeText>Performance Analytics</BadgeText>
                                    </FloatingBadge>
                                </>
                            )}
                        </ImageContainer>
                    </Grid>
                </Grid>
            </Container>
        </FullPageBackground>
    );
};

export default Homepage;

// Main background container
const FullPageBackground = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #6a0572 0%, #a4508b 100%);
  padding: 40px 20px;
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

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

// Content paper with enhanced styling
const StyledContentPaper = styled(Paper)`
  padding: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.99);
  border-radius: 16px 0 0 16px;
  position: relative;
  z-index: 1;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  @media (max-width: 1200px) {
    padding: 50px;
  }
  
  @media (max-width: 900px) {
    padding: 40px;
    align-items: center;
    text-align: center;
    border-radius: 16px;
    margin: 0 auto;
    max-width: 600px;
  }
  
  @media (max-width: 600px) {
    padding: 30px;
  }
`;

// Stylish gradient badge
const GradientBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #a4508b 0%, #6a0572 100%);
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(106, 5, 114, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Title with gradient text capability
const StyledTitle = styled(Typography)`
  font-size: 3.5rem;
  color: #212529;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 25px;

  @media (max-width: 1200px) {
    font-size: 3rem;
  }

  @media (max-width: 900px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
`;

// Gradient text for emphasizing certain words
const GradientText = styled.span`
  background: linear-gradient(135deg, #a4508b 0%, #6a0572 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

// Body text with improved readability
const StyledText = styled(Typography)`
  color: #495057;
  margin-top: 20px;
  margin-bottom: 30px;
  letter-spacing: 0.1px;
  line-height: 1.7;
  font-size: 1.05rem;
  font-family: 'Poppins', sans-serif;
  max-width: 550px;

  @media (max-width: 900px) {
    font-size: 1rem;
    margin-top: 15px;
    margin-bottom: 25px;
  }
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

// Feature grid for highlighting key features
const FeatureGrid = styled(Grid)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
`;

// Individual feature items
const FeatureItem = styled(Grid)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

// Icon container for feature icons
const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a4508b 0%, #6a0572 100%);
  margin-right: 12px;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(106, 5, 114, 0.25);
`;

// Text for feature items
const FeatureText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

// Container for buttons and sign-up prompt
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

// Navigation links styling
const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

// Container for the image with overlay effects
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 0 16px 16px 0;
  
  @media (max-width: 900px) {
    border-radius: 16px;
    margin-top: 30px;
  }
`;

// Semi-transparent overlay for the image
const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(106, 5, 114, 0.5) 0%, rgba(164, 80, 139, 0.3) 100%);
  z-index: 1;
  border-radius: 0 16px 16px 0;
  
  @media (max-width: 900px) {
    border-radius: 16px;
  }
`;

// Floating badges that appear over the image
const FloatingBadge = styled.div`
  position: absolute;
  top: ${props => props.top || '20%'};
  left: ${props => props.left || '20%'};
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  z-index: 2;
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

// Badge icon styling
const BadgeIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 8px;
`;

// Badge text styling
const BadgeText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #212529;
`;

// Arrow icon for buttons
const ArrowIcon = styled.span`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s ease;
  
  ${StyledLink}:hover & {
    transform: translateX(5px);
  }
`;

// Container for the sign-up prompt with subtle styling
const SignUpContainer = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e9ecef;
`;

const styles = {
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 1,
    },
    mainGridContainer: {
        minHeight: 'calc(100vh - 80px)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0px 30px 60px rgba(0, 0, 0, 0.25), 0px 15px 30px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'transparent',
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
    },
    contentGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '0', sm: '0', md: '0' },
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 2,
    },
    imageGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        position: 'relative',
        zIndex: 0,
        transition: 'transform 0.5s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        },
        '@media (max-width: 900px)': {
            maxHeight: '400px',
            objectFit: 'contain',
        },
    },
    loginButton: {
        padding: '14px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: '12px',
        textTransform: 'none',
        boxShadow: '0px 8px 15px rgba(106, 5, 114, 0.2)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #a4508b 0%, #6a0572 100%)',
        '&:hover': {
            boxShadow: '0px 12px 25px rgba(106, 5, 114, 0.3)',
            transform: 'translateY(-3px)',
            background: 'linear-gradient(135deg, #b55a9c 0%, #7b0683 100%)',
        },
    },
    guestLoginButton: {
        color: "#6a0572",
        borderColor: "#6a0572",
        borderWidth: 2,
        '&:hover': {
            borderColor: "#a4508b",
            color: "#a4508b",
            backgroundColor: 'rgba(164, 80, 139, 0.05)',
            borderWidth: 2,
            transform: 'translateY(-3px)',
            boxShadow: '0px 6px 15px rgba(106, 5, 114, 0.1)',
        },
        padding: '13px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: '12px',
        textTransform: 'none',
        transition: 'all 0.3s ease',
    },
    signupPrompt: {
        fontSize: '0.95rem',
        color: '#495057',
        fontWeight: 500,
    },
    signupLink: {
        color: '#6a0572',
        fontWeight: 700,
        textDecoration: 'none',
        position: 'relative',
        '&:hover': {
            color: '#a4508b',
            textDecoration: 'none',
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '2px',
            bottom: '-2px',
            left: '0',
            backgroundColor: '#a4508b',
            transition: 'width 0.3s ease',
        },
        '&:hover:after': {
            width: '100%',
        },
    },
};