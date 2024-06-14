const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');



// GET: api/trips/:tripCode - return a single trip by trip-code
// Response including HTML status code and JSON message 
// must be returned to the requesting client
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
// Response including HTML status code and JSON message 
// must be returned to the requesting client
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

// POST: /trips - add a new trip
// Response including HTML status code and JSON message 
// must be returned to the requesting client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) {
        // Database returned no data
        return res
            .status(400)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(201)
            .json(q);
    }

};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    //console.log(req.params);
    //console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
    .exec();


    if (!q) { // Database returned no data
        return res
        .status(400)
        .json(err);
    } else { // Return resulting updated trip
        return res
        .status(201)
        .json(q);
    }
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
