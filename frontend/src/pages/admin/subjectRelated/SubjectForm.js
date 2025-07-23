import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Paper } from "@mui/material"; // Added Paper import
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import { PurpleButton, GreenButton, RedButton } from '../../../components/buttonStyles'; // Corrected import path

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
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
        <Paper elevation={3} sx={styles.paperContainer}>
            <form onSubmit={submitHandler}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={styles.heading}>Add Subjects</Typography>
                </Box>
                <Grid container spacing={3}>
                    {subjects.map((subject, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Subject Name"
                                    variant="outlined"
                                    value={subject.subName}
                                    onChange={handleSubjectNameChange(index)}
                                    sx={styles.textField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Subject Code"
                                    variant="outlined"
                                    value={subject.subCode}
                                    onChange={handleSubjectCodeChange(index)}
                                    sx={styles.textField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Sessions"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={subject.sessions}
                                    onChange={handleSessionsChange(index)}
                                    sx={styles.textField}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={styles.buttonGroup}>
                                    {index === 0 ? (
                                        <GreenButton
                                            variant="contained"
                                            onClick={handleAddSubject}
                                        >
                                            Add New Subject
                                        </GreenButton>
                                    ) : (
                                        <RedButton
                                            variant="contained"
                                            onClick={handleRemoveSubject(index)}
                                        >
                                            Remove Subject
                                        </RedButton>
                                    )}
                                </Box>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <Box sx={styles.saveButtonContainer}>
                            <PurpleButton variant="contained" type="submit" disabled={loader}>
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Save All Subjects'
                                )}
                            </PurpleButton>
                        </Box>
                    </Grid>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </Grid>
            </form>
        </Paper>
    );
};

export default SubjectForm;

const styles = {
    paperContainer: {
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05)',
        maxWidth: '800px',
        margin: 'auto',
        mt: 4,
    },
    heading: {
        fontWeight: 600,
        color: '#6a0572',
        mb: 2,
        textAlign: 'center',
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
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    },
    saveButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 2,
    },
};