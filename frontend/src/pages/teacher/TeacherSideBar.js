import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;

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
                        <HomeRoundedIcon sx={{ color: location.pathname === ("/" || "/Teacher/dashboard") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <SchoolRoundedIcon sx={{ color: location.pathname.startsWith("/Teacher/class") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary={`Class ${sclassName ? sclassName.sclassName : 'N/A'}`} sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/complain"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <ReportProblemRoundedIcon sx={{ color: location.pathname.startsWith("/Teacher/complain") ? '#6a0572' : '#555555' }} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" sx={{ '& .MuiListItemText-primary': { color: '#333333', fontWeight: 500 } }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1, borderColor: '#e0e0e0' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#555555', fontWeight: 600, fontSize: '0.8rem', paddingLeft: '24px' }}>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile"
                    sx={{
                        '&.Mui-selected': { backgroundColor: 'rgba(106, 5, 114, 0.1)' },
                        '&:hover': { backgroundColor: 'rgba(106, 5, 114, 0.05)' },
                    }}>
                    <ListItemIcon>
                        <AccountCircleRoundedIcon sx={{ color: location.pathname.startsWith("/Teacher/profile") ? '#6a0572' : '#555555' }} />
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

export default TeacherSideBar;