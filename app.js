const express = require('express');
var cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors())
const PORT = process.env.APP_PORT
console.log("port", PORT)
const adminRouter = require('./routes/admin.router');
const superAdminRouter = require("./routes/superAdmin.router");
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const passwordRouter = require('./routes/password.router')
const cartRouter = require("./routes/cart.router")
const placeOrderRouter = require("./routes/placeOrder.router")
app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(express.json())
app.use("/admin",adminRouter);
app.use("/super-admin",superAdminRouter); 
app.use("/product",productRouter);
app.use("/user",userRouter); 
app.use("/password",passwordRouter);
app.use("/cart",cartRouter)
app.use("/place-order",placeOrderRouter)


app.listen(PORT, (req, res) => {
    console.log('Server up running on port : ', PORT)
})
