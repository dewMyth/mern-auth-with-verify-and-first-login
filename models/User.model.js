//Importing mongoose library
const mongoose = require("mongoose");

//Creating a user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  OTP: { type: String, required: true },

  // this is the field to identify the user is not logged before
  isFirstLogin: { type: Boolean, default: true },
});

//Exporting the user schema as a model
module.exports = mongoose.model("User", userSchema);
