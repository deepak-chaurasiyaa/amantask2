
const {create,updateProduct} = require('../models/product.model')
  
      let upload = async(req, res) =>{
      
        console.log("reaching here")
        const body = req.body;
        body.image = req.file.path;
         create(body, (err, results) => {
           if (err) {
             console.log(err);
             return res.status(400).json({
               success: 0,
               message:err
             });
           }
           return res.status(200).json({
             success: 1,
             data: results 
           });
         });
       
    }

    let update = async(req, res) =>{
        // console.log("reaching here",req.body)
        const body = req.body;
        body.image = req.file.path;
        if(req.params.id != undefined){
          body.id = req.params.id; 
        }
         updateProduct(body, (err, results) => {
           if (err) {
             console.log(err);
             return res.status(500).json({
               success: 0,
               message:err
             });
           }
           return res.status(200).json({
             success: 1,
             data: results 
           });
         });
       
    }

module.exports = {
    upload,
    update
}