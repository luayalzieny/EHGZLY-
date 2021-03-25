const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt')
const validator = require('validator');
const { type } = require('os');
const categoriesSchema=new Schema({

        category:{type:String},
        meal:[{name:{type:String,},price:{type:Number},discreption:{type:String}}]

})


const restaurantSchema= new Schema({
    _id:{type:String},

        restaurantName: {type:String
            , required:[true,"Please enter your restuarant name"]},
        
        manger:{type:String},

        mangerPhone:{type:String,
            // required:[true,"Please enter your phone to contact with you"]
            },
        email:{type:String
            ,required:[true,"Please enter your email"],
            index: { unique: [true,"email already exists"]}
            ,validate:[validator.isEmail,"Please enter a valid email"]
        },
        restaurantPhone:{typr:String},
        username:{type:String,index: { unique: [true,"this username already exists"]}},
        password:{type:String,
            required:[true,"Please enter a password"],
            minlength:[3,"Minimum password length is 3 characters"]
        },
        location:[{phone:{type:String},
        Coordinates :{Latitude:{type:Number},Longitude:{type:Number}},
        area:{type:String}
        }],
        opentime:{open:{type:String},close:{type:String}},
         img:{type:String},
        categories:[categoriesSchema],
        orders:[{type:Object}]
        ,review:[{FirstName:{type:String},starValue:{type:Number},discreption:{type:String}}]

    })

    restaurantSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
        this.password=await bcrypt.hash(this.password,salt)
    next()
    })
    


const restaurant=mongoose.model("restaurant",restaurantSchema)
module.exports = restaurant;