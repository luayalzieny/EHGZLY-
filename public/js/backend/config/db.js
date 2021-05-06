const mongoose = require("mongoose");

let _dbURL = "mongodb+srv://ML:manga@cluster0.9qcx5.mongodb.net/ML?retryWrites=true&w=majority"


let _dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(_dbURL,_dbOptions)
