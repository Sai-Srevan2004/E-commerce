const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

const {authMiddleware,isUser}=require('../../middlewares/auth')


router.post("/create",authMiddleware,isUser,createOrder);
router.post("/capture",authMiddleware,isUser,capturePayment);
router.get("/list/:userId",authMiddleware,isUser,getAllOrdersByUser);
router.get("/details/:id",authMiddleware,isUser,getOrderDetails);

module.exports = router;