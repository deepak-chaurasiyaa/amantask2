const pool = require("../configuration/database");

module.exports = {
   
  create: (data, callBack) => {
    // console.log(data,"line 6b");
        pool.query(
            `insert into product(productName, price, image, rating) 
                      values(?,?,?,?)`,
            [
              data.productName,
              data.price,
              data.image,
              data.rating,
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
        )
    
  },

  getProductById: (id, callBack) => {
    pool.query(
      `select id,productName,price,image,rating from product where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getProduct: callBack => {
    pool.query(
      `select * from product`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateProduct: (data, callBack) => {
      console.log(data.productName,data.price,data.image,data.rating,data.id,"a,b,c,d,e,f,g")
    pool.query(
      `update product set productName=?, price=?, image=?, rating=? where id = ?`,
      [
        data.productName,
        data.price,
        data.image,
        data.rating,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteProduct: (data, callBack) => {
    pool.query(
      `delete from product where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
