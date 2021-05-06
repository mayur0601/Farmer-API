const data=require('../data.js')
const Product1=require('../models/ecommerce_product')
const express=require('express')

const productRouter=express.Router()

productRouter.get('/insert',async(req,res)=>{
    const insertedProducts=await Product1.insertMany(data.products)
    res.send({insertedProducts})
})

productRouter.get('/',async(req,res)=>{
    const products=await Product1.find()
    res.send(products)
})

productRouter.get('/:id',async(req,res)=>{
    const id=req.params.id
    const product=await Product1.findById({_id:id})
    if(product){
        res.send(product)
    }
    else{
        res.send('product not found')
    }
})


module.exports=productRouter;