import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks'; 

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'
                    sx={{
                        backgroundColor: '#6a0572',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: 'white',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                flexGrow: 1,
                                fontWeight: 600,
                                fontSize: '1.25rem',
                            }}
                        >
                            Teacher Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon sx={{ color: '#333333' }} />
                        </IconButton>
                    </Toolbar>
                    <Divider sx={{ borderColor: '#e0e0e0' }} /> 
                    <List component="nav">
                        <TeacherSideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<TeacherHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                        <Route path="/Teacher/profile" element={<TeacherProfile />} />

                        <Route path="/Teacher/complain" element={<TeacherComplain />} />

                        <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                        <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />

                        <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default TeacherDashboard;

const styles = {
    boxStyled: {
        backgroundColor: '#f8f9fa',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '24px',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [2],
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
    },
    drawerStyled: {
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        },
    },
    hideDrawer: {
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            width: '0px', 
            '@media (max-width: 600px)': {
                width: '0px',
                display: 'none',
            },
        },
    },
};