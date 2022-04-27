const pool = require("../configuration/database");

module.exports = {
   
  create: (data, callBack) => {
    if(! data.token){
      data.token = ""
    }
      pool.query(
        `insert into admin(firstName, lastName, gender, email, password, number,token) 
                  values(?,?,?,?,?,?,?)`,
        [
          data.firstName,
          data.lastName,
          data.gender,
          data.email,
          data.password,
          data.number,
          data.token
        ],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
  }, 

  getUserByUserEmail: (email, callBack) => {
    // console.log("xcxc")
    pool.query(
      `select * from admin where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // console.log(results,"results");
        return callBack(null, results);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from admin where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select id,firstName,lastName,gender,email,number from admin`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update admin set firstName=?, lastName=?, gender=?, email=?,number=? where id = ?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.number,
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
  deleteUser: (data, callBack) => {
    console.log(data)
    pool.query(
      `DELETE FROM admin WHERE id=?`,
      [data],
      (error, results, fields) => {
        if (error) {
          console.log(("errr"),error);
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
