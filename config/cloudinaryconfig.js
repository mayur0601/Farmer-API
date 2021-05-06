
const cloudinary=require('cloudinary').v2
const dotenv=require('dotenv')
dotenv.config()

cloudinary.config({
  cloud_name:'beprojects',
  api_key:'232619468553276',
    api_secret: 'IBFf-kpLxZIVKtlznGK6tHSgvLo',
})



module.exports=cloudinary