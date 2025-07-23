import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "abc";

        if (role === "Admin") {
            const email = "ravi@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
        else if (role === "Student") {
            const rollNum = "1";
            const studentName = "Dipesh Awasthi";
            const fields = { rollNum, studentName, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
        else if (role === "Teacher") {
            const email = "abc@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
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
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={styles.mainGridContainer}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={styles.unifiedPanelGrid}>
                    <Box sx={styles.formBox}>
                        <Typography variant="h4" sx={styles.formTitle}>
                            {role} Login
                        </Typography>
                        <Typography variant="body1" sx={styles.formSubtitle}>
                            Welcome back! Please enter your details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
                            {role === "Student" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        autoComplete="off"
                                        type="number"
                                        autoFocus
                                        error={rollNumberError}
                                        helperText={rollNumberError && 'Roll Number is required'}
                                        onChange={handleInputChange}
                                        sx={styles.textField}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        autoComplete="name"
                                        autoFocus
                                        error={studentNameError}
                                        helperText={studentNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                        sx={styles.textField}
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={handleInputChange}
                                    sx={styles.textField}
                                />
                            )}
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
                                <StyledLink to="#">
                                    Forgot password?
                                </StyledLink>
                            </Grid>
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={styles.loginButton}
                            >
                                {loader ?
                                    <CircularProgress size={24} color="inherit" />
                                    : "Login"}
                            </LightPurpleButton>
                            <Button
                                fullWidth
                                onClick={guestModeHandler}
                                variant="outlined"
                                sx={styles.guestLoginButton}
                            >
                                {guestLoader ?
                                    <CircularProgress size={24} color="inherit" />
                                    : "Login as Guest"}
                            </Button>
                            {role === "Admin" &&
                                <Grid container sx={styles.signupLinkContainer}>
                                    <Grid item>
                                        <Typography variant="body2" sx={styles.signupText}>
                                            Don't have an account?
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{ ml: 1 }}>
                                        <StyledLink to="/Adminregister">
                                            Sign up
                                        </StyledLink>
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader || loader}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h6" sx={{ ml: 2 }}>Please Wait</Typography>
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default LoginPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6a0572;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const styles = {
    mainGridContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',  
        background: 'linear-gradient(135deg, #f0e6f2 0%, #e6f2f0 100%)',
    },
    unifiedPanelGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '20px', sm: '30px', md: '40px' },
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15), 0px 4px 10px rgba(0, 0, 0, 0.08)',
        maxWidth: { xs: '90%', sm: '600px', md: '500px' },
        width: '100%',
        boxSizing: 'border-box',
    },
    formBox: {
        my: { xs: 4, md: 8 },
        mx: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
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
            fontSize: '0.95rem',
        },
        '& .MuiInputBase-input': {
            color: '#333333',
            fontSize: '1rem',
            padding: '12px 14px',
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
    loginButton: {
        mt: 3,
        mb: 2,
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
    },
    guestLoginButton: {
        mt: 2,
        mb: 3,
        color: "#6a0572",
        borderColor: "#6a0572",
        '&:hover': {
            backgroundColor: 'rgba(164, 80, 139, 0.05)',
            borderColor: "#a4508b",
            color: "#a4508b",
        },
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
    },
    signupLinkContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
    },
    signupText: {
        color: '#555555',
        fontSize: '0.95rem',
    },
};