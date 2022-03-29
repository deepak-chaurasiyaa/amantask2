const express =require('express')
const router = express.Router();

const {login} = require("../controllers/superadmin.controller")
// const {createSuperAdmin} = require("../controllers/superadmin.controller");
const { validateBody, schemas } = require('../helpers/bodyValidate/bodyValidation');

router.post("/login", login);
// router.post("/",validateBody(schemas.post_validation), createSuperAdmin)
module.exports = router;