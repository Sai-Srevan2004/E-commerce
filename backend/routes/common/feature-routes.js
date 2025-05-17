const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller");

const {authMiddleware,isAdmin}=require('../../middlewares/auth')


const router = express.Router();

router.post("/add",authMiddleware,isAdmin,addFeatureImage);
router.get("/get",getFeatureImages);

module.exports = router;