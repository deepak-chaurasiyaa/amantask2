const express =require('express')
const router = express.Router();
const {placeOrder} =  require("../controllers/placeOrder.controller")
router.post("/",placeOrder)
module.exports = router;