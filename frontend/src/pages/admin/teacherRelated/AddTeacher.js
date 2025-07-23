import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Typography, TextField, Paper } from '@mui/material';
import { LightPurpleButton } from '../../../components/buttonStyles';

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id;

  const fields = { name, email, password, role, school, teachSubject, teachSclass };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate("/Admin/teachers");
    }
    else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    }
    else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box sx={styles.container}>
      <Paper elevation={3} sx={styles.formPaper}>
        <form onSubmit={submitHandler} style={styles.formStyle}>
          <Typography variant="h5" sx={styles.formTitle}>Add Teacher</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={styles.detailText}>
              <Typography component="span" sx={styles.detailLabel}>Subject:</Typography> {subjectDetails && subjectDetails.subName}
            </Typography>
            <Typography variant="body1" sx={styles.detailText}>
              <Typography component="span" sx={styles.detailLabel}>Class:</Typography> {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Teacher's Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            sx={styles.textField}
          />
          <TextField
            fullWidth
            label="Teacher's Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            sx={styles.textField}
          />
          <TextField
            fullWidth
            label="Teacher's Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
            sx={styles.textField}
          />
          <LightPurpleButton type="submit" fullWidth disabled={loader} sx={styles.submitButton}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </LightPurpleButton>
        </form>
      </Paper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddTeacher;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: '20px',
    },
    formPaper: {
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1), 0px 3px 8px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
        maxWidth: '500px',
        width: '100%',
        boxSizing: 'border-box',
    },
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formTitle: {
        fontWeight: 600,
        color: '#6a0572',
        mb: 3,
        textAlign: 'center',
        fontSize: '2rem',
    },
    detailText: {
        fontSize: '1.05rem',
        color: '#555555',
        mb: 0.5,
    },
    detailLabel: {
        fontWeight: 600,
        color: '#333333',
    },
    textField: {
        '& .MuiInputLabel-root': {
            color: '#666666',
            fontSize: '0.95rem',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f8f8f8',
            '& fieldset': {
                borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
                borderColor: '#a4508b',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6a0572',
                boxShadow: '0 0 0 2px rgba(106, 5, 114, 0.2)',
            },
        },
        '& .MuiInputBase-input': {
            color: '#333333',
            fontSize: '1rem',
            padding: '12px 14px',
        },
    },
    submitButton: {
        mt: 3,
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
    },
};