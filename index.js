const express = require('express');
const port = 8000;
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
module.exports = bcrypt = require('bcryptjs');
module.exports = jwt = require('jsonwebtoken');
const {LocalStorage} = require("node-localstorage");
module.exports = localStorage = new LocalStorage('./scratch'); 
module.exports = JWT_SECRET_Farmer = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
module.exports = JWT_SECRET_Vendor = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@$$^&*@$^&bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const db = require('./config/mongoose');
const cors = require('cors');
const cloudinary=require('./cloudinary')

const multer = require('multer');



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });


  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  








app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))

app.use('/uploads',express.static(__dirname +'/uploads'));


app.use('/',express.static(path.join(__dirname, 'views')))


app.use(bodyParser.json());

app.use('/',require('./routes/'));

app.use('/api/products',require('./controller/productRouter'))

app.post('/images',upload.single('files'),async(req,res)=>{
    try{
		
		const result= await cloudinary.uploader.upload(req.file.path)
        res.json(result)  

       
    }
    catch(err){
       console.log(err)
    }
})


app.listen(port,()=>{
    console.log('server up at',port);
})














