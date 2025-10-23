const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const {authMiddleware,isAdmin}=require('../../middlewares/auth')


const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
// upload → This is your Multer instance (configured with storage options).
// single("my_file") → This tells Multer to handle a single file upload and look for a field in the form called "my_file".

router.post("/add",authMiddleware,isAdmin,addProduct);
router.put("/edit/:id",authMiddleware,isAdmin,editProduct);
router.delete("/delete/:id",authMiddleware,isAdmin,deleteProduct);
router.get("/get",authMiddleware,isAdmin,fetchAllProducts);

module.exports = router;