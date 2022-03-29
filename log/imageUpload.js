const multer=require('multer')
const path=require('path')
const fs = require("fs")
const imageStorage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,"../public/image"))
    }, 
      filename: (req, file, cb) => {
        cb(null, (file.originalname))
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png||jpg||pdf||txt)$/)) { 
         console.log("imageStorage");
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})

module.exports = imageUpload