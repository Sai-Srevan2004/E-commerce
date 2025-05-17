const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller");

const {authMiddleware,isUser}=require('../../middlewares/auth')


const router = express.Router();

router.post("/add",authMiddleware,isUser,addAddress);
router.get("/get/:userId",authMiddleware,isUser,fetchAllAddress);
router.delete("/delete/:userId/:addressId",authMiddleware,isUser,deleteAddress);
router.put("/update/:userId/:addressId",authMiddleware,isUser,editAddress);

module.exports = router;