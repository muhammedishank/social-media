const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        require: [true, "Please add admin email"],
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        min: 5,
      },
      isAdmin: {
        type: Boolean,
        default: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);