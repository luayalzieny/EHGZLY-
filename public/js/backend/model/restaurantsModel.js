const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt')
const validator = require('validator');
const { type } = require('os');
const autoIncrement = require('mongoose-auto-increment');
const categoriesSchema=new Schema({

        category:{type:String},
        meal:[{name:{type:String,},price:{type:Number},discreption:{type:String}}],
        descreption:{type:String}

})
autoIncrement.initialize(mongoose.connection)

const restaurantSchema= new Schema({
    

        restaurantName: {type:String
            , required:[true,"Please enter your restuarant name"],
            max:[30,"Restuarant name should be less than 30 characters"]},
        
        manger:{type:String,required:[true,"Please enter your manger name"]},

        mangerPhone:{type:String,
             required:[true,"Please enter manger phone"],
             index: { unique: [true,"this phone already exists"]},
             minlength:[11,"Length of numbers is 11 "], 
             maxlength:[11,"Length of numbers is 11 "]
            },
        email:{type:String
            ,required:[true,"Please enter your email"],
            index: { unique: [true,"email already exists"]}
            ,validate:[validator.isEmail,"Please enter a valid email"]
        },
        
        restaurantPhone:{type:String,
            index: { unique: [true,"this phone already exists"]},
             minlength:[11,"Length of numbers is 11 "], 
             maxlength:[11,"Length of numbers is 11 "],
            required:[true,"Please enter rest phone"]
           },
        

        username:{type:String,index: { unique: [true,"this phone already exists"]},
        required:[true,"Please enter username"]},

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
         coverimg:{type:String},
        categories:[categoriesSchema],
        orders:[{type:Object}]

    })

    restaurantSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
        this.password=await bcrypt.hash(this.password,salt)
    next()
    })
    
    
   restaurantSchema.plugin(autoIncrement.plugin,'restaurant');
const restaurant=mongoose.model("restaurant",restaurantSchema)
module.exports = restaurant;