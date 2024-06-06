const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// Get: trips - lists all the trips
// Response including HTML status code and JSON message 
// must be returned to the requesting client

// GET: api/trips/:tripCode - return a single trip by trip-code
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // Return single recod
        .exec();

    // show query result on the console
    //console.log(q);

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET: api/trips - return list of all trips
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, returns all records
        .exec();

    // show query result on the console
    //console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
