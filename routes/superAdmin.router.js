const express =require('express')
const router = express.Router();

const {login} = require("../controllers/superadmin.controller")

router.post("/login", login);
module.exports = router;

// const {createSuperAdmin} = require("../controllers/superadmin.controller");
// const { validateBody, schemas } = require('../helpers/bodyValidate/bodyValidation');
// console.log("Hi")
// router.post("/",validateBody(schemas.post_validation), createSuperAdmin)
// router.delete("/",validateBody(schemas.post_validation), createSuperAdmin)