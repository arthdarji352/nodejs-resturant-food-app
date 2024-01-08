const userModel = require("../models/userModel");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }

    //checkuser
    const exitingUser = await userModel.findOne({ email });
    if (exitingUser) {
      return res.status(500).send({
        success: false,
        message: "email Already Registerd please Login",
      });
    }

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Login api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
