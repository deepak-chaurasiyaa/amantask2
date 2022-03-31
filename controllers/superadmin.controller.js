const {getUserByUserEmail,create} = require('../models/superadmin.model')
const { sign } = require("jsonwebtoken");
const {compareSync,genSaltSync,hashSync} = require("bcrypt");
module.exports = {
    
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          const result = compareSync(body.password, results[0].password);
          
          if (result) {
              {
                  console.log("result 71", result)
              }
            results.password = undefined;
            const jsontoken = sign({id:results[0].id,Name: results[0].firstName + " " + results[0].lastName, isSuperAdmin:true }, process.env.secret_key, {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken
            });
            } else {
                return res.json({
                success: 0,
                data: "Invalid email or password"
                });
            }
        });
    },
    createSuperAdmin: (req, res) => {
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
    },
    deleteSuperAdmin: (req, res) => {
      const data = req.params.id;
      deleteSuperAdmin(data, (err, results) => {
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
} 