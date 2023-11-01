import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../navbar";
import { ArrowBackOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const apiUrl = process.env.REACT_APP_API_URL;

function Update() {
    const [user, setUser] = useState({
        picture: null,
        firstName: "",
        lastName: "",
        contact: "",
        location: "",
        occupation: "",
        password: "",
      });
  const { palette } = useTheme();
  const navigate = useNavigate();
  const id = useSelector((state) => state.global.id);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
    formData.append("picture", user.picture);

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("contact", user.contact);
    formData.append("location", user.location);
    formData.append("occupation", user.occupation);
    formData.append("password", user.password);

      const response = await fetch(`${apiUrl}/users/updateUser/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const { message } = data;
      setUser({ message });
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  const message = `${user?.message || " "}`;

    return (
        <>
        <Box>
        <Navbar />
        <Box
          width="100%"
          height="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
        <Box flexBasis={isNonMobileScreens ? "50%" : undefined}>
        <Typography
                variant="h4"
                color="secondary"
                textAlign="center"
              >
              {message}
        </Typography>
         <WidgetWrapper>
          {/* FIRST ROW */}
          <Typography
                variant="h4"
                color="secondary"
                textAlign="center"
              >
               Id: {id}
            </Typography>
            <Divider/>
            <Box p="0.5rem 0">
            <Box
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1px"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                name="picture"
                autoComplete="Picture"
                onDrop={(acceptedFiles) => {
                    const file = acceptedFiles[0];
                    const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * 1; // 1 megabytes (1 MB) in bytes
                    if (file.size <= MAX_FILE_SIZE_IN_BYTES) { // Set your desired max file size in bytes
                      setUser({ ...user, picture: file});
                    } else {
                      // Display an error message or take appropriate action
                      alert("File size exceeds the allowed limit.");
                    }
                  }}
                >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1px"
                    textAlign="center"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!user.picture ? (
                          <p>Update Profile Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{user.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                  </Box>
                )}
              </Dropzone>
              </Box>
              <Box p="0.5rem 0">
            <TextField
              label="First Name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              sx={{ width: '50%' }}
            />
            <TextField
                  label="Last Name"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  sx={{ width: '50%' }}
                />
                </Box>
                <Box p="0.5rem 0">
                <TextField
                fullWidth
                  label="Contact"
                  value={user.contact}
                  onChange={(e) => setUser({ ...user, contact: e.target.value })}
                />
                </Box>
                <Box p="0.5rem 0">
                <TextField
                fullWidth
                  label="Location"
                  value={user.location}
                  onChange={(e) => setUser({ ...user, location: e.target.value })}
                />
                </Box>
                <Box p="0.5rem 0">
                <TextField
                fullWidth
                  label="Occupation"
                  value={user.occupation}
                  onChange={(e) => setUser({ ...user, occupation: e.target.value })}
                />
                </Box>
                <Box p="0.5rem 0">
                <TextField
                fullWidth
                  label="Password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                </Box>
                </Box>
                
                <Box mt="0.5rem" display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                    startIcon={<SaveOutlined />}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>  navigate(`/profile/${id}`)}
                    startIcon={<ArrowBackOutlined />}
                  >
                    Back
                  </Button>
                </Box>
              </WidgetWrapper>
             <Box m="0.5rem 0" />
            </Box>
          </Box>
       </Box>
    </>
  );
};

export default Update;