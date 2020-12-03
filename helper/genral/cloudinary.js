const multer = require('multer');
const path = require('path')
const fs = require('fs');
const upload = require('../genral/uploadImages');



var cloudinary = require('cloudinary').v2;
//put ur config
cloudinary.config({
    cloud_name: 'djvim89uw',
    api_key: '512955989234597',
    api_secret: 'vmr-YO5ApfWFcRAzYPbdOiALz2I'
});


const cloud = async (req, res, next) => {
    if(req.file===undefined){
        req.result=''
        return next();
    }
    console.debug("cloud run")
   cloudinary.uploader.upload(req.file.path,
        function (error, result) {
            console.debug("result",result)
            if (error) {
                console.debug(error)
            }

            fs.unlinkSync(req.file.path)
                ;
            req.result=result
            return next()


        }
    );




}
module.exports={cloud}