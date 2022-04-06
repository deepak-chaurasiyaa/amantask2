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
            console.log("pppppppppppp",results)
            if(results.length > 0){
                // return callBack(null, results);
                pool.query(
                    `update cart set cart.status = 1 where UserId=?`,
                    [
                      id
                    ],
                    (error, results, fields) => {
                      if (error) {
                        callBack(error);
                      }
                      else{
                        return callBack(null, "Order placed Successfully!")
                      }
                    }
                )
            
            }
            else{
                return callBack(null,"No Item in your cart list, Continue shopping.")
            }
          }
        )
      }
}