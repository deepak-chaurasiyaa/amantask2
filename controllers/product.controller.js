const {
    create,
    getProductById,
    getProduct,
    updateProduct,
    deleteProduct,
  } = require("../models/product.model");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    
    getProductById: (req, res) => {
      const id = req.params.id;
      getProductById(id, (err, results) => {
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
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getProduct: (req, res) => {
      getProduct((err, results) => {
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
    updateProduct: (req, res) => {
        
      updateProduct(body, (err, results) => {
        if (err) {
          console.log(err);
          return false;
        } 
        if(!results){
            return res.json({ 
                success: 0,
                message:'failed to update Product'
            })
        }
        return res.json({
          success: 1,
          message: "Product updated successfully"
        });
      });
    },
    deleteProduct: (req, res) => {
      const data = req.body;
      deleteProduct(data, (err, results) => {
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
          message: "Product deleted successfully"
        });
      });
    }
  };
  