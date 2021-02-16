const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator = require('validator');

//connection prop up
mongoose.connect("mongodb+srv://ML:manga@cluster0.9qcx5.mongodb.net/ML?retryWrites=true&w=majority",{
    useNewUrlParser:true ,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
})
//end of connection prop up

//user schema
const userSchema=new mongoose.Schema({
    _Id:{type:String
        ,maxlength:[10]
        ,index:{unique:[true]}
        // مش في دماغي حاجه تتضاف لده
    },
    Fname:{type:String,
        index: { unique: [true,"Username already exists"]},
        required:[true,"Please enter first name"],
        max:[10,"First name should be less than 10 characters"]
    },

    Lname:{type:String,
            index: { unique: [true,"Name already exists"]},
            required:[true,"Please enter your last name"],
            max:[10,"Username should be less than 10 characters"]
        },
        
    email:{type:String,
        index: { unique: [true,"Email already exists"]},
        required:[true,"Email required"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    
    number:{type:String,
        required:[true,"Please enter your number"],
        index: { unique: true},
        minlength:[11,"Length of numbers is 11 "], 
        maxlength:[11,"Length of numbers is 11 "]
    
    },
    password:{type:String,
        required:[true,"Please enter a password"],
        minlength:[3,"Minimum password length is 3 characters"]
    } ,
    
    history:[{
        order:{type:String},
        content:{type:String }
    }]
})




userSchema.pre('save',async function(next){
const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
next()
})

//end of user schema

const userModel=mongoose.model("userModel",userSchema)
module.exports=userModel