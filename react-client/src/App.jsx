import React, { useMemo } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { SearchProvider } from "./SearchContext";
import Home from "./scenes/homePage";
import Login from "./scenes/loginPage";
import Profile from "./scenes/profilePage";
import Update from "./scenes/profilePage/Update";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Layout from "./scenes/layout";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const role = useSelector((state) => state.global.role);

  return (
    <div className="app">
      <Router>
      <SearchProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/account" replace />} />
            <Route path="/account" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update/:id" element={<Update />} />
            {role === 'admin' || role === 'manager' ? (
            <Route element={<Layout />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/team" element={<Team />} />
             <Route path="/contacts" element={<Contacts />} />
             <Route path="/invoices" element={<Invoices />} />
             <Route path="/form" element={<Form />} />
             <Route path="/bar" element={<Bar />} />
             <Route path="/pie" element={<Pie />} />
             <Route path="/line" element={<Line />} />
             <Route path="/faq" element={<FAQ />} />
             <Route path="/calendar" element={<Calendar />} />
             <Route path="/geography" element={<Geography />} />
            </Route>
              ) : (
                 null
              )}
          </Routes>
        </ThemeProvider>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;
