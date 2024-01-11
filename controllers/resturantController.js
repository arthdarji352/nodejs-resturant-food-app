const resturantModel = require("../models/resturantModel");

//create resturant
const createResturantController = async (req, res) => {
  try {
    // const resturantData = req.body;
    const {
      title,
      imageUrl,
      time,
      foods,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }

    const newResturant = new resturantModel({
      title,
      imageUrl,
      time,
      foods,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Create Resturant api",
      error,
    });
  }
};

module.exports = { createResturantController };
