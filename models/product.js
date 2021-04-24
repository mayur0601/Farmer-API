const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const productSchma = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
       type:String,
       required:true
    },
    Qty:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farmer',
        required:true
    },
    source:{
        type:String,
       required:true
    },
    productImage: {
        
        type: String
},
   

},{
    timestamps: true
})



const Product = mongoose.model('product',productSchma);

module.exports = Product;