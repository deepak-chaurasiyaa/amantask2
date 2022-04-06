const {placeOrder} = require("../models/placeOrder.model")
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
    placeOrder:(req,res,callback)=>{
        const id = getIdByToken(req);
        
        placeOrder(id,(err,results)=>{ 
            if (err) {
              console.log(err);
              return res.status(400).json({
                success: 0,
                message:err
              });
            }
            else{
              return res.status(200).json({
                success:1,
                message:results
              })
            }
          })
    },
    
}