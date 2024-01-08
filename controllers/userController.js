const userModel = require("../models/userModel");

//get user
const getUserController = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await userModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      message: "User data found successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get user api",
    });
  }
};

module.exports = { getUserController };
