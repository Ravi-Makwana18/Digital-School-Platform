import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg";
import { PurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={styles.mainGridContainer}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={styles.formGridItem}>
                    <Box sx={styles.formBox}>
                        <Typography variant="h4" sx={styles.formTitle}>
                            Admin Register
                        </Typography>
                        <Typography variant="body1" sx={styles.formSubtitle}>
                            Create your own school by registering as an admin.
                            You will be able to add students and faculty and
                            manage the system.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="Enter your name"
                                name="adminName"
                                autoComplete="name"
                                autoFocus
                                error={adminNameError}
                                helperText={adminNameError && 'Name is required'}
                                onChange={handleInputChange}
                                sx={styles.textField}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="schoolName"
                                label="Create your school name"
                                name="schoolName"
                                autoComplete="off"
                                error={schoolNameError}
                                helperText={schoolNameError && 'School name is required'}
                                onChange={handleInputChange}
                                sx={styles.textField}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                                sx={styles.textField}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)} edge="end">
                                                {toggle ? (
                                                    <Visibility sx={styles.visibilityIcon} />
                                                ) : (
                                                    <VisibilityOff sx={styles.visibilityIcon} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={styles.textField}
                            />
                            <Grid container sx={styles.checkboxGrid}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" sx={styles.checkbox} />}
                                    label={<Typography variant="body2" sx={styles.checkboxLabel}>Remember me</Typography>}
                                />
                            </Grid>
                            <PurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={styles.registerButton}
                            >
                                {loader ? <CircularProgress size={24} color="inherit"/> : "Register"}
                            </PurpleButton>
                            <Grid container sx={styles.loginLinkContainer}>
                                <Grid item>
                                    <Typography variant="body2" sx={styles.loginText}>
                                        Already have an account?
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ ml: 1 }}>
                                    <StyledLink to="/Adminlogin">
                                        Log in
                                    </StyledLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={styles.backgroundImageGrid}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6a0572; /* Primary purple color for links */
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const styles = {
    mainGridContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: '#f5f5f5',
    },
    formGridItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '20px', sm: '30px', md: '40px' },
        backgroundColor: '#ffffff', 
        borderRadius: { xs: '0', md: '12px' },
        boxShadow: { xs: 'none', md: '0px 8px 25px rgba(0, 0, 0, 0.1)' },
    },
    formBox: {
        my: { xs: 4, md: 8 },
        mx: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    formTitle: {
        mb: 2,
        color: '#333333',
        fontWeight: 700,
        fontSize: '2.5rem',
        textAlign: 'center',
    },
    formSubtitle: {
        mb: 3,
        color: '#555555',
        textAlign: 'center',
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    form: {
        mt: 2,
        width: '100%',
    },
    textField: {
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
        '& .MuiInputLabel-root': {
            color: '#666666', 
        },
        '& .MuiInputBase-input': {
            color: '#333333', 
        },
    },
    visibilityIcon: {
        color: '#666666',
    },
    checkboxGrid: {
        display: "flex",
        justifyContent: "space-between",
        mt: 1,
        mb: 1,
        alignItems: 'center',
    },
    checkbox: {
        color: '#6a0572',
        '&.Mui-checked': {
            color: '#6a0572',
        },
    },
    checkboxLabel: {
        color: '#555555',
    },
    registerButton: {
        mt: 3,
        mb: 2,
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
    },
    loginLinkContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
    },
    loginText: {
        color: '#555555',
        fontSize: '0.95rem',
    },
    backgroundImageGrid: {
        backgroundImage: `url(${bgpic})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: { xs: '0', md: '12px' }, 
        boxShadow: { xs: 'none', md: '0px 8px 25px rgba(0, 0, 0, 0.1)' },
    },
};