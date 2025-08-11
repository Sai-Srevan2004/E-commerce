const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();
const Otp = require("../../models/Otp");
const mailSender = require("../../helpers/mailSender");
const crypto = require("crypto"); 

// --- Send OTP ---
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required!"
      });
    }

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.json({
        success: false,
        message: "User already exists!"
      });
    }

    // Generate a cryptographically secure 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // Send OTP via email
    const mailResponse = await mailSender(
      email,
      "Verification of email from E-commerce:",
      `Your OTP for registration is: ${otp}`
    );

    if (!mailResponse) {
      return res.json({
        success: false,
        message: "Could not send OTP email. Please try again."
      });
    }

    // Save OTP to DB
    const otpPayload = { otp, email };
    const OtpBody = await Otp.create(otpPayload);

    return res.json({
      success: true,
      message: "OTP sent successfully!",
      otpId: OtpBody._id
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while sending OTP!"
    });
  }
};

// --- Register User ---
const registerUser = async (req, res) => {
  const { userName, email, password, otp } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });
    }

    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response,"otp")
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// --- Login User ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: `${true?"None":"Strict"}`,
      maxAge: 30 * 60 * 1000,
    }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// --- Logout User ---
const logoutUser = (req, res) => {

  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

module.exports = { registerUser, loginUser, logoutUser, sendOtp };
