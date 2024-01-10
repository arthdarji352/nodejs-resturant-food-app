const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//get user
const getUserController = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findOne({ _id: id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //hide password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User data found successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get user api",
      error,
    });
  }
};

//UPDATE USER

const updateUserController = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findById({ _id: id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update user api",
      error,
    });
  }
};

//RESET PASSWORD

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found and invalid answer",
      });
    }

    //password hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in reset password api",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
};
