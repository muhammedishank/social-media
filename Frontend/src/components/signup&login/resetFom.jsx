// import { Box, Modal, styled } from "@mui/material";
import {
  Box,
  TextField,
  Typography,
  Button,
  styled,
  Modal,
  Divider,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import React, { Component, useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const validate = async (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Password  must be 5 character long ";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 5) {
    errors.confirmPassword = "Password  must be 5 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Your Passsword doesn't Match";
  }
  return errors;
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ResetForm = () => {
  const [OTP, setOTP] = useState("");
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(null);
  const forgottPhoneNum = localStorage.getItem("forgottPhone");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      const resetData = {
        email: values.email,
        password: values.password,
      };
      console.log(resetData);
      // dispatch(login(resetData));
    },
  });

  const validateOtp = async (e) => {
    e.preventDefault();
    // console.log(userData);
    //console.log(OTP.length);
    console.log(forgottPhoneNum);
    if (OTP.length === 4) {
      const inOtpData = await axios.post("/api/auth/otpConfirmation", {
        phone: forgottPhoneNum,
        otp: OTP,
      });
      console.log(inOtpData);
      if (inOtpData.data == "otpConfirmed") {
        await localStorage.removeItem("forgottPhoneNum");
        setOpen(false);
      } else {
        setError("Wrong OTP!, Enter Valid OTP");
      }
    } else {
      console.log("Not 4 digit");
    }
  };

  return (
    <>
      <StyledModal
        open={open}
        // onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          p={3}
          textAlign="center"
          bgcolor={"background.default"}
          color={"text.primary"}
          borderRadius={3}
          sx={{
            width: { sm: 300, md: 400 },
          }}
        >
          <Typography variant="h6" style={{ color: "#1876d2" }}>
            Please Enter the OTP
          </Typography>
          <Typography>
            sent to <span style={{ color: "grey" }}>+91 {forgottPhoneNum}</span>
          </Typography>

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
          ></Divider>
          <Box sx={{ marginLeft: { xs: "25px", sm: "50px", md: "100px" } }}>
            <OTPInput
              value={OTP}
              inputStyles={{
                width: "2rem",
                height: "2rem",
                margin: "20px 0.25rem",
                fontSize: "2rem",
                borderRadius: 4,
                border: "1px solid #051b34",
              }}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
            />
          </Box>
          {error && (
            <Typography variant={180} style={{ color: "red", marginTop: 4 }}>
              {error}
            </Typography>
          )}
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
          ></Divider>

          <Button
            type="submit"
            onClick={(e) => {
              validateOtp(e);
            }}
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
            submit
          </Button>
        </Box>
      </StyledModal>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="flex"
            flexDirection={"column"}
            margin="auto"
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            marginTop={"200px"}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography
              // variant={{sx:h6, sm:h5,}}
              padding={1}
              sx={{ color: "#1876d2", fontSize:{ xs:"22px" ,sm:"25px", md:'30px'} }}
              textAlign="center"
            >
              Reset Your Password
            </Typography>

            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="Email"
              sx={{
                width: { sm: 200, md: 300 },
                "& .MuiInputBase-root": {
                  height: 45,
                },
              }}
            />
            {formik.errors.email ? (
              <Typography variant="body1" color={"red"}>
                {formik.errors.email}
              </Typography>
            ) : null}
            <TextField
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="Password"
              sx={{
                width: { sm: 200, md: 300 },
                "& .MuiInputBase-root": {
                  height: 45,
                },
              }}
            />
            {formik.errors.password ? (
              <Typography variant="body1" color={"red"}>
                {formik.errors.password}
              </Typography>
            ) : null}

            <TextField
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder=" Confirm Password"
              sx={{
                width: { sm: 200, md: 300 },
                "& .MuiInputBase-root": {
                  height: 43,
                },
              }}
            />
            {formik.errors.confirmPassword ? (
              <Typography variant="body1" color={"red"}>
                {formik.errors.confirmPassword}
              </Typography>
            ) : null}

            <Button
              endIcon={<LockResetIcon />}
              type="submit"
              sx={{
                marginTop: 1,
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
              Reset
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default ResetForm;
