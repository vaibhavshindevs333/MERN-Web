import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close, AccountCircle, Dashboard } from "@mui/icons-material";
import { setMode, setLogout } from "../../state";
import FlexBetween from "../../components/FlexBetween";

const apiUrl = process.env.REACT_APP_API_URL;

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.global.id);
  const user = useSelector((state) => state.global.user);
  const role = useSelector((state) => state.global.role);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  
  const fullName = `${user?.firstName} ${user?.lastName}`;
  
  const handleLogout = async () => {
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
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
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          React App
        </Typography>
        <Typography
            fontWeight="bold"
            onClick={() => navigate("/home")}
            sx={{
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
        >
          Home
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
          <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
          <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
          <Help sx={{ fontSize: "25px" }} />
          </IconButton>
          {role === 'admin' || role === 'manager' ? (
            <IconButton 
                onClick={() => navigate('/dashboard')} 
                sx={{ 
                  "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
                }}>
              <Dashboard sx={{ fontSize: "25px" }} />
            </IconButton>
          ) : (
            null
          )}
          <IconButton
             onClick={() => navigate(`/profile/${id}`)}
             sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
             >
            <AccountCircle sx={{ fontSize: "25px" }} />
        </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onLogout={handleLogout} onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="300px"
          minWidth="150px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
          <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
          <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
          <Help sx={{ fontSize: "25px" }} />
          </IconButton>
          {role === 'admin' || role === 'manager' ? (
            <IconButton 
                onClick={() => navigate('/dashboard')} 
                sx={{ 
                  "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
                }}>
              <Dashboard sx={{ fontSize: "25px" }} />
            </IconButton>
          ) : (
            null
          )}
          <IconButton
             onClick={() => navigate(`/profile/${id}`)}
             sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
             >
            <AccountCircle />
          </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
