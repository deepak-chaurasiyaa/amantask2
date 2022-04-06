const express =require('express')
const router = express.Router();
const {placeOrder} =  require("../controllers/placeOrder.controller")
router.delete("/",placeOrder)
module.exports = router;