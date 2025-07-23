import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Box, Grid, Avatar, Container, Paper } from '@mui/material'; // Added Container, Paper, Box, Grid, Avatar
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <StyledPaper elevation={3}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar sx={styles.avatar}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
              <Typography variant="h5" component="h2" textAlign="center" sx={styles.teacherName}>
                {currentUser.name}
              </Typography>
              <Typography variant="subtitle1" component="p" textAlign="center" sx={styles.teacherEmail}>
                {currentUser.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" sx={styles.profileDetailItem}>
                <strong>Class:</strong> {teachSclass ? teachSclass.sclassName : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" sx={styles.profileDetailItem}>
                <strong>Subject:</strong> {teachSubject ? teachSubject.subName : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p" sx={styles.profileDetailItem}>
                <strong>School:</strong> {teachSchool ? teachSchool.schoolName : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>

        <StyledCard elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={styles.cardTitle}>
              Additional Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" sx={styles.cardDetail}>
                  <strong>Teacher ID:</strong> {currentUser._id.substring(0, 8)}... 
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" sx={styles.cardDetail}>
                  <strong>Joining Date:</strong> N/A
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  )
}

export default TeacherProfile

const StyledPaper = styled(Paper)`
  padding: 30px;
  margin-bottom: 25px;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1), 0px 3px 8px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1), 0px 3px 8px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
`;

const styles = {
  avatar: {
    width: 120,
    height: 120,
    bgcolor: '#6a0572',
    fontSize: '3rem',
    border: '4px solid #a4508b',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  },
  teacherName: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#333333',
    mt: 2,
    mb: 0.5,
  },
  teacherEmail: {
    fontSize: '1.1rem',
    color: '#666666',
    mb: 3,
  },
  profileDetailItem: {
    fontSize: '1.05rem',
    color: '#495057',
    textAlign: 'center',
    '& strong': {
      color: '#343a40',
    },
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#333333',
    mb: 2,
    borderBottom: '2px solid #e0e0e0',
    pb: 1,
  },
  cardDetail: {
    fontSize: '1rem',
    color: '#555555',
    mb: 1,
    '& strong': {
      color: '#343a40',
    },
  },
};