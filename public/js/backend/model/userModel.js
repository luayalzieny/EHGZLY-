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
        max:[10,"First Name Should Be Less Than 10 Characters"]
    },

    Lname:{
        type:String,
        required:[true,"Please Enter Your Last Name"],
        max:[10,"Last Name Should Be Less Than 10 Characters"]
        
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
        maxlength:[11,"Length of numbers is 11"]
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
    }]

})


userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

userSchema.plugin(autoIncrement.plugin,'userModel');
const userModel=mongoose.model("userModel",userSchema)
module.exports=userModel