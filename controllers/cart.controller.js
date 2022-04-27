const {
  create,
  getCartItemByUserId,
  getCartItemByUserIdProduct,
  updateCart,
  dedeleteCartColumn,
} = require("../models/cart.model");
const jwt = require("jsonwebtoken");
const config = process.env;
var getIdByToken = (req) => {
  let getToken = (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  };
  let headerToken = getToken(req);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    headerToken;
  const decoded = jwt.verify(token, config.secret_key);
  req.user = decoded;
  let id = decoded.id;
  let isUser = decoded.isUser;
  console.log("++++++",isUser);
  return { id, isUser };
};

module.exports = {
  addToCart: (req, res) => {
    const body = req.body;
    const { id, isUser } = getIdByToken(req);
    if (!isUser) {
      return res.status(400).json({
        success: 0,
        message: "First Login as an User",
      });
    } else {
      body.userId = id;
      const productId = body.productId;
      // console.log(body.userId,"line26")
      getCartItemByUserIdProduct(
        { id: id, productId: productId },
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              success: 0,
              message: err,
            });
          }
          else if (results.length > 0) {
            // let id = results[0].id;
          
            let quantity = Number(results[0].quantity) + Number(req.body.quantity);
            let totalPrice = quantity * results[0].price;
            
            let xyz = {
              id,
              quantity,
              totalPrice,
              productId,
            };
            // console.log("xyz", xyz);
            if (quantity <= 0) {
              dedeleteCartColumn(xyz, (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    success: 0,
                    message: err,
                  });
                } else {
                  return res.status(200).json({
                    success: 1,
                    message: "Item removed successfully!",
                  });
                }
              });
            } else {
              // console.log(results[0]);
              updateCart(xyz, (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    success: 0,
                    message: err,
                  });
                }
                res.status(200).send(results);
              });
            }
          } else if (results.length <= 0) {
            create(body, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  success: 0,
                  message: err,
                });
              } else {
                return res.status(200).json({
                  success: 1,
                  data: results,
                });
              }
            });
          }
        }
      );
    }
  },
  deleteCartItem: (req, res) => {
    const productId = (req.params.id)
    const {id,isUser} = getIdByToken(req);
    const xyz = {
      id,
      productId,
    };
    console.log("xyz",xyz)
    dedeleteCartColumn(xyz, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: 0,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "Item removed successfully!",
        });
      }
    });
  },
  getCartItemByUserId: (req, res) => {
    const id = getIdByToken(req);
    // const id = req.params.id;
    getCartItemByUserId(id, (err, results) => {
      if(typeof results === "string"){
        return res.status(200).json({
          success: 1,
          data: 0,
        });
      }
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: 0,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: 1,
          data: results,
        });
      }
    });
  },
};
