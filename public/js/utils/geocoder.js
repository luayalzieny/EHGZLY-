const NodeGeocoder = require('node-geocoder');
 
// in this file we will set the process to converts any enterd adderss into ( geojson object )
//we are using mapquest that converts any enterd adderss into geojson that mapbox can understand

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY, // provider key
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder; // we export it to use in mongoose middleware (store schema)
