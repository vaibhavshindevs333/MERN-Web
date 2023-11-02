import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Typography, IconButton, InputBase, Toolbar, Menu, MenuItem, useTheme, Button, Divider } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, ArrowDropDownOutlined, CloseOutlined } from "@mui/icons-material";
import { setMode, setLogout } from "../state";
import FlexBetween from "./FlexBetween";
import { useSearch } from "../searchContext";

const apiUrl = process.env.REACT_APP_API_URL;

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const theme = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const picture = useSelector((state) => state.global.picture);
  const [profile, setProfile] = useState(false);
   
  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleProfile = () => setProfile(true);
  const handleClose = () => setProfile(false);

  const handleLogout = async () => {
    try{
      const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
     },
    });
     const logout = await response.json();
     if (logout) {
      localStorage.removeItem('token');
      dispatch(setLogout({
        id: null,
        user: null,
        token: null,
        role: null
      }));
      navigate('/account');
     }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="0.5rem"
            p="0.1rem 1.5rem"
          >
            <InputBase 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton
             onClick={() => navigate('/home')}
             sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
             >
            <CloseOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
          <FlexBetween>
          <Button 
             onClick={handleProfile}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
              >
              <Box
                component="img"
                alt="user"
                src={`data:image/*;base64,${picture}`}
                height="70px"
                width="70px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                />
                  <Box textAlign="left" >
                      <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {user.firstName}
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {user.lastName}
                      </Typography>
                      <Typography
                        fontSize="0.75rem"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        {user.role}
                      </Typography>
                    </Box>
                    <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} /> 
                  </Button>
            <Menu 
                profile={profile}
                open={profile}
                onClose={handleClose}
                onLogout={handleLogout}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Navbar;
