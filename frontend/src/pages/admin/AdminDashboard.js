import { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme,
    Avatar,
    Badge,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';
import { styled } from '@mui/material/styles';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

const HeaderBanner = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(135deg, #6a0572 0%, #9546c4 100%)',
    zIndex: -1,
    borderRadius: '0 0 20px 20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
}));

const DashboardHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '16px 24px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: '#333',
    fontSize: '1.5rem',
    marginLeft: '16px',
    '& span': {
        color: '#6a0572',
    }
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(135deg, #6a0572 0%, #9546c4 100%)',
    color: 'white',
    borderRadius: '24px',
    padding: '8px 16px',
    fontWeight: 500,
    textTransform: 'none',
    boxShadow: '0 4px 10px rgba(106, 5, 114, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 6px 15px rgba(106, 5, 114, 0.4)',
        transform: 'translateY(-2px)'
    }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#e74c3c',
        color: 'white',
        fontSize: 10,
        minWidth: 18,
        height: 18,
        padding: '0 4px',
        fontWeight: 'bold'
    }
}));

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);
    const location = useLocation();
    
    useEffect(() => {
        // Close drawer on mobile when location changes
        if (window.innerWidth < 900) {
            setOpen(false);
        }
    }, [location]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <HeaderBanner />
                <AppBar open={open} position='absolute'
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="white"
                            noWrap
                            sx={{
                                flexGrow: 1,
                                fontWeight: 600, 
                                fontSize: '1.25rem',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            Admin Dashboard
                        </Typography>
                        
                        <IconButton color="inherit" sx={{ mr: 2, color: 'white' }}>
                            <StyledBadge badgeContent={notificationCount}>
                                <NotificationsIcon />
                            </StyledBadge>
                        </IconButton>
                        
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <DashboardIcon sx={{ color: '#6a0572', mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6a0572' }}>
                                School System
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon sx={{ color: '#333333' }} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                    <Divider sx={{ borderColor: '#e0e0e0' }} />
                    <Box sx={{ overflow: 'auto', height: '100%', backgroundColor: 'white' }}>
                        <List component="nav" sx={{ p: 2 }}>
                            <SideBar />
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Box sx={{ mt: 5 }}>
                        <DashboardHeader>
                            <Avatar
                                sx={{
                                    bgcolor: '#6a0572',
                                    width: 48,
                                    height: 48,
                                    boxShadow: '0 4px 8px rgba(106, 5, 114, 0.3)'
                                }}
                            >
                                A
                            </Avatar>
                            <WelcomeText>
                                Welcome back, <span>Administrator</span>
                            </WelcomeText>
                            <Box sx={{ flexGrow: 1 }} />
                            <QuickActionButton startIcon={<NotificationsIcon />}>
                                View Notices
                            </QuickActionButton>
                        </DashboardHeader>
                    </Box>
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: '#f8f9fa',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '0',
        position: 'relative',
        transition: 'all 0.3s ease',
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
    },
    drawerStyled: {
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 280,
            transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: 'none',
            boxShadow: '2px 0 20px rgba(0,0,0,0.08)',
            zIndex: 10,
            '@media (max-width: 900px)': {
                boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
            },
        },
    },
    hideDrawer: {
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 280,
            transition: (theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: 'none',
            boxShadow: '2px 0 20px rgba(0,0,0,0.08)',
            width: '0px',
            '@media (max-width: 600px)': {
                width: '0px',
                display: 'none',
            },
        },
    },
};