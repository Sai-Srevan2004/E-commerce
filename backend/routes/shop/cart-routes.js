const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");

const {authMiddleware,isUser}=require('../../middlewares/auth')


const router = express.Router();

router.post("/add",authMiddleware,isUser,addToCart);
router.get("/get/:userId",authMiddleware,isUser,fetchCartItems);
router.put("/update-cart",authMiddleware,isUser,updateCartItemQty);
router.delete("/:userId/:productId",authMiddleware,isUser,deleteCartItem);

module.exports = router