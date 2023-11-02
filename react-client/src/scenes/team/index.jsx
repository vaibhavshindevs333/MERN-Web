import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, useTheme} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined} from "@mui/icons-material";
import Header from "../../components/Header";
import { useSearch } from "../../searchContext";

const apiUrl = process.env.REACT_APP_API_URL;

const Team = () => {
  const [allUser, setAllUser] = useState([]);
  const { searchQuery } = useSearch();
  const dispatch = useDispatch();
  const theme = useTheme();
  const id = useSelector((state) => state.global.id);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/getAllUser/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(setAllUser(data.allUser));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getAllUser();
  }, [id, dispatch]);

  const deleteUser = (id, email) => {
    if (window.confirm(`Are you sure want to delete user with Id: ${id} & Email: ${email}`)) {
      fetch(`${apiUrl}/users/deleteUser`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          // Automatically refresh the page
          window.location.reload();
        });
     }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center"
            backgroundColor={role === "admin"
                    ? theme.palette.primary[600]
                    : role === "manager"
                    ? theme.palette.primary[600]
                    : theme.palette.primary[600]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlined />}
            {role === "manager" && <SecurityOutlined />}
            {role === "user" && <LockOpenOutlined />}
            <Typography color={theme.palette.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteUser(params.row.id, params.row.email)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = 
   allUser
   .filter(user => {
    const userData = `${user.email} ${user.contact} ${user._id}`.toLowerCase();
    return userData.includes(searchQuery.toLowerCase());
  })
  .map(user => ({
    id: `${user._id}`,
    name: `${user.firstName} ${user.lastName}`,
    email: `${user.email}`,
    contact: `${user.contact}`,
    location: `${user.location}`,
    occupation: `${user.occupation}`,
    role: `${user.role}`,
  }));

  return (
    <Box 
      m="20px"
      minWidth="200px"
      maxWidth="1485px"
    >
      <Header title="MANAGE TEAM" subtitle="Managing the Team Members" />
      <Box 
        m="40px 0 0 0" 
        height="70vh"
        minWidth="200px"
        maxWidth="1485px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: theme.palette.primary[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary[300],
            color: theme.palette.secondary[500],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary[700],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.secondary[500],
            color: theme.palette.secondary[500],
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.secondary[500]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[100]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns}  components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Team;
