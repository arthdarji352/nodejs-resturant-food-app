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

module.exports = { registerController };
