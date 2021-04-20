const mongoose = require('mongoose');

const farmerSchma = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
       type:String,
       required:true
    },
    email:{
        type:String,
        unique:true
    },
    cPassword:{
        type:String,
        // required:true
    },
    address:{
        type:String
    },
   
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
    ],
   
    myProducts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    contact:{
        type:Number
    }

},{
    timestamps: true
})

const Farmer = mongoose.model('farmer',farmerSchma);

module.exports = Farmer;