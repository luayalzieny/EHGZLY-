const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator = require('validator');
const autoIncrement = require('mongoose-auto-increment');

//connection prop up
mongoose.connect("mongodb+srv://ML:manga@cluster0.9qcx5.mongodb.net/ML?retryWrites=true&w=majority",{
    useNewUrlParser:true ,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})

autoIncrement.initialize(mongoose.connection)
//end of connection prop up

//user schema
const userSchema=new mongoose.Schema({
    Fname:{type:String,
        required:[true,"Please Enter Your First Name"],
        maxlength:[10,"First Name Should Be Less Than 10 Characters"],
        minlength:[3,"First Name Should Be Atleast 3 Characters"]
    },

    Lname:{
        type:String,
        required:[true,"Please Enter Your Last Name"],
        maxlength:[10,"Last Name Should Be Less Than 10 Characters"],
        minlength:[3,"Last Name Should Be Atleast 3 Characters"]
       
        
    },

    email:{
        type:String,
        index: { unique: [true,"Email already exists"]},
        required:[true,"Email required"],
        validate:[validator.isEmail,"Please enter a valid email"]
    
    },

    number:{
        type:String,
        required:[true,"Please enter your number"],
        index:{unique:true},
        minlength:[11,"Length of numbers is 11"],
        maxlength:[11,"Length of numbers is 11"],
        validate:[validator.isNumeric,"Please Enter A Valid Number"]
    },

    password:{
        type:String,
        required:[true,'Please Enter Your Password'],
        minlength:[3,"Minimum Password Length Is 3 Characters"]
    },

    history:[{
        index:{unique:false},
        order:{type:String},
        content:{type:String}
    }],
    image:{
        type: Buffer, 
         },
         imageType:{
             type:String
         }

},{timestamps:true})


userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

//this function will add a virtual parameter that wont be added to the database but will be used to save the 
    //image and its path and convert it to base64 file
userSchema.virtual('image_path').get(function(){
        if(this.image!=null && this.imageType!=null){
            return `data:${this.imageType};charset=utf-8;base64,
            ${this.image.toString('base64')}`
        }
    })


userSchema.plugin(autoIncrement.plugin,'userModel');
const userModel=mongoose.model("userModel",userSchema)
module.exports=userModel