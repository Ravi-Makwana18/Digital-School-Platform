import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Paper } from '@mui/material';
import Popup from '../../components/Popup';
import { PurpleButton } from '../../components/buttonStyles'; 
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { underControl } from '../../redux/userRelated/userSlice';

const TeacherComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);
    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Complain Submitted Successfully!");
            setComplaint("");
            setDate("");
            dispatch(underControl());
        }
        else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error: Failed to submit complain.");
        }
    }, [status, error, dispatch]);

    return (
        <>
            <Box sx={styles.container}>
                <Paper elevation={3} sx={styles.paperWrapper}>
                    <Box sx={styles.formBox}>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h5" sx={styles.formTitle}>Submit a Complain</Typography>
                            <Typography variant="body2" sx={styles.formSubtitle}>
                                Please provide details about your concern.
                            </Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={styles.textField}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    rows={4}
                                    sx={styles.textField}
                                />
                            </Stack>
                            <PurpleButton
                                fullWidth
                                size="large"
                                sx={styles.submitButton}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Complain"}
                            </PurpleButton>
                        </form>
                    </Box>
                </Paper>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default TeacherComplain;

const styles = {
    container: {
        flex: '1 1 auto',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        minHeight: 'calc(100vh - 64px)',
    },
    paperWrapper: {
        maxWidth: 600,
        width: '100%',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#ffffff',
    },
    formBox: {
        width: '100%',
    },
    formTitle: {
        fontWeight: 700,
        color: '#333333',
        fontSize: '2.2rem',
        textAlign: 'center',
    },
    formSubtitle: {
        color: '#555555',
        fontSize: '1rem',
        textAlign: 'center',
        mb: 3,
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
        mt: 4,
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
    },
};