const express =require('express')
const router = express.Router();

const {addToCart, getCartItemByUserId} = require("../controllers/cart.controller")

router.post("/", addToCart);
router.get("/",getCartItemByUserId);
module.exports = router;