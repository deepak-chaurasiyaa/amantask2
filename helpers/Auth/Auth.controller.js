const jwt = require("jsonwebtoken");

const {getUserByUserId} = require("../../models/admin.model")
const config = process.env;

var getToken = (req) =>{
  if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } 
  return null;
}

let admAuth = (req, res, next) => {
 
  let headerToken = getToken(req)
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;

if (!token) {

  return res.status(403).send("A token is required for authentication"); 
}
  try {

    const decoded = jwt.verify(token, config.secret_key);
    req.user = decoded;
    let id = decoded.id
    if(decoded.isAdmin){
        return next();
    }
    else{
        return res.status(403).send("You are not allowed to perform this action.")
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

}

let superAdmAuth = (req, res, next) => {
 
  let headerToken = getToken(req)
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;

if (!token) {

  return res.status(403).send("A token is required for authentication");
}
try {
  const decoded = jwt.verify(token, config.secret_key);
  req.user = decoded;
  let id = decoded.id
  if(decoded.isSuperAdmin){
    return next();
  }
  else{
    return res.status(403).send("You are not allowed to perform this action.")
  }
} catch (err) {
  return res.status(401).send("Invalid Token");
}

}



let admOrSuperAdmAuth = (req, res, next) => {
 
  let headerToken = getToken(req)
const token =
  req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;

if (!token) {

  return res.status(403).send("A token is required for authentication");
}
try {

  const decoded = jwt.verify(token, config.secret_key);
  req.user = decoded;
  let id = decoded.id
  if(decoded.isAdmin || decoded.isSuperAdmin){
      return next();
  }
  else{
      return res.status(403).send("You are not allowed to perform this action.")
  }
} catch (err) {
  return res.status(401).send("Invalid Token");
}

}

let userAuth = (req, res, next) => {
 
  let headerToken = getToken(req)
const token =
  req.body.token || req.query.token || req.headers["x-access-token"] || headerToken;

if (!token) {

  return res.status(403).send("A token is required for authentication");
}
try {

  const decoded = jwt.verify(token, config.secret_key);
  req.user = decoded;
  let id = decoded.id
  if(decoded.isUser){
      return next();
  }
  else{
      return res.status(403).send("You are not allowed to perform this action.")
  }
} catch (err) {
  return res.status(401).send("Invalid Token");
}

}

module.exports = {
  admAuth,
  admOrSuperAdmAuth,
  superAdmAuth,
  userAuth,
};
