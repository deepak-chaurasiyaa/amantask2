const router = require("express").Router();
const {
//   create,
  getProductById,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {admOrSuperAdmAuth} = require("../helpers/Auth/Auth.controller")
const imageUpload = require("../log/imageUpload")
const {upload} = require("../utils/uploadImage")
const {update} = require("../utils/uploadImage")
router.post("/",admOrSuperAdmAuth,imageUpload.single('image'),upload);
router.get("/:id",admOrSuperAdmAuth, getProductById);
router.get("/",admOrSuperAdmAuth, getProduct);
router.put("/:id",admOrSuperAdmAuth, imageUpload.single('image'),update);
router.delete("/",admOrSuperAdmAuth, deleteProduct);

module.exports = router;