const router = require("express").Router();
const {
  createUser,
  login,
  getUserByUserId,
  getUsers, 
  updateUsers,
  deleteUser,
} = require("../controllers/admin.controller");

const {admAuth} = require("../helpers/Auth/Auth.controller")

const {superAdmAuth} = require("../helpers/Auth/Auth.controller")
const {validateBody,validateParam,schemas} = require("../helpers/bodyValidate/bodyValidation")
router.get("/",getUsers);
router.post("/", superAdmAuth, validateBody(schemas.post_validation), createUser);
router.get("/:id",validateParam(schemas.get_validation), getUserByUserId);
router.put("/",admAuth,validateBody(schemas.update_validation), updateUsers);
router.delete("/", admAuth, deleteUser);
router.post("/login",validateBody(schemas.login_validation), login);

module.exports = router;
