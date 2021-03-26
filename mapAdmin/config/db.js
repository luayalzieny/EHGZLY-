const mongoose = require('mongoose');  // mongoose is used to make a connection to a DB

// mongoose returns a promise so we will use async await
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/restaurantLocation', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
