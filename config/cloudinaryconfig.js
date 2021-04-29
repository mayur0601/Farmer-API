// import { config, uploader } from 'cloudinary';

const config = require('cloudinary');
const uploader = require('cloudinary');



const cloudinaryConfig = (req, res, next) => {
    config({
    cloud_name: 'dz1gpy8y9',
    api_key: '627598281972929',
    api_secret: 'Vh-M4lLgFEzDLTU1CJKD10-131g',
    });
    next();
}

module.exports =  cloudinaryConfig;
module.exports =uploader;