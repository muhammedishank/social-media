import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../userHome/Navbar";
import Rightbar from "../userHome/Rightbar";
import Add from "../userHome/Add";
import ProfileHome from "./profileHome";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'


const profile = ({ mode, setMode }) => {
  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
        
      
      <ProfileHome />
      <Rightbar />
      </Stack>
      <Add />
    </div>
  );
};

export default profile;
