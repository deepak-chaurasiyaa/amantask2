const pool = require('../configuration/database')
module.exports = {
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from superadmin where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    ); 
  },
  create: (data, callBack) => {
    console.log(data.email)
    var flag = true;
  pool.query(
      `select * from superadmin where email = ?`,
      [data.email],
      (error, results, fields) => {
        if (error) {
          flag = false
        }
        console.log(results)
        if(results.length>1){
            return callBack(null,{ message:{data:"User Already Exists. Please Use another Email.",err:true}})
        }
        else{
          if(!data.token){
            data.token = "";
          }
          pool.query(
              `insert into superadmin(firstName, lastName, gender, email, password, number,token) 
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
        }
      }
    );
  
},

}