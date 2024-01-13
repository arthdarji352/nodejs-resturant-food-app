const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
  updateResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

//routes
//create resturant || POST
router.post("/create", authMiddleware, createResturantController);
//get all resturants || GET
router.get("/getAll", getAllResturantController);
//get resturant by ID || GET
router.get("/get/:id", getResturantByIdController);
//delete resturatn || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);
//update resturant|| PUT
router.put("/update/:id", authMiddleware, updateResturantController);

module.exports = router;
