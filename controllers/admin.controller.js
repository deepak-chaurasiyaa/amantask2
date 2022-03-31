const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
  } = require("../models/admin.model");


  const jwt = require("jsonwebtoken");
  const config = process.env;
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");

  let getToken = (req) =>{
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } 
      return null;
} 

module.exports = {
  
  createUser: (req, res) => {
    getUserByUserEmail(req.body.email,(err,result)=>{
      if(result.length>0){
        console.log(result,"line 31")
        return res.status(400).json({
          status:2,
          message:"User already exists with this Email!"
        })
      }
      else{
        const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
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
    }
    })
    
  },

  login: (req, res) => {
    console.log("xxxxxxxxxxxxxxxxx",req.body)
  try{
    
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
        
      }
      if(results.length > 0){
        
        const result = compareSync(body.password, results[0].password);
        if (result) {
          results.password = undefined;
          // console.log(results,"line 49")
          const jsontoken = sign({ FullName: results[0].firstName + " " + results[0].lastName,
          id:results[0].id, isAdmin:true,
        },process.env.secret_key, {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
          });
        } else{
          return res.status(400).json({ 
            success: 0,
            data: "Invalid credentials"
          });
        }
      }else {
        return res.status(400).json({ 
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  
  }
  catch (err) {
    return res.json({
      status:false,
      message: err.message
    })
  }
  },

  getUserByUserId: (req, res) => {
    let headerToken = getToken(req)
    console.log(headerToken)
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;
    
      const decoded = jwt.verify(token, config.secret_key);
      req.user = decoded;
      let id = decoded.id;
      console.log("id",id)
      // if(!id){
      //   try{
      //      id=req.params.id;
      //     if(!id){
      //       return res.status(404).json({
      //         status:0,
      //         message:"Id Not Found"
      //       })
      //     }
      //   }
      //   catch(err){
      //     return(err.message)
      //   }
      // }
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {

  let headerToken = getToken(req)
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;
  
    const decoded = jwt.verify(token, config.secret_key);
    req.user = decoded;
    let id = decoded.id;
    const body = req.body;
    body.id = id;
    // console.log(body,"?????????????")
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return false;
      } 
      if(!results){
          return res.json({ 
              success: 0,
              message:'failed to update user'
          })
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
  let headerToken = getToken(req)
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;
  
    const decoded = jwt.verify(token, config.secret_key);
    req.user = decoded;
    let data = decoded.id;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if(results.affectedRows === 0){
        return res.json({
          success: 0,
          message: "Record Not Found for performing delete operation"
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
};
  