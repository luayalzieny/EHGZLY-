const mongoose=require('mongoose');
const validator = require('validator');

//connection prop up
mongoose.connect("mongodb+srv://ML:manga@cluster0.9qcx5.mongodb.net/ML?retryWrites=true&w=majority",{
    useNewUrlParser:true ,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
})
//end of connection prop up

//cart schema
const cartSchema= mongoose.Schema({
    _id:{
        type:String,
        required:[true],
        maxlength:[10]
    },
    order_number:{
        type:String,
        required:[true],
        maxlength:[10]
    },
    customer_id:{type:String,
        required:[true],
        maxlength:[10]
    },

    restaurant_name:{
        type:String,
        _id:false,
                    },
    restaurant_ID:{
        type:String
    }
                    ,
    dishes:[{_id:false,
        meal:{type:String},
        
    }],
    notes:{
        type:String
    },

    finishing_time:{
        type:String
    },
    
    total_price:{
        type:Number
    }
}

)
//end of cart schema 

module.exports=new mongoose.model("cart",cartSchema)