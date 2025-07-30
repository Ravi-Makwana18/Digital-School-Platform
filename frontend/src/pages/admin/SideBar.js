import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box, Typography, Avatar, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'; 
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

// Styled components
const MenuItemBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#e74c3c',
        color: 'white',
        fontSize: 9,
        height: 16,
        minWidth: 16,
        padding: '0 4px'
    }
}));

const UserSection = styled(Box)({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px'
});

const StyledListItemButton = styled(ListItemButton)(({ active }) => ({
    margin: '4px 8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: active ? 'rgba(106, 5, 114, 0.08)' : 'transparent',
    '&:hover': {
        backgroundColor: 'rgba(106, 5, 114, 0.05)',
    },
    '& .MuiListItemIcon-root': {
        color: active ? '#6a0572' : '#666',
        minWidth: '40px'
    },
    '& .MuiListItemText-primary': {
        fontSize: '0.9rem',
        fontWeight: active ? 600 : 500,
        color: active ? '#6a0572' : '#555'
    }
}));


const SideBar = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === "/" || path === "/Admin/dashboard") {
            return location.pathname === "/" || location.pathname === "/Admin/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <UserSection>
                <Avatar 
                    sx={{
                        width: 70, 
                        height: 70, 
                        mb: 1,
                        background: 'linear-gradient(135deg, #6a0572 0%, #9546c4 100%)',
                        boxShadow: '0 4px 10px rgba(106, 5, 114, 0.3)'
                    }}
                >
                    A
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                    Admin User
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                    School Administrator
                </Typography>
            </UserSection>
            
            <Divider sx={{ mx: 2, mb: 2, borderColor: '#e0e0e0' }} />
            
            <Typography variant="overline" sx={{ px: 3, color: '#666', fontWeight: 600, fontSize: '0.7rem' }}>
                NAVIGATION
            </Typography>
            
            <React.Fragment>
                <StyledListItemButton component={Link} to="/" active={isActive("/") ? 1 : 0}>
                    <ListItemIcon>
                        <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/Admin/classes" active={isActive("/Admin/classes") ? 1 : 0}>
                    <ListItemIcon>
                        <SchoolRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/Admin/subjects" active={isActive("/Admin/subjects") ? 1 : 0}>
                    <ListItemIcon>
                        <SubjectRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/Admin/teachers" active={isActive("/Admin/teachers") ? 1 : 0}>
                    <ListItemIcon>
                        <GroupOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/Admin/students" active={isActive("/Admin/students") ? 1 : 0}>
                    <ListItemIcon>
                        <PeopleAltRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/Admin/notices" active={isActive("/Admin/notices") ? 1 : 0}>
                    <ListItemIcon>
                        <MenuItemBadge badgeContent={2}>
                            <NotificationsActiveRoundedIcon />
                        </MenuItemBadge>
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/Admin/complains" active={isActive("/Admin/complains") ? 1 : 0}>
                    <ListItemIcon>
                        <MenuItemBadge badgeContent={3} color="error">
                            <WarningRoundedIcon />
                        </MenuItemBadge>
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </StyledListItemButton>
            </React.Fragment>
            
            <Divider sx={{ my: 2, mx: 2, borderColor: '#e0e0e0' }} />
            
            <Typography variant="overline" sx={{ px: 3, color: '#666', fontWeight: 600, fontSize: '0.7rem' }}>
                USER ACCOUNT
            </Typography>
            
            <React.Fragment>
                <StyledListItemButton component={Link} to="/Admin/profile" active={isActive("/Admin/profile") ? 1 : 0}>
                    <ListItemIcon>
                        <AccountCircleRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </StyledListItemButton>
                
                <StyledListItemButton component={Link} to="/logout" active={isActive("/logout") ? 1 : 0}>
                    <ListItemIcon>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </StyledListItemButton>
            </React.Fragment>
            
            <Box sx={{ p: 2, mt: 2, mx: 2, borderRadius: 2, bgcolor: 'rgba(106, 5, 114, 0.05)' }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem', textAlign: 'center' }}>
                    School Management System
                    <br />
                    <span style={{ fontWeight: 600 }}>v1.2.0</span>
                </Typography>
            </Box>
        </>
    )
}

export default SideBar;