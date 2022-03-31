const pool = require("../configuration/database");

module.exports = {
   
  create: (data, callBack) => {
    // console.log(data,"line 6b");
        data.status = 0;
        data.date = Date();
        pool.query(
            `select price from product where id = ?`,
            [data.productId],
            (err,result)=>{
                console.log(result[0])
                console.log(result[0].price,"line133")
                
                    data.price = result[0].price;
                    data.totalPrice = data.quantity * result[0].price;
                    data.txnId = Math.random()*1000
                console.log(data.price,data.totalPrice,data.txnId)
                console.log(data)
            }
        )
        pool.query(
            `insert into cart(userId, productId, status, date, quantity, price,totalPrice,txnId) 
                      values(?,?,?,?,?,?,?,?)`,
            [
              data.userId,
              data.productId,
              data.status,
              data.date,
              data.quantity,
              data.price,
              data.totalPrice,
              data.txnId
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        )
    
  },
  getCartItemByUserId:(usrId,callBack) =>{
    pool.query(
        `select * from cart
        left join product
        ON product.id = cart.productId where cart.userId=?`,
        [usrId],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
    )
  }
}