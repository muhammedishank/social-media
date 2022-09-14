import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Modal,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const forgott = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const checkPhoneNumber = async (num) => {
    // console.log(num[0].length)
    if (num[0].length != 10) {
      setError("Please Enter 10 digits");
    } else {
      
      try {
        const checkPhoneNum = await axios.post('/api/auth/checkPhoneNum',{ phone : num})
        if (checkPhoneNum.data == 'phoneConfirmed') {
          console.log("phoneConfirmed")
          localStorage.setItem('forgottPhone',num[0])
           navigate('/resetForm')
        }
      } catch (error) {
        console.log(error.response.data)
        setError("This is Not Your Phone Number");
      }
      
    }
  };
  const [data, setData] = useState({ phoneNum: "" });
  const { phoneNum } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data.phoneNum);
    checkPhoneNumber(data.phoneNum);
  };

  const goSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      {open ? (
        <StyledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={submitHandler}>
            <Box
              p={3}
              textAlign="center"
              bgcolor={"background.default"}
              color={"text.primary"}
              borderRadius={3}
              sx={{
                width: { xs: 250, sm: 280, md: 400 },
              }}
            >
              <Typography variant="h6" sx={{ mr: { md: 28.5 } }}>
                Find Your Account
              </Typography>

              <TextField
                name="phoneNum"
                value={phoneNum}
                onChange={changeHandler}
                textAlign="center"
                type={"number"}
                variant="outlined"
                placeholder="Please enter your mobile number"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    height: 45,
                    mt: 2,
                  },
                }}
              />  
              {error && (
                <Typography variant={180} style={{ color: "red",marginTop:4}}>
                  {error}
                </Typography>
              )}
              <Button
                onClick={(e) => setOpen(false)}
                sx={{
                  mt: 2,
                  mr: 2,
                  ml: { md: 25 },
                  bgcolor: "#F5F5F5",
                  borderRadius: 1,
                  color: "	#606060",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#181818",
                  },
                }}
                variant="outlined"
              >
                cancel
              </Button>
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#3c52b2",
                  },
                  color: "#fff",
                  bgcolor: "#1876d2",
                }}
                variant="outlined"
              >
                search
              </Button>
              <Divider
                textAlign="center"
                sx={{
                  width: "100%",
                  // width: { sm: 200, md: 300 },
                  bgcolor: "background.paper",
                  mt: { xs: 1, md: 2 },
                  mb: 2,
                  color: "gray",
                }}
              >
                OR
              </Divider>
              <Typography
                onClick={goSignup}
                sx={{
                  mt: 2,
                  color: "#1876d2",
                  fontWeight: "330",
                  "&:hover": {
                    color: "#3c52b2",
                    cursor: "pointer",
                    fontWeight: "400",
                  },
                }}
              >
                Create New Account
              </Typography>
            </Box>
          </form>
        </StyledModal>
      ) : null}

      
    </div>
  );
};

export default forgott;
