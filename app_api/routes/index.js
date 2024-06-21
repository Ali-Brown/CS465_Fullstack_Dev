const express = require('express'); // Express app
const router = express.Router();    // Router logic
const {expressjwt: jwt} = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    useProperty: 'payload',
    algorithms: ["HS256"]
});

// Import controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip); 

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);    

module.exports = router;