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

//category schema

const categorySchema=new mongoose.Schema({
    _Id:{type:String
        // مش في دماغي حاجه تتضاف لده
    },
    category:{
        type:String,
        required:[true,"Please enter the category of your dishes"]
    },

    dishes:[{
        _id:{
            type:String
            // مش في دماغي حاجه تتضاف لده
        
        },
        name:{
            type:String,
            required:[true,"Please enter the name of your dishes"]
        },
        price:{
            required:[true,"Please enter the price of your dishes"]
        },
        content:{
            type:String,
            required:[true,"Please enter the content of your dishes"]
        }
    }]
})

//end of category schema

//rest schema
const restSchema=new mongoose.Schema({
    _Id:{type:String
        // مش في دماغي حاجه تتضاف لده
    },
    Name:{type:String,
        index: { unique: [true,"Restuarant already exists"]},
        required:[true,"Please enter your restuarant name"],
        max:[30,"Restuarant name should be less than 30 characters"]
    },
        
    email:{type:String,
        index: { unique: [true,"Email already exists"]},
        required:[true,"Email required"],
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    
    password:{type:String,
        required:[true,"Please enter a password"],
        minlength:[3,"Minimum password length is 3 characters"]
    } ,
    
    locations:[{
        coordinates:{type:String,
            required:[true,"Please enter your branch's coordinates"]
        },
        phone_numb:{type:String,
            required:[true,"Please enter your branch's number"],
            index: { unique: true},
            minlength:[11,"Length of numbers is 11 "], 
            maxlength:[11,"Length of numbers is 11 "]
        }
        }
        ],
    
    category:categorySchema,

    openTime:{
    type:String,
    required:[true,"Please enter your branch's opening and closing times"]
    },
    
    img:{
        required:[true,"Please enter your restaurant's image"] //reminder to fill up
    }
})




restSchema.pre('save',async function(next){
const salt=bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
next()
})

//end of user schema

const restModel=mongoose.model("restModel",userSchema)
module.exports=restModel