const mongoose = require('mongoose');
const geocoder = require('../../utils/geocoder');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt')
const validator = require('validator');
const { type } = require('os');
const autoIncrement = require('mongoose-auto-increment');

// categories schema
const categoriesSchema=new Schema({

        category:{type:String},
        meal:[{name:{type:String,},price:{type:Number},description:{type:String}}],
       
    })
autoIncrement.initialize(mongoose.connection)



  

// restaurant schema
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


           address: {
                type: String,  // what we enter in the form in the front end in the address will pretane to this address filed
                required: [true, 'Please add an address']  // but we will create a peice of middleware that will convert that address into the location filed with its coordinates
                // that way we dont have to enter the long,lat coordinates into the api we just add the address and the geocoder turn it into the location
            },

          location: {
                type: {
                    type: String,    // mongoose geojson
                    enum: ['Point']
                },
                coordinates: {
                    type: [Number],
                    index: '2dsphere' // support query that calculate geometry on earth like sphere
                },
                formattedAddress: String // the address that we send to the api we can get back the detaild location like state and territori
          },
        

        username:{type:String,index: { unique: [true,"this phone already exists"]},
        required:[true,"Please enter username"]},

        password:{type:String,
            required:[true,"Please enter a password"],
            minlength:[3,"Minimum password length is 3 characters"]
        },
        

        opentime:{open:{type:String},close:{type:String}},
         img:{type:String},
         coverimg:{type:String},
        categories:[categoriesSchema],
        orders:[{type:Object}],
        pickupfee:{type:Number},
        pickuptime:{type:String},
        info:{type:String},

        
        kitchen:{
            type: String,
            required:[true,'please enter your phone number']
            },
        
        // createdAt: {
        //     type: Date,
        //     default: Date.now
        //     }

    },{timestamps:true})


  
  
 
  
// pre save the restaurant schema
    restaurantSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
        this.password=await bcrypt.hash(this.password,salt);

    //.geocode(); will return array of object include in it the long,lat,country,etc 
    const loc = await geocoder.geocode(this.address); 
    
    // we will format our location field into a point
    this.location = {
      // type , coordinates , formattedAddress are the objects in the location field
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address field in the database, we want to save the location
    this.address = undefined;

    next()
    })

    //this function will add a virtual parameter that wont be added to the database but will be used to save the 
    //image and its path and convert it to base64 file
restaurantSchema.virtual('image_path').get(function(){
        if(this.image!=null && this.imageType!=null){
            return `data:${this.imageType};charset=utf-8;base64,
            ${this.image.toString('base64')}`
        }
    })


    restaurantSchema.plugin(autoIncrement.plugin,'restaurant');
const restaurant=mongoose.model("restaurant",restaurantSchema) // restaurant model
module.exports = restaurant ;