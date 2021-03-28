const Store = require('../models/Store');
const helper = require('../public/js/helper');

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = async (req, res, next) => {
  try {
    // get stores from the database, in case no data it will return empty array
    const stores = await Store.find();

    return res.status(200).json(
    helper.toGeojson(stores)
    );
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Create a store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body); // create method returns a promise so we use await
    
    if(req.body.address === ' '){
      return "put a location";
    }
    return res.status(201).json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This store already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
