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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import OtpTimer from "otp-timer";
import OTPInput, { ResendOTP } from "otp-input-react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import axios from "axios";
import swal from "sweetalert";

const validate = async (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }
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
  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length < 10 || values.phone.length > 10) {
    errors.phone = "Phone number must be 10 digit long ";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 5) {
    errors.confirmPassword = "Password  must be 5 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "your passsword doesn't match";
  }
  return errors;
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
function Signup() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      console.log("go to home ");
      navigate("/userHome");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const GoogleAuthSignup = async (decoded) => {
    const userData = {
      name: decoded.name,
      email: decoded.email,
      password: decoded.sub,
    };
    
    try {
      const alredyExist = await axios.post("/api/auth/checkEmail", {
        email: decoded.email,
        name: decoded.name,
      });
      if (alredyExist.data == "noUser") {
        dispatch(register(userData));
      }
    } catch (error) {
      if (error.response.data == "emailExist") {
        console.log("Email exist");
        toast.error("This Email already Exist!, Try Another");
      } else if (error.response.data == "nameExist") {
        console.log("nmae exist");
        toast.error("This Name already Exist!, Try Another");
      } else {
        console.log(error)
      }
    }
   
  };
  const validateOtp = async (e) => {
    e.preventDefault();
    if (OTP.length === 4) {
      console.log(userData);
      const inOtpData = await axios.post("/api/auth/otpConfirmation", {
        phone: userData.phone,
        otp: OTP,
      });
      console.log(inOtpData);
      if (inOtpData.data == "otpConfirmed") {
        dispatch(register(userData));
      } else {
        console.log("otp not confirmed");
      }
    } else {
      console.log("Not 4 digit");
    }
  };

  const handleResend = async () => {
    console.log("resend otp");
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      // console.log(values);
      setUserData(values);
      console.log(values.email, values.name);
      try {
        const alredyExist = await axios.post("/api/auth/checkEmail", {
          email: values.email,
          name: values.name,
        });
        if (alredyExist.data == "noUser") {
          const phone = values.phone;
          const otpData = await axios.post("/api/auth/otpValidation", {
            phone: phone,
          });
          if (otpData.data == "success") {
            setOpen(true);
          } else {
            console.log("otp error from backend");
          }
        }
      } catch (error) {
        if (error.response.data == "emailExist") {
          console.log("Email exist");
          toast.error("This Email already Exist!, Try Another");
        } else if (error.response.data == "nameExist") {
          console.log("nmae exist");
          toast.error("This Name already Exist!, Try Another");
        } else {
          console.log(error)
        }
      }


      if (alredyExist.data == "emailExist") {
        console.log("Email exist");
        toast.error("This Email already Exist!, Try Another");
      } else if (alredyExist.data == "nameExist") {
        console.log("nmae exist");
        toast.error("This Name already Exist!, Try Another");
      } else {
        
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          margin="auto"
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          marginTop={5}
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
            sx={{
              color: "#1876d2",
              fontSize: { xs: "22px", sm: "25px", md: "30px" },
            }}
            padding={1}
            textAlign="center"
          >
            Create an Account
          </Typography>
          <Typography
            variant="h6"
            padding={1}
            maxWidth={300}
            textAlign="center"
            fontWeight={400}
            sx={{
              display: { xs: "none", sm: "block" },
              mb:2,
              color: "gray",
              fontWeight: "350",
            }}
          >
            Sign up to see photos and videos from your friends.
          </Typography>

          <GoogleLogin
            width="large"
            theme="outline"
            onSuccess={(credentialResponse) => {
              const decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
              GoogleAuthSignup(decoded);
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <Divider
            sx={{
              width: { sm: 200, md: 300 },
              bgcolor: "background.paper",
              mt: { xs: 2, md: 3 },
              mb: 1,
            }}
          >
            {" "}
            <span style={{ color: "grey" }}>OR</span>{" "}
          </Divider>

          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            margin="normal"
            type={"text"}
            variant="outlined"
            placeholder="Name"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.name ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.name}
            </Typography>
          ) : null}
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
                height: 43,
              },
            }}
          />
          {formik.errors.email ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.email}
            </Typography>
          ) : null}

          <TextField
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            margin="normal"
            // type={"number"}
            variant="outlined"
            placeholder="Phone Number"
            sx={{
              width: { sm: 200, md: 300 },
              "& .MuiInputBase-root": {
                height: 43,
              },
            }}
          />
          {formik.errors.phone ? (
            <Typography variant="body1" color={"red"}>
              {formik.errors.phone}
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
                height: 43,
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
            endIcon={<HowToRegIcon />}
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
            Signup
          </Button>
          <Box sx={{ marginTop: 1 }}>
            {" "}
            <span
              style={{ color: "black", marginLeft: "5px", fontWeight: "150" }}
            >
              Have an account ?{" "}
            </span>{" "}
            <Button sx={{ borderRadius: 1 }}>
              {" "}
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "#1876d2" }}
              >
                Log in
              </Link>
            </Button>
          </Box>
        </Box>
      </form>

      {/* Otp section */}
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
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
          <Typography variant="h6">Enter 4 digit otp here</Typography>
          <Divider
            textAlign="center"
            sx={{
              width: "100%",

              bgcolor: "background.paper",
              mt: { xs: 1, md: 2 },
              mb: 2,
              color: "gray",
            }}
          ></Divider>
          <Box sx={{ marginLeft: { sm: "50px", md: "100px" } }}>
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

            {/* <div className="flex justify-between"> */}
          </Box>
          <OtpTimer
            seconds={0}
            minutes={10}
            ButtonText="Resend OTP"
            buttonColor={"black"}
            background={"none"}
            resend={handleResend}
          />
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
            validate
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}

export default Signup;
