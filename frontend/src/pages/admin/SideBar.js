import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'; 
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";


const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <HomeRoundedIcon sx={{ color: location.pathname === ("/" || "/Admin/dashboard") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <SchoolRoundedIcon sx={{ color: location.pathname.startsWith('/Admin/classes') ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <SubjectRoundedIcon sx={{ color: location.pathname.startsWith("/Admin/subjects") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <GroupOutlinedIcon sx={{ color: location.pathname.startsWith("/Admin/teachers") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <PeopleAltRoundedIcon sx={{ color: location.pathname.startsWith("/Admin/students") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Students" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <NotificationsActiveRoundedIcon sx={{ color: location.pathname.startsWith("/Admin/notices") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <WarningRoundedIcon sx={{ color: location.pathname.startsWith("/Admin/complains") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1, borderColor: '#e0e0e0' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#555555', fontWeight: 600, fontSize: '0.8rem', paddingLeft: '24px' }}>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <AccountCircleRoundedIcon sx={{ color: location.pathname.startsWith("/Admin/profile") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <LogoutRoundedIcon sx={{ color: location.pathname.startsWith("/logout") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar;