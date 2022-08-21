const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/SocialMedia", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongoose db connected");
  })
  .catch((e) => {
    console.log("db not connected");
  });
