import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme,} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined, HomeOutlined, PeopleOutlined, ContactsOutlined, ReceiptLongOutlined, PersonOutlined, CalendarTodayOutlined, HelpOutlineOutlined, BarChartOutlined, PieChartOutlined, TimelineOutlined, MapOutlined} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const navItems = [
  {text: "Dashboard", icon: <HomeOutlined /> },
  {text: "Data", icon: null },
  {text: "Team", icon: <PeopleOutlined />},
  {text: "Contacts", icon: <ContactsOutlined />},
  {text: "Invoices", icon: <ReceiptLongOutlined />},
  {text: "Pages", icon: null },
  {text: "Form", icon: <PersonOutlined />},
  {text: "Calendar", icon: <CalendarTodayOutlined />},
  {text: "FAQ", icon: <HelpOutlineOutlined />},
  {text: "Charts", icon: null },
  {text: "Bar", icon: <BarChartOutlined />},
  {text: "Pie", icon: <PieChartOutlined />},
  {text: "Line", icon: <TimelineOutlined />},
  {text: "Geography", icon: <MapOutlined />},
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile, }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <>
     <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1rem 2rem 2rem 2rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="1rem">
                  <Typography variant="h4" fontSize="20px" fontWeight="bold">
                    React Admin
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} fontWeight="bold" sx={{ m: "2rem 0 0.5rem 4rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const titleText = text.toLowerCase();
                
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${titleText}`);
                        setActive(titleText);
                      }}
                      sx={{
                        backgroundColor:
                          active === titleText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === titleText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0.1rem",
                          color:
                            active === titleText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === titleText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          </Drawer>
         )}
        </Box>
    </>
  );
};

export default Sidebar;
