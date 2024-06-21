const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const TripModel = mongoose.model('trips');
const User = require('../models/user'); // Register model
const UserModel = mongoose.model('users');



// GET: api/trips/:tripCode - return a single trip by trip-code
// Response including HTML status code and JSON message 
// must be returned to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await TripModel
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
    const q = await TripModel
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
    getUser(req, res, (req, res) => {
        TripModel
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            })
            .then((trip) => {
                return res
                        .status(201) //created
                        .json(trip);
            })
            .catch((err) => {
                return res
                        .status(400) //bad request
                        .json(err);
            });
    });
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    getUser(req, res, (req, res) => {
        TripModel
            .findOneAndUpdate({
                code: req.params.tripCode
            },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            },
            {
                new: true
            })
            .then((trip) => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({ message: 'Trip not found with code ' + req.params.tripCode });
                }
                res
                    .status(200)
                    .send(trip);
            })
            .catch((err) => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({ message: 'Trip not found with code ' + req.params.tripCode});
                }
                return res
                    .status(500) // server error
                    .json(err);
            });
    });
};

// Return the user name if authenticated
const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        // console.log(req.auth);
        UserModel.findOne({ email: req.auth.email })
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: 'User not found' });
                }

                callback(req, res, user.name);

            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(404)
                    .json(err);
            })
                
    } else {
        return res
            .status(404)
            .json({ message: 'User not found' });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
