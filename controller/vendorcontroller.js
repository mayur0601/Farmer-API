const Vendor = require('../models/vendor');
const Order = require('../models/order');
const Farmer = require('../models/farmer');
const Product = require('../models/product');
const bcrypt=require('bcryptjs')
module.exports.vendorSignup = async (req,res)=>{
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

            try{

            // create vendor
                let vendor = await Vendor.create({
                    username, password,cPassword:cpassword,email
                });

                return res.status(200).json({ status: 'ok'});
                
            }catch(err){
                return res.status(500).json({message:err.message});
            }
}

module.exports.vendorLogin = async (req,res)=>{
    const { username, password } = req.body; 

	const user = await Vendor.findOne({ username }).lean() // check usename

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' }) 
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token_vendor = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET_Vendor
		)
        localStorage.setItem('token_vendor', token_vendor);
		return res.json({ status: 'ok', data: token_vendor })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })

}
// 606d53048126d0ab041f41c9
module.exports.orderProduct = async (req,res)=>{
    const token = localStorage.getItem('token_vendor'); // collecting token from local storage
    console.log("token is",token);
    const vendor = jwt.verify(token, JWT_SECRET_Vendor); // find login vendor through given token
    console.log("vendor is",vendor);
    /*console.log(req.query);*/ // query getting from url (query is product id)
    try{
        let product = await Product.findById(req.params.id).lean(); // find product using the query
        console.log("product is",product);

        if(vendor){  // validation (check vendor login or not)

            // create order
            let order = await Order.create({
                product:product._id,
                farmer:product.farmer,
                vendor:vendor.id,
                deliver:false
            });
            
            
           
       
                    // ORDER PUSH INTO THE FARMER
            await Farmer.findByIdAndUpdate(
                    product.farmer ,
                {
                    $push: { orders:order }
                }
            )
            
            // ORDER PUSH INTO THE VENDOR
            await Vendor.findByIdAndUpdate(
                vendor.id ,
              {
                $push: { orders:order }
              }
            )

           
    
           

// 
            return res.status(200).json({
                status:'ok',
                data:order
            });
        }
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

}

module.exports.getAllProduct = async (req,res)=>{
    try{
        let product = await Product.find({}).sort('-createdAt'); // collect all the product and sort by createdAt
        console.log("prooooooo",product);
        return res.status(200).json({ status:'ok',allProducts:product}); // sending product through JSON

    }catch(err){
        res.status(500).json({status:err.message});
    }
}

module.exports.vendorInfo = async (req,res) =>{
    try{
       
        const token = localStorage.getItem('token_vendor'); // collecting token from local storage
    const vendor = jwt.verify(token, JWT_SECRET_Vendor); // find login vendor through given token
    
        Vendor.findById(vendor.id)
        .populate({
            path:'orders',
            populate:{
                path:'product farmer'
            }
        })
        .exec(function (err, user) {
            if (err)  return console.log(err);
            res.json({ status:'ok',vendor:user});
        });

    }catch(err){
        return res.status(500).json({ status:err.message});
    }
}


module.exports.logoutVendor = async (req,res)=>{
	localStorage.removeItem('token_vendor');
	return res.json({ status:'ok',message:'logout successfully'});
}