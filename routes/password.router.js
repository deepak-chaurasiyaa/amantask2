const { Router } = require("express");
const {validateUserEmail,resetpassword} = require("../controllers/password.controller");

const router = require("express").Router();

const {validateBody,schemas} = require("../helpers/bodyValidate/bodyValidation")
router.post("/reset-password-mail",validateBody(schemas.email_validation), validateUserEmail)
router.post("/reset-password/:id",validateBody(schemas.password_validation),resetpassword)
module.exports = router;