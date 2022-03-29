
const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
  } = require("../models/user.model");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
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
      
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if(results){
          return res.status(500).json({
            success: 0,
            message:results
          });
        }

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

    login: (req, res) => {
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
            id:results[0].id, isUser:true,
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
      let id = getIdByToken(req)
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
      const body = req.body;
      const salt = genSaltSync(10);
      let id = getIdByToken(req)
      body.password = hashSync(body.password, salt);
      body.id = id;
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
      const data = req.params.id;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
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
  