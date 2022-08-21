import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Feedbar from "../components/Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import Add from "../components/Add";
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
