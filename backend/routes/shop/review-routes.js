const express = require("express");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

const {authMiddleware,isUser}=require('../../middlewares/auth')


router.post("/add",authMiddleware,isUser,addProductReview);
router.get("/:productId",getProductReviews);

module.exports = router;