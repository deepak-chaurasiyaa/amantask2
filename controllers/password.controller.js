const nodemailer = require('nodemailer');
const {getUserByUserEmail,updateUser,getUserByUserId,resetPassword} = require('../models/user.model');
const {sign} = require('jsonwebtoken')
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const jwt = require("jsonwebtoken");
const config = process.env
// var getIdByToken = (req) =>{
//     try{
//         let getToken = (req) =>{
//         if (
//             req.headers.authorization &&
//             req.headers.authorization.split(" ")[0] === "Bearer"
//             ) {
//                 return req.headers.authorization.split(" ")[1];
//             } 
//             return null;
//         } 
//         let headerToken = getToken(req)
//         const token = req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;

//         const decoded = jwt.verify(token, config.secret_key);
//         req.user = decoded;
//         let id = decoded.id;
//         return id;
//     }
//     catch(err){
//         return false
//     }
// }
const validateUserEmail = (req, res, next) => {
const email = req.body.email;
    try {
        getUserByUserEmail(email, (err, results) => {
            if (!results) {
            return res.status(404).json({
                success: 0,
                data: "No User Found Please do Sign Up"
            });
            }
            console.log('email',results)
            if(results.length < 1){
            return res.json({
                success: 1,
                message: "Reset Password Link has been sent successfully to your email"
                });
            }
            if(results){
            const jsontoken = sign({ FullName: results[0].firstName + " " + results[0].lastName,
            id:results[0].id,
            },process.env.secret_key, {
                expiresIn: "1h"
            });
            results[0].token = jsontoken;
            updateUser(results[0], (err, results) => {
                if (err) {
                    console.log(err);
                    return false;
                } 
                if(!results){
                    return res.json({ 
                        success: 0,
                        message:'failed to Send Reset Password Mail'
                    })
                }
                sendMail(email,jsontoken)
                return res.json({
                    success: 1,
                    message: "Reset Password Link has been sent successfully to your email"
                });
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
}

let sendMail = function(email,token){
    var mailTransporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "693f5045d1518d",
        pass: "dbff013f91afa5"
        }
    });

    let mailDetails = {
        from: 'dchaurasiya8589@gmail.com',
        to: email,
        subject: 'Reset Password', 
        html: '<p>Click <a href="http://localhost:3000/' + token + '">here</a> to reset your password</p>',
        text: token
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

const resetpassword = (req,res, next)=>{
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // console.log(password,confirmPassword);
    if(! (password === confirmPassword)){
        return res.status(404).json({message:"password and confirm password do not match."})
    }
    const token = req.params.id;
    const decoded = jwt.verify(token, config.secret_key);
        req.user = decoded;
        let id = decoded.id;
        console.log("id",id)
    // let id = getIdByToken(req)
    if(!id){
      return  res.status(403).json({message: 'Please Provide a valid token!'})
    }
    else{
        getUserByUserId(id, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            if (!results) {
              return res.json({
                    success: 0,
                    message: "Record not Found may be the user deleted his/her profile."
                });
            }
            if(results.token === req.params.id){
                req.body.id = results.id
                const body = req.body;
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                resetPassword(req.body, (err, results) => {
                    res.status(200).json({
                        result: results
                    })
                });
            }
            else{
               return res.status(400).json({
                   status:false,
                   message:"Login Token Alrady Used or Invalid"
               })
            }
        });
    }
    
}


module.exports = {
    sendMail,
    validateUserEmail,
    resetpassword
}