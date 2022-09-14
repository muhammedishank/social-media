// import styled from "@emotion/styled";
import { AppBar, Avatar, Box, InputBase, Toolbar, Typography,styled, Menu, MenuItem } from "@mui/material";
import Pets from "@mui/icons-material/Pets";
import MailIcon from "@mui/icons-material/Mail";
import Notifications from "@mui/icons-material/Notifications";
import Badge from '@mui/material/Badge'

 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { logout, reset } from "../../components/features/auth/authSlice";

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: 5,
  width: "35%",
}));


const Icons=styled(Box)(({theme})=>({
  display:'none',
  alignItems:'center',
  gap:'20px' ,
  [theme.breakpoints.up("sm")]:{
      display:'flex'
  }
}))
const Userbox = styled(Box)(({ theme }) => ({
  display:"flex",gap:"10px", alignItems:"center",
  [theme.breakpoints.up("sm")]:{
    display:'none'
}
}));


const Navbar = () => {
  const [open,setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { user}= useSelector(
    (state) => state.auth
  );
  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
}
  
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          ISHAN K
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="Search..."></InputBase>
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Avatar sx={{width:30,height:30, }} src="https://avatars.githubusercontent.com/u/102403834?v=4" 
          onClick={e=>{setOpen(true)}}
          />
        </Icons>
        <Userbox onClick={e=>{setOpen(true)}}>
        <Avatar sx={{width:30,height:30, }} src="https://avatars.githubusercontent.com/u/102403834?v=4" 
        />
        <Typography variant="span" >Ishan</Typography>
        </Userbox >
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={ e =>{ setOpen(false)}}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
