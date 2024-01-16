const categoryModel = require("../models/categoryModel");

//create CAt
const createCateController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      res.status(500).send({
        success: false,
        message: "Please provide title",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });

    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "New Category Created Successfully",
      newCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in Create Category api",
      error,
    });
  }
};
//get single category
const getCateController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(404).send({
        success: false,
        message: "category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "get category successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get category by id api",
      error,
    });
  }
};

//get all category
const getAllCateController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).send({
      success: true,
      message: "get All categories list successfully",
      totalCount: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in get all category api",
      error,
    });
  }
};

//update category
const upateCateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      res.status(404).send({
        success: false,
        message: "No category found",
      });
    }

    res.status(200).send({
      success: true,
      message: "category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update category api",
      error,
    });
  }
};
//update category
const deleteCateController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).send({
      success: true,
      message: "category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in delete category api",
      error,
    });
  }
};

module.exports = {
  createCateController,
  getAllCateController,
  getCateController,
  upateCateController,
  deleteCateController,
};
