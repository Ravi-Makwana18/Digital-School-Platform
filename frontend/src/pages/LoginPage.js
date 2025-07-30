import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, 
  CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop, Avatar 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, School, LockOutlined, Email, Person } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { motion } from 'framer-motion';

// Custom theme with improved typography and colors
const defaultTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.15px',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.2px',
    },
  },
  palette: {
    primary: {
      main: '#6a0572',
      light: '#a4508b',
      dark: '#5a0461',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6F42C1',
      light: '#9168E3',
      dark: '#5E35B1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 6px 12px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.08)',
    '0px 10px 20px rgba(0,0,0,0.1)',
    // ... rest of the default shadows
  ],
});

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
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={12} square={false} sx={styles.unifiedPanelGrid}>
                    <Box sx={styles.formBox}>
                        <Avatar sx={styles.avatarStyle}>
                            {role === "Student" ? <School fontSize="large" /> : 
                             role === "Admin" ? <Person fontSize="large" /> : 
                             <Email fontSize="large" />}
                        </Avatar>
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <School sx={styles.inputIcon} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        autoComplete="name"
                                        error={studentNameError}
                                        helperText={studentNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                        sx={styles.textField}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person sx={styles.inputIcon} />
                                                </InputAdornment>
                                            ),
                                        }}
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email sx={styles.inputIcon} />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlined sx={styles.inputIcon} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={() => setToggle(!toggle)} 
                                                edge="end"
                                                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                                            >
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={styles.textField}
                            />
                            <Grid container sx={styles.checkboxGrid}>
                                <FormControlLabel
                                    control={<Checkbox 
                                        value="remember" 
                                        sx={styles.checkbox}
                                        icon={<StyledCheckboxIcon />}
                                        checkedIcon={<StyledCheckboxCheckedIcon />}
                                    />}
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
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    <>
                                        Login
                                        <span style={{ marginLeft: '8px', display: 'inline-flex' }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 4L21 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    </>
                                )}
                            </LightPurpleButton>
                            <Button
                                fullWidth
                                onClick={guestModeHandler}
                                variant="outlined"
                                sx={styles.guestLoginButton}
                            >
                                {guestLoader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Login as Guest"
                                )}
                            </Button>
                            {role === "Admin" && (
                                <Box sx={styles.signupLinkContainer}>
                                    <Typography variant="body2" sx={styles.signupText}>
                                        Don't have an account?{' '}
                                        <StyledLink to="/Adminregister" sx={styles.signupLink}>
                                            Sign up
                                        </StyledLink>
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(4px)',
                    background: 'rgba(0,0,0,0.5)',
                }}
                open={guestLoader || loader}
            >
                <Box sx={styles.loaderContainer}>
                    <CircularProgress color="inherit" thickness={4} size={48} />
                    <Typography variant="h6" sx={styles.waitingText}>
                        Please Wait...
                    </Typography>
                </Box>
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default LoginPage;

// Styled checkbox icons for better look
const StyledCheckboxIcon = styled('span')(({ theme }) => ({
  borderRadius: 4,
  width: 18,
  height: 18,
  backgroundColor: '#f5f5f5',
  border: '1px solid #bdbdbd',
  backgroundImage: 'linear-gradient(180deg, hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, 0))',
  display: 'inline-block',
  position: 'relative',
  transition: 'all 0.2s ease',
}));

const StyledCheckboxCheckedIcon = styled(StyledCheckboxIcon)({
  backgroundColor: '#6a0572',
  borderColor: '#6a0572',
  '&:before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    width: 5,
    height: 10,
    borderRight: '2px solid #fff',
    borderBottom: '2px solid #fff',
    transform: 'rotate(45deg)',
    top: 1,
    left: 5,
  },
});

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6a0572;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #6a0572, #a4508b);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #a4508b;
    
    &:after {
      width: 100%;
    }
  }
`;

const styles = {
    mainGridContainer: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',  
        background: 'linear-gradient(135deg, #6a0572 0%, #a4508b 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: { xs: '20px', sm: '40px' },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            pointerEvents: 'none',
        },
    },
    unifiedPanelGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: '25px', sm: '35px', md: '45px' },
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15)',
        maxWidth: { xs: '90%', sm: '600px', md: '520px' },
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(164, 80, 139, 0.1) 0%, rgba(106, 5, 114, 0.15) 100%)',
            borderRadius: '50%',
            zIndex: 0,
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(164, 80, 139, 0.1) 0%, rgba(106, 5, 114, 0.15) 100%)',
            borderRadius: '50%',
            zIndex: 0,
        },
    },
    formBox: {
        my: { xs: 2, md: 4 },
        mx: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
    },
    avatarStyle: {
        margin: '0 auto 16px auto',
        width: 70,
        height: 70,
        backgroundColor: '#a4508b',
        boxShadow: '0 4px 12px rgba(106, 5, 114, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(106, 5, 114, 0.3)',
        },
    },
    formTitle: {
        mb: 1,
        color: '#212529',
        fontWeight: 700,
        fontSize: { xs: '2.2rem', md: '2.5rem' },
        textAlign: 'center',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            backgroundColor: '#6a0572',
            borderRadius: '2px',
        },
    },
    formSubtitle: {
        mb: 4,
        mt: 2,
        color: '#555555',
        textAlign: 'center',
        fontSize: '1.05rem',
        lineHeight: 1.6,
        fontWeight: 400,
    },
    form: {
        mt: 2,
        width: '100%',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
            transition: 'all 0.3s ease',
            '& fieldset': {
                borderColor: '#e0e0e0',
                borderWidth: '1px',
                transition: 'border 0.3s ease',
            },
            '&:hover fieldset': {
                borderColor: '#a4508b',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6a0572',
                boxShadow: '0 0 0 2px rgba(106, 5, 114, 0.15)',
                borderWidth: '2px',
            },
            '&.Mui-error fieldset': {
                borderColor: '#d32f2f',
                borderWidth: '2px',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#555555',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
                color: '#6a0572',
            },
            '&.Mui-error': {
                color: '#d32f2f',
            },
        },
        '& .MuiInputBase-input': {
            color: '#212529',
            fontSize: '1rem',
            padding: '14px 14px 14px 12px',
        },
        '& .MuiFormHelperText-root': {
            fontSize: '0.85rem',
            marginTop: '4px',
            marginLeft: '4px',
        },
        mb: 2,
    },
    inputIcon: {
        color: '#6a0572',
        fontSize: '1.3rem',
    },
    checkboxGrid: {
        display: "flex",
        justifyContent: "space-between",
        mt: 2,
        mb: 3,
        alignItems: 'center',
    },
    checkbox: {
        color: '#6a0572',
        '&.Mui-checked': {
            color: '#6a0572',
        },
        padding: '4px',
        marginRight: '6px',
        transition: 'all 0.2s ease',
    },
    checkboxLabel: {
        color: '#495057',
        fontSize: '0.95rem',
    },
    loginButton: {
        mt: 3,
        mb: 2,
        borderRadius: '12px',
        padding: '12px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
        background: 'linear-gradient(135deg, #a4508b 0%, #6a0572 100%)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(106, 5, 114, 0.25)',
        textTransform: 'none',
        letterSpacing: '0.5px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            background: 'linear-gradient(135deg, #b55a9c 0%, #7b0683 100%)',
            boxShadow: '0 6px 15px rgba(106, 5, 114, 0.35)',
            transform: 'translateY(-2px)',
        },
        '&:active': {
            transform: 'translateY(-1px)',
            boxShadow: '0 3px 8px rgba(106, 5, 114, 0.25)',
        },
    },
    guestLoginButton: {
        mt: 2,
        mb: 3,
        color: "#6a0572",
        borderColor: "#6a0572",
        borderWidth: '2px',
        borderRadius: '12px',
        padding: '11px 24px',
        fontSize: '1.1rem',
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(164, 80, 139, 0.04)',
            borderColor: "#a4508b",
            color: "#a4508b",
            borderWidth: '2px',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        },
        '&:active': {
            transform: 'translateY(-1px)',
        },
    },
    signupLinkContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
        mb: 1,
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #e0e0e0',
    },
    signupText: {
        color: '#495057',
        fontSize: '0.95rem',
        textAlign: 'center',
        fontWeight: 500,
    },
    signupLink: {
        color: '#6a0572',
        fontWeight: 600,
        marginLeft: '4px',
    },
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 40px',
        borderRadius: '16px',
        backgroundColor: 'rgba(33, 37, 41, 0.8)',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
    waitingText: {
        mt: 2,
        fontWeight: 500,
        color: '#fff',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    }
};