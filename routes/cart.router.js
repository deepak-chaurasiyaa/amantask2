const express =require('express')
const router = express.Router();

const {addToCart, getCartItemByUserId, deleteCartItem} = require("../controllers/cart.controller")

router.post("/", addToCart);
router.get("/",getCartItemByUserId);
router.delete("/",deleteCartItem);
module.exports = router;