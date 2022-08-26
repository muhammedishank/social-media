import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Feedbar from "./components/Feed";
import Signup from "./components/signup&login/Signup";
import Otp from "./components/signup&login/resetFom";
import Login from "./components/signup&login/Login";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import Add from "./components/Add";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResetForm from "./components/signup&login/resetFom";

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
