import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'; // Corrected import for useNavigate
import { authLogout } from '../../redux/userRelated/userSlice';
import { Box, Button, Collapse, Typography, Paper, Grid } from '@mui/material';
import { RedButton, PurpleButton } from '../../components/buttonStyles';


const AdminProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser, response, error } = useSelector((state) => state.user);

    const address = "Admin";

    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel Edit' : 'Edit Profile';

    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser?.schoolName || '');

    const submitHandler = (event) => {
        event.preventDefault();
        const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };
        dispatch(updateUser(fields, currentUser._id, address));
        if (response) {
            setShowTab(false);
        }
    };

    const deleteHandler = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                dispatch(authLogout());
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Box sx={styles.container}>
            <Paper elevation={3} sx={styles.profilePaper}>
                <Typography variant="h4" sx={styles.profileTitle}>
                    Your Profile
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={styles.profileDetail}>
                            <strong>Name:</strong> {currentUser?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={styles.profileDetail}>
                            <strong>Email:</strong> {currentUser?.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={styles.profileDetail}>
                            <strong>School:</strong> {currentUser?.schoolName}
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={styles.buttonGroup}>
                    <RedButton variant="contained" onClick={deleteHandler}>
                        Delete Account
                    </RedButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminProfile;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        maxWidth: '900px', 
        margin: 'auto',
    },
    profilePaper: {
        width: '100%',
        padding: '40px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.05)',
        mb: 4,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 18px 40px rgba(0, 0, 0, 0.15), 0px 6px 12px rgba(0, 0, 0, 0.08)',
        },
    },
    profileTitle: {
        fontSize: '2.2rem',
        fontWeight: 700, 
        color: '#6a0572',
        mb: 3.5,
        textAlign: 'center',
        textShadow: '0px 1px 2px rgba(0,0,0,0.05)',
    },
    profileDetail: {
        fontSize: '1.1rem',
        color: '#495057',
        mb: 1.5,
        '& strong': {
            color: '#343a40',
        },
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        gap: '20px',
        flexWrap: 'wrap',
    },
    editButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    editFormPaper: { 
        width: '100%',
        padding: '40px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.05)',
    },
    formTitle: {
        fontSize: '1.8rem',
        fontWeight: 600,
        color: '#333333',
        mb: 3.5,
        textAlign: 'center',
    },
    formStyle: { 
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    formLabel: {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#444444',
        marginBottom: '5px',
    },
    updateButton: {
        mt: 3,
    },
};