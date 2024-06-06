const express = require('express'); // Express app
const router = express.Router();    // Router logic

// Import controllers
const tripsController = require('../controllers/trips');

// Get a list of all trips
router
    .route('/trips')
    .get(tripsController.tripsList); 

// Get a trip by code
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;