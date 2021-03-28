const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

// mapquest converts any data address into geojson

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, 'Please add a store ID'],
    unique: true,
    trim: true,
    maxlength: [20, 'Store ID must be less than 10 chars']
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
  phone:{
    type: String,
    required:[true,'please enter your phone number']
  },
  kitchen:{
    type: String,
    required:[true,'please enter your phone number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
/*pre() we want this function to run before we save our
 location in the database so instead of store an address we will geocode */
StoreSchema.pre('save', async function(next) {

/* .geocode(); will return us an array of object include in it the long,lat,country,etc 
  by just typing the address in a string format like 10th of ramadan so it convert the string into geocode*/
  const loc = await geocoder.geocode(this.address); 

  // we will format our location field into a point
  this.location = {
    // type , coordinates , formattedAddress are objects in the location modle so we will set them values 
    // and remember we set all of that before we save our data
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address field in the database, we want to save the location
  this.address = undefined;
  next(); 
});

module.exports = mongoose.model('Store', StoreSchema);
