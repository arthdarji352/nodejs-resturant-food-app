const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCateController,
  getAllCateController,
  getCateController,
  upateCateController,
  deleteCateController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//create || CAT
router.post("/create", authMiddleware, createCateController);
//get all CAT || GET
router.get("/getAll", getAllCateController);
//get single category
router.get("/get/:id", getCateController);
//update category ||PUT
router.put("/update/:id", authMiddleware, upateCateController);
//delete category ||delete
router.delete("/delete/:id", authMiddleware, deleteCateController);

module.exports = router;
