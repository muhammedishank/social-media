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
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset, AdminLogin } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import ForgottForm from "./forgott";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const validate = (values) => {
  
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Password number must be 5 character long ";
  }
  return errors;
};

// for forgott pop
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function Login() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminEmail = process.env.adminEmail
  const { user, admin, isAdmin, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isAdmin) {
      navigate("/adminHome");
    }
    if (isSuccess || user) {
      navigate("/userHome");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, isAdmin, navigate, dispatch]);
  const GoogleAuthLogin = (decoded) => {
    const userData = {
      email: decoded.email,
      password: decoded.sub,
    };
    dispatch(login(userData));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      if (values.email === adminEmail) dispatch(AdminLogin(userData));
      else dispatch(login(userData));
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
            variant="h4"
            padding={1}
            sx={{ color: "#1876d2", mb: 2 }}
            textAlign="center"
          >
            Login
          </Typography>

          <GoogleLogin
            width="large"
            theme="outline"
            onSuccess={(credentialResponse) => {
              const decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
              GoogleAuthLogin(decoded);
              console.log(credentialResponse);
            }}
            onError={() => {
              toast.error("Login Failed");
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
          <Button
            endIcon={<LoginIcon />}
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
            Login
          </Button>
          <Typography
            onClick={(e) => setOpen(true)}
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
            Forgotten Your Password?
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            {" "}
            <span
              style={{ color: "black", marginLeft: "5px", fontWeight: "150" }}
            >
              Don't have an account ?{" "}
            </span>{" "}
            <Button sx={{ borderRadius: 1 }}>
              {" "}
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "#1876d2" }}
              >
                sign up
              </Link>
            </Button>
          </Box>
        </Box>
      </form>

      <ForgottForm open={open} setOpen={setOpen} />
    </div>
  );
}

export default Login;
