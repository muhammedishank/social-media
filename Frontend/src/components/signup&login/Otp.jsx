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
import React, { Component, useState } from "react";
import OtpInput from "react-otp-input";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Otp = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
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
              // width: { sm: 200, md: 300 },
              bgcolor: "background.paper",
              mt: { xs: 1, md: 2 },
              mb: 2,
              color: "gray",
            }}
          ></Divider>
          <Box sx={{ marginLeft: { sm: "50px", md: "100px" } }}>
            <OtpInput
              inputStyle={{
                width: "2rem",
                height: "2rem",
                margin: "20px 0.25rem",
                fontSize: "2rem",
                borderRadius: 4,
                border: "1px solid #051b34",
              }}
              onChange={(otp) => console.log(otp)}
              numInputs={4}
            />
          </Box>
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
        </Box>
      </StyledModal>
    </>
  );
};

export default Otp;

{
  /* <OtpInput
          inputStyle={{
            width: "2rem",
            height: "2rem",
            margin: "20px 0.25rem",
            fontSize: "2rem",
            borderRadius: 4,
            border: "1px solid #051b34",
          }}
            isInputNum={true}
            shouldAutoFocus={true}
            className="text-blue-500 p-5"
            value={state.otp}
            onChange={(e) => {
              handleOtp(e);
            }}
            numInputs={6}
          />
          <div className="flex justify-between">
            <OtpTimer
             
              seconds={30}
              minutes={0}
              ButtonText="Resend OTP"
              buttonColor={"black"}
              background={"none"}
              resend={handleResend}
            /> */
}
