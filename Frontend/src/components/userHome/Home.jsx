import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Feedbar from "./Feed";
import Add from "./Add";

import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("home use effect");
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feedbar />
        <Rightbar />
      </Stack>
      <Add />
    </div>
  );
};

export default Home;
