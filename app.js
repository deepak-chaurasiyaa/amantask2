const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.APP_PORT
console.log("port", PORT)
const adminRouter = require('./routes/admin.router');
const superAdminRouter = require("./routes/superAdmin.router");
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const passwordRouter = require('./routes/password.router')
const cartRouter = require("./routes/cart.router")

app.use(express.json())
app.use("/admin",adminRouter);
app.use("/super-admin",superAdminRouter); 
app.use("/product",productRouter);
app.use("/user",userRouter); 
app.use("/password",passwordRouter);
app.use("/cart",cartRouter)


app.listen(PORT, (req, res) => {
    console.log('Server up running on port : ', PORT)
})
