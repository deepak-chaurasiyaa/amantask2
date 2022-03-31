const router = require("express").Router();
const {
  createUser,
  login,
  getUserByUserId,
  getUsers, 
  updateUsers,
  deleteUser,
} = require("../controllers/user.controller");
const {getProduct} = require("../controllers/product.controller");
const {userAuth} = require("../helpers/Auth/Auth.controller")
const {validateBody,validateParam,schemas} = require("../helpers/bodyValidate/bodyValidation")
// router.get("/",getUsers);
router.get("/by-token",getUserByUserId)   /// Reading User Id From Bearer Token
router.get("/",getUsers)   /// Reading User Id From Bearer Token
router.get("/product",getProduct)   /// Reading User Id From Bearer Token
router.post("/", validateBody(schemas.post_validation), createUser);
// router.get("/:id",validateParam(schemas.get_validation), getUserByUserId);
router.put("/",userAuth,validateBody(schemas.update_validation), updateUsers);
router.delete("/:id",validateParam(schemas.delete_validation), deleteUser);
router.post("/login",validateBody(schemas.login_validation), login);

module.exports = router;
