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
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const forgotPassword = () => {
    console.log("Forgot");
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
      dispatch(login(userData));
    },
  });
  const goSignup = () => {
    navigate("/signup");
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/userHome");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
          marginTop={'200px'}
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
            sx={{ color: "#1876d2" }}
            textAlign="center"
          >
            Login
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
            <Typography variant="h6" sx={{mr:{md:28.5},}}>Find Your Account</Typography>

            <TextField
              name="phone"
              
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
            <Button
             onClick={(e) => setOpen(false)}
              type="submit"
              sx={{
                mt: 2,
                mr: 2,
                ml:{md:25},
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
        </StyledModal>
      </form>
    </div>
  );
}

export default Login;
