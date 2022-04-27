const express =require('express')
const router = express.Router();

const {addToCart, getCartItemByUserId, deleteCartItem} = require("../controllers/cart.controller")

router.post("/addToCart", addToCart);
router.get("/get-users-cart",getCartItemByUserId);
router.delete("/:id",deleteCartItem);
module.exports = router;