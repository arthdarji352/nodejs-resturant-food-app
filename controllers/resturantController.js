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

//get resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});

    if (!resturants) {
      res.status(404).send({
        success: false,
        message: "No Resturant available",
      });
    }

    res.status(200).send({
      success: true,
      message: "get All Resturant list successfully",
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get Resturants list api",
      error,
    });
  }
};

//get resturant by ID
const getResturantByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const resturant = await resturantModel.findById(id);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "get All Resturant list successfully",
      resturant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get Resturant by id api",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
};
