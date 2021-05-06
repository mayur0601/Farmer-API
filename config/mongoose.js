const mongoose = require('mongoose');

// const connection_url = 'mongodb+srv://admin:Mayur@12345@cluster0.m0cpw.mongodb.net/farmerdb?retryWrites=true&w=majority'
const connection_url ='mongodb+srv://aniket:12345@cluster0.pbjiy.mongodb.net/farmerdb?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/farmdb'
mongoose.connect(connection_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});



const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;