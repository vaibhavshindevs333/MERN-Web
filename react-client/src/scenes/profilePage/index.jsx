import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowBackOutlined, ContactPhoneOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import Navbar from "../navbar";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.global.id);
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  useEffect(() => {
    const getUser = async () => {
      try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
               "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
        const {picture, firstName, lastName, contact, location, occupation } = data;
        dispatch(
          setUser({picture, firstName, lastName, contact, location, occupation })
          );
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
    };
    getUser();
  }, [id, dispatch]);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
      <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
      
      <WidgetWrapper>
        {/* FIRST ROW */}
        <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/home")}
            startIcon={<ArrowBackOutlined />}
        >
          Back
        </Button>
        <Box p="0.5rem 0" />
        <Divider/>
        <Box p="0.5rem 0" />
        <Typography
              variant="h4"
              color="primary"
              textAlign="center"
            >
              Profile
            </Typography>
            <Box p="0.5rem 0" />
        <Typography
              variant="h4"
              color="secondary"
              textAlign="center"
            >
              {id}
            </Typography>
       <FlexBetween
                 gap="0.5rem"
                 pb="1.1rem"
          >
        <FlexBetween gap="5rem">
        <Box 
              component="img"
              alt="user"
              src={`data:image/*;base64,${user?.picture || " "}`}
              width="70px" 
              height="70px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
            >
              {user ? `${user.firstName} ${user.lastName}` : " "}
            </Typography>
          </Box>
        </FlexBetween>
        <Button
            variant="contained"
            color="neutral"
            sx={{ color: medium }}
            onClick={() => navigate(`/update/${id}`)}
            startIcon={<EditOutlined />}
        >
          Edit
        </Button>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
      <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
          <ContactPhoneOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={main}>{user ? `${user.contact}` : " "}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={main}>{user ? `${user.location}` : " "}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="2rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={main}>{user ? `${user.occupation}` : " "}</Typography>
        </Box>
      </Box>
      </WidgetWrapper>
      <Box m="2rem 0" />
      </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
