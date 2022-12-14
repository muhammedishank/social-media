const router = require("express").Router();
const User = require("../model/User");
const Admin = require("../model/Admin");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const ServiceSID = process.env.ServiceSID;
const AccountSID = process.env.AccountSID;
const authToken = process.env.authToken;
const client = require("twilio")(AccountSID, authToken);

const checkEmail = async (req, res) => {
  try {
    // check exsting user
    console.log(req.body);

    const exstingMail = await User.findOne({ email: req.body.email });
    const exstingName = await User.findOne({ username: req.body.name });
    // console.log(exstingName);
    // console.log(exstingMail);
    if (exstingMail) {
      console.log("exist email");
      res.status(400).json("emailExist");
    } else if (exstingName) {
      console.log("exist name");
      res.status(400).json("nameExist");
    } else {
      res.status(200).json("noUser");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const otpValidation = async (req, res) => {
  try {
    client.verify.services(ServiceSID).verifications.create({
      to: `+91${req.body.phone}`,
      channel: "sms",
    });
    console.log("otp send");
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
};

const otpConfirmation = async (req, res) => {
  try {
    client.verify
      .services(ServiceSID)
      .verificationChecks.create({
        to: `+91${req.body.phone}`,
        code: req.body.otp,
      })
      .then((response) => {
        console.log(response);
        if (response.valid) {
          console.log("otp validated");
          res.status(200).json("otpConfirmed");
        } else {
          console.log("otp failed");
          res.status(400).json("confirmationFailed");
        }
      });
  } catch (err) {
    console.log("eroor");
    res.status(500).json(err);
  }
};

// register
const register = async (req, res) => {
  try {
    // Generate new password
    console.log(req.body);
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    // create new user
    const newUser = await new User({
      username: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    // save user and respond
    const user = await newUser.save();

    res.status(200).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.log("not registered");
    res.status(500).json(err);
  }
};

// Login user
const login = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    console.log(admin, "ADMIN details");
    const user = await User.findOne({ email: req.body.email });
    if (admin) {
      console.log("it is admin");
      const validPassword = await bycrypt.compare(
        req.body.password,
        admin.password
      );
      console.log(validPassword, 'password validation detais');
      if (!validPassword) {
        return res.status(404).json("Wrong  Admin password");
      }
      res.status(200).json({
         admin: true,
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      if (!user) {
        return res.status(404).json("user not found");
      }
      const validPassword = await bycrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong password");
      }
      res.status(200).json({
         admin: user.isAdmin,
        _id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// forgottPassword
const forgottPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not Found!");
    }
    const salt = await bycrypt.genSalt(10);
    const password = await bycrypt.hash(req.body.password, salt);
    const forgottPassword = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: password } }
    );
    console.log(forgottPassword, "updated password");
    const SaveUser = await forgottPassword.save();
    // console.log(SaveUser);
    res.status(200).json("updated password");
  } catch (error) {
    console.log(error);
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const checkPhoneNum = async (req, res) => {
  try {
    // check exsting user
    console.log(req.body.phone);
    const exstingPhone = await User.findOne({ phone: req.body.phone });

    if (exstingPhone) {
      console.log("exist Phone");
      client.verify.services(ServiceSID).verifications.create({
        to: `+91${req.body.phone}`,
        channel: "sms",
      });
      console.log("otp send");
      res.status(200).json("phoneConfirmed");
    } else {
      console.log("no phone matched");
      res.status(400).json("noPhone");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// logout the user
const logout = async (req, res) => {
  try {
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
module.exports = {
  register,
  login,
  otpValidation,
  otpConfirmation,
  checkEmail,
  checkPhoneNum,
  logout,
  forgottPassword,
};
