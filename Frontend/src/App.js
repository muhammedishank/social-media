import Home from "./components/userHome/Home";
import Signup from "./components/signup&login/Signup";
import Otp from "./components/signup&login/resetFom";
import Login from "./components/signup&login/Login";
import Profile from "./components/profile/profile";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResetForm from "./components/signup&login/resetFom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'


function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/otp" element={<Otp />} />
            <Route exact path="/resetForm" element={<ResetForm />} />
            <Route
              exact
              path="/userProfile"
              element={<Profile setMode={setMode} mode={mode} />}
            />
            <Route
              exact
              path="/userHome"
              element={<Home setMode={setMode} mode={mode} />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
