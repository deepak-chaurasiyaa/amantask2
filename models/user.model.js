const pool = require("../configuration/database");

module.exports = {
   
  create: (data, callBack) => {
      var flag = true;
    pool.query(
        `select * from user where email = ?`,
        [data.email],
        (error, results, fields) => {
          if (error) {
            flag = false
          }
          if(results.length > 0){
              return callBack(null,"User Already Exists. Please Use another Email.")
          }
          else{
            if(!(data.token)){
              data.token = "";
            }
            pool.query(
                `insert into user(firstName, lastName, gender, email, password, number,token) 
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
                    // console.log("pppppppppppp1",results)
                    callBack(error);
                  }
                  return callBack(null, { 
                    firstName:data.firstName,
                    lastName:data.lastName,
                    id:results.insertId
                  });
                }
              );
          }
        }
      );
    
  },

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from user where email = ?`,
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
      `select id,firstName,lastName,gender,email,number,token from user where id = ?`,
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
      `select id,firstName,lastName,gender,email,number,token from user`,
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
    if(!data.token){
      data.token ="xyz";
    }
    
    pool.query(
      `update user set firstName=?, lastName=?, gender=?, email=?, number=?, token=? where id = ?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.number,
        data.token,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  resetPassword: (data, callBack) => {
      data.token ="";
    pool.query(
      `update user set password=?, token=? where id = ?`,
      [
        data.password,
        data.token,
        data.id,
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
      `DELETE FROM user WHERE id=?`,
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
