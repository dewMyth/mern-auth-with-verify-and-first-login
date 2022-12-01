//Importing the Router function from the Express framework
const router = require("express").Router();

//Importing the User model
const User = require("../models/User.model");

//Importing the bcrypt library
const bcrypt = require("bcrypt");

//Importing the jsonwebtoken library
const jwt = require("jsonwebtoken");

const { generateOTP } = require("../_helpers/otp");
const { sendMail } = require("../_helpers/emailService");

// Registering a new user
router.post("/register", async (req, res) => {
  try {
    //Generating a salt
    const salt = await bcrypt.genSalt(10);

    //Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const isExisting = await User.findOne({ email: req.body.email });

    if (isExisting) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      //Creating a new user
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        OTP: generateOTP(),
      });

      //Saving the user to the database
      try {
        await sendMail({
          to: newUser.email,
          OTP: newUser.OTP,
        });
        //Saving the new user
        const user = await newUser.save();

        //Sending the user
        res.json({
          message: "User created successfully and OTP sent to your email",
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      } catch (error) {
        return [false, "Unable to sign up, Please try again later", error];
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    //Finding the user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    } else {
      //Comparing the password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({
          error: "Invalid password",
        });
      } else {
        //Creating and assigning a token
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET_KEY
        );

        //Sending the token with the User -> Here print the isFirstLogin field to check if the user is logged in for the first time
        res.json({
          token, // JWT token is for backend route protections
          user: {
            id: user._id,
            isFirstLogin: user.isFirstLogin,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Verify OTP
router.post("/verifyOTP", async (req, res) => {
  try {
    //Finding the user
    const user = await User.findOne({
      email: req.body.email,
      OTP: req.body.OTP,
    });

    // If user or email is invalid dont proceed
    if (!user) {
      return res.status(400).json({
        error: "Invalid OTP or Email",
      });
    } else {
      // If user is valid then update the user, set isFirstLogin to false
      user.isFirstLogin = false;

      //Saving the user to the database
      await user.save();
      return res.json({
        message: "OTP verified successfully",
        user: {
          id: user._id,
          isFirstLogin: user.isFirstLogin,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
