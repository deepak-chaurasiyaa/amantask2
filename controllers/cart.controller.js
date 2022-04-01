const {create,getCartItemByUserId,getCartItemByUserIdProduct,updateCart} = require("../models/cart.model")
const jwt = require("jsonwebtoken");
const config = process.env
var getIdByToken = (req) =>{
    let getToken = (req) =>{
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            return req.headers.authorization.split(" ")[1];
          } 
          return null;
    } 
        let headerToken = getToken(req)
        const token = req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;
    
        const decoded = jwt.verify(token, config.secret_key);
        req.user = decoded;
        let id = decoded.id;
        return id;
  }

module.exports = {
    addToCart: (req, res) => {
      const body = req.body;
      const id = getIdByToken(req)
      body.userId = id;
      const productId = body.productId;
      // console.log(body.userId,"line26")
      getCartItemByUserIdProduct({id:id,productId:productId},(err,results)=>{
        if (err) {
            console.log(err);
            return res.status(400).json({
              success: 0,
              message:err
            });
          }else if(results.length > 0){
            console.log("qantity,",results.qantity)
            updateCart({req,productId},(err,results) =>{
              if (err) {
                console.log(err);
                return res.status(400).json({
                  success: 0,
                  message:err
                });
              }
              console.log("udate",results) 
            })
          }
    })
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            success: 0,
            message:err
          });
        }else{
          return res.status(200).json({
            success: 1,
            data: results 
          });
        }
       
      });
    }, 
    getCartItemByUserId:(req,res)=>{
        const id = getIdByToken(req)
        // const id = req.params.id;
        getCartItemByUserId(id,(err,results)=>{
            if (err) {
                console.log(err);
                return res.status(400).json({
                  success: 0,
                  message:err
                });
              }else{
                return res.status(200).json({
                  success: 1,
                  data: results 
                });
              }
        })
    }
    
} 