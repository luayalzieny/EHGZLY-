const express = require('express');
const { getStores, addStore } = require('../controllers/stores');

// the folder routes is going to store all of our different routes.
// we will put all our routes directly related to our app

const router = express.Router();

router
  .route('/')
  .get(getStores)
  .post(addStore);

module.exports = router;
