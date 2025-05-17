const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const {authMiddleware,isAdmin}=require('../../middlewares/auth')

const router = express.Router();

router.get("/get",authMiddleware,isAdmin,getAllOrdersOfAllUsers);
router.get("/details/:id",authMiddleware,isAdmin,getOrderDetailsForAdmin);
router.put("/update/:id",authMiddleware,isAdmin,updateOrderStatus);

module.exports = router;