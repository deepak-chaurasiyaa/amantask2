const pool = require("../configuration/database");
module.exports = {
    
    placeOrder:(id,callBack)=>{
        pool.query(
          `select * from cart where UserId=?`,
          [
            id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            if(results.length > 0){
              const purchased_date = new Date();
                // return callBack(null, results);
                pool.query(
                  `update cart set cart.status = 1, cart.purchased_date='${purchased_date}' where UserId=? and cart.status=0`,
                  [id],
                  (error, results, fields) => {
                    if (error) {
                      callBack(error);
                    } else {
                      return callBack(null, "Order placed Successfully!");
                    }
                  }
                );
            
            }
            else{
                return callBack(null,"No Item in your cart list, Continue shopping.")
            }
          }
        )
      }
}