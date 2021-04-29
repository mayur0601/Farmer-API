const mongoose = require('mongoose');

const orderSchma = new mongoose.Schema({
   
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required:true
    },
    farmer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farmer',
        required:true
    },
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
        required:true
    },
    deliver:{
        type:Boolean,
        required:true
    },
    address:{
        type:String
    }
   
},
    {
        timestamps: true
    }
);

const Order = mongoose.model('order',orderSchma);

module.exports = Order;