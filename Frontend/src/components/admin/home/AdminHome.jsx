import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";

import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Users from '../users/users'


const AdminHome = () => {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("home use effect");
    if (admin) {
      navigate("/AdminHome");
    } else {
      navigate('/')
    }
  }, [admin]);
  
  return (
    <div  >
       <Navbar />
       <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar  />
        <Users />
        {/* <Rightbar /> */}
      </Stack>
    </div>

  )
}

export default AdminHome

// import React from 'react'
// import './AdminHome.scss'
// import Chart from './chart/Chart'
// import Featured from './featured/Featured'
// import Table from './table/Table'
// import Widget from './widget/Widget'
// function AdminHome() {
//   useEffect(() => {
//     console.log("home use effect");
//     if (admin) {
//       navigate("/AdminHome");
//     } else {
//       navigate('/')
//     }
//   }, [admin]);
//   return (
//     <>
//     {/* <div className='widgets'>
//       <Widget type='user'/>
//       <Widget type='order'/>
//       <Widget type='earning'/>
//       <Widget type='balance'/>
//     </div> */}
//     {/* <div className="charts">
//       <Featured/>
//       <Chart/>
//     </div> */}
//     <div className="listContainer">
//       <div className="listTitle">Latest Trasnsactions</div>
//       <Table/>
//     </div>
//     </>
    
//   )
// }

// export default AdminHome