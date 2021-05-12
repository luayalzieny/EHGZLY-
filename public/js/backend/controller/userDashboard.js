const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const User=require('../model/userModel')
const controller=require('../controller/userController')
const mimeType=['image/jpeg','image/png','images/gif']

// end of modules used

app.use(express.urlencoded({limit: '50mb', extended: true }))
app.use(express.json())

//basic functions
//image upload function
function saveCover(img,imgEncoded){
    if(imgEncoded==null)return

    const cover=JSON.parse(imgEncoded)
    if(cover !=null && mimeType.includes(cover.type)){
        img.image.imageBuffer=new Buffer.from(cover.data,'base64')
        img.image.imageType=cover.type
    }
}
//route functions

exports.get_dashboard=(req,res)=>{
    
  res.render('User_Dashboard',{user:req.user,err:"",err_password:""})
}

exports.post_update_dashboard=(req,res)=>{
    const errors={email:"",number:""};
    const image=JSON.parse(req.body.uploadImage)
    let imagebuffer= new Buffer.from(image.data,'base64')
    let imagetype=image.type

    User.updateOne({_id:req.user._id},{
        Fname: req.body.Fname || req.user.Fname ,
        
        Lname:req.body.Lname||req.user.Lname,
        
        email:req.body.email||req.user.email,
        
        number:req.body.number||req.user.number,
        
        image:{
            imageBuffer:imagebuffer||req.user.image.imageBuffer,
            imageType:imagetype||req.user.image.imageType
        }
},function(err){
        if(err)
        {console.log(err);
            
            if(err.code===11000 && Object.entries(err.keyValue)[0][0]=="email" ){
                errors.email=Object.entries(err.keyValue)[0][0]+" already exists"
              }
              
              if(err.code===11000 && Object.entries(err.keyValue)[0][0]=="number"){
              errors.number=Object.entries(err.keyValue)[0][0]+" already exists"
            }
                   res.render('User_Dashboard',{user:req.user,err:errors,err_password:""})
        }else{
            res.redirect('User_Dashboard')
        }

    }) 

    

 
}

exports.post_change_Password_dashboard=(req,res)=>{

    bcrypt.compare(req.body.password,req.user.password,  function(err,result){
        if(result){
            const salt=10
            
            bcrypt.genSalt(salt, function(err, salt) {
            
                bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
            
                    // Store hash in your password DB.
                   // console.log(hash)
                    User.updateOne({_id:req.user._id},{
                        password:hash
                    },function(err){
                        if(err)
                            {
                            console.log(err); 
                        
                            }else{
                                res.redirect('User_Dashboard')
                            }
                        })
                if(err){
                    console.log(err)
                }
                
                });
            if(err){
                console.log(err)
                }

            });
            
        }else{
        return res.render("User_Dashboard",{user:req.user,
            err_password:"Wrong Password Entered"
    })
        
          }
    })
}


exports.post_delete_dashboard=(req,res)=>{
    User.deleteOne({_id:req.user._id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
}

