const pool = require("../configuration/database");

module.exports = {
  create: (data, callBack) => {
    data.status = 0;
    data.date = Date();
    pool.query(
      `select price from product where id = ?`,
      [data.productId],
      (err, result) => {
        if (err) {
        } else {
          data.price = result[0].price;
          data.totalPrice = data.quantity * result[0].price;
          data.txnId = Math.random() * 1000;
          pool.query(
            `insert into cart(userId, productId, status, date, quantity, price, txnId, totalPrice) 
                            values(?,?,?,?,?,?,?,?)`,
            [
              data.userId,
              data.productId,
              data.status,
              data.date,
              data.quantity,
              data.price,
              data.txnId,
              data.totalPrice,
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
        }
      }
    );
  },
  getCartItemByUserId: ({id:usrId}, callBack) => {
    console.log(usrId,"usrId");
    pool.query(
      `select * from cart
        left join product
        ON product.id = cart.productId where cart.userId=? and cart.status = 0`,
      [usrId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          if (results.length > 0) {
            return callBack(null, results);
          } else {
            return callBack(
              null,
              "No Item Found in Your cart List, Continue Shopping!"
            );
          }
        }
      }
    );
  },

  getCartItemByUserIdProduct: ({ id, productId }, callBack) => {
    pool.query(
      `select * from cart
        left join product
        ON product.id = cart.productId where cart.userId=? and cart.productId=?`,
      [id, productId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateCart: ({ id, quantity, totalPrice, productId }, callBack) => {
    pool.query(
      `update cart set quantity=?, totalPrice=? where userId = ? and productId=?`,
      [quantity, totalPrice, id, productId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  dedeleteCartColumn: ({ id, productId }, callBack) => {
    pool.query(
      `delete from cart where UserId=? and productId=?`,
      [id, productId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
