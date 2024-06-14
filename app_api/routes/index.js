const express = require('express'); // Express app
const router = express.Router();    // Router logic

// Import controllers
const tripsController = require('../controllers/trips');

// Get a list of all trips
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip); 

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;