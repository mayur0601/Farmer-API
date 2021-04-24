const express = require('express');
const port = process.env.PORT ||  8000;
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




app.use(cors({
    origin:['http://localhost:3000','http://localhost:3001'],
    credentials:true,
    // redirected: true
}))
// mongoose.connect('mongodb://localhost:27017/farmdb', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true
// });
app.use('/uploads',express.static(__dirname +'/uploads'));


app.use('/',express.static(path.join(__dirname, 'views')))


app.use(bodyParser.json());

app.use('/',require('./routes/'));


app.listen(port,()=>{
    console.log('server up at',port);
})














