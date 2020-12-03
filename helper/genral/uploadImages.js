const multer = require('multer');
const path =require('path')
const fs=require('fs');


var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    
    
    
    }
    
    
    
    })   
    
    
    var checkImage=function(file,cb){


        var ext=path.extname(file.originalname);
        ext=ext.toLowerCase();
        if(ext==='.png'||ext==='.jpg'||ext==='.jpeg'||ext==='.JPG'){
            cb(null,true)
        }else{
            cb('not an image',false)
        }
        
        
        }

        const upload=multer({
            storage:storage,
            fileFilter:function(req,file,cb){
                checkImage(file,cb)
            }
        })
        

module.exports={ upload
}


