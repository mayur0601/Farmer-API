
const Farmer = require('../models/farmer');
const Product = require('../models/product');
const Order = require('../models/order');
const bcrypt=require('bcryptjs');
const path = require('path');
const cloudinary=require('../config/cloudinaryconfig');
const fs=require('fs');


module.exports.uploadImagetoCloudinary  =async (req,res) => {
	try{
  
		const result= await cloudinary.uploader.upload(req.file.path)
			res.json(result);
		}
		catch(err){
		   console.log(err)
		}
}


module.exports.createFarmer =async function(req,res){
	const {username,password:plainTextPassword,cpassword,email} = req.body;

    // validattion
            if (!username || typeof username !== 'string') {
        		return res.json({ status: 'error', error: 'Invalid username' })
        	}
        
        	if (!plainTextPassword || typeof plainTextPassword !== 'string' ) {
        		return res.json({ status: 'error', error: 'Invalid password' })
        	}
            if (!cpassword || typeof cpassword !== 'string') {
        		return res.json({ status: 'error', error: 'Invalid password' })
        	}
        
            if(plainTextPassword!==cpassword){
                return res.json({ status: 'error', error: ' password mismatch' })
            }
        
        	if (plainTextPassword.length < 5) {
        		return res.json({
        			status: 'error',
        			error: 'Password too small. Should be atleast 6 characters'
        		})
        	}
        
            // hashing the password
            const password = await bcrypt.hash(plainTextPassword,10);
	try {
		const response = await Farmer.create({
			username,
			password, 
			cPassword:cpassword,
			email
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json(200,
        { status: 'ok'})
}

module.exports.Farmerlogin = async (req, res) => {
    const { username, password } = req.body
	const user = await Farmer.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token_farmer = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET_Farmer
		)
        localStorage.setItem('token_farmer', token_farmer);

		return res.json({ status: 'ok', data: token_farmer })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })

   
}

module.exports.addProduct= async (req,res) =>{
    try{
		console.log("req of product",req.body);
		console.log("req file is",req.file);
		const result= await cloudinary.uploader.upload(req.file.path);
		
        const {description,title,qty,price,token_farmer,source} = req.body;

        const user = jwt.verify(token_farmer, JWT_SECRET_Farmer)

		console.log("farmer",user);
		console.log("farmer",result);

        if(user){

            // create Product
            const product = await Product.create({
                description,
                title,
                Qty:qty,
                price,
				productImage:result.url,
                farmer:user.id,
				source:source
            });

      

            await Farmer.findByIdAndUpdate(user.id,{
                $push: {myProducts :product }
            });

            return res.status(200).json({
                message: "ok",
                data: product
            })
        }
       
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
        
    }
   
}

module.exports.deleteProduct =async (req,res)=>{
	console.log("query is",req.query.id);

	let product =await Product.findById(req.query.id);

	let farmer = await Farmer.findById(product.farmer);
	
	 let myProductsFarmer = farmer.myProducts;

	 const index = myProductsFarmer.indexOf(req.query.id);
		if (index > -1) {
			myProductsFarmer.splice(index, 1);
		}

	await Product.findByIdAndDelete(req.query.id);

	farmer.save();

	return res.json({status:"deleted successfully"});

}

module.exports.farmerInfo = (req,res)=>{
    try{
       
        const token = localStorage.getItem('token_farmer'); // collecting token from local storage
		console.log("tokkeeen ",token);
    const farmer = jwt.verify(token, JWT_SECRET_Farmer); // find login vendor through given token

					  Farmer.findById(farmer.id)
						.populate('myProducts').populate({
							path:'orders',
							populate:{
								path:'product vendor'
								
							}
						})
						.exec(function (err, user) {
							if (err)  return console.log(err);
							res.json({ status:'ok',farmer:user});
						});

    }catch(err){
        return res.status(500).json({ status:err.message});
    }
}

module.exports.logoutFarmer = async (req,res)=>{
	localStorage.removeItem('token_farmer');
	return res.json({ status:'ok',message:'logout successfully'});
}