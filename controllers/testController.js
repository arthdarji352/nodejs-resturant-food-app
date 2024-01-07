const testController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Test user data",
    });
  } catch (error) {
    console.log("error in Test api", error);
  }
};

module.exports = { testController };
