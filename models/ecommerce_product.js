const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ProductSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    numReviews:{
        type:Number,
        required:true
    }
    }
    ,{
        timestamps:true
    })

const ECO_Product=mongoose.model("sellproduct",ProductSchema)

module.exports=ECO_Product;