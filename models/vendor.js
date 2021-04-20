const mongoose = require('mongoose');

const vendorSchma = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
       type:String,
       required:true
    },
    cPassword:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    contact:{
        type:Number
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        }
    ]
},{
    timestamps:true
})

const Vendor = mongoose.model('vendor',vendorSchma);

module.exports = Vendor;