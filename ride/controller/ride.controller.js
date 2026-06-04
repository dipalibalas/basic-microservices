const rideModal = require('../models/ride.model');
const {subscribeToQueue, publishToQueue} = require('../service/rabbit');


// Asynchronous type: loosely typed, response delayed
// Synchronous type: strictly typed, response immediate, dependent service on another service, if one service fails, the entire system fails
exports.createRide = async (req, res) => {
    try {
        const{ pickup,destination} = req.body;
        
        const newRide = new rideModal({
            user: req.user._id,
            pickup,
            destination
        });

        await newRide.save();
        // Publish ride request to RabbitMQ
        publishToQueue("new-ride",
            JSON.stringify(newRide)
        )
        res.send(newRide);
    }catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.acceptRide = async (req, res) => {
    try {
        const { rideId } = req.query;
        const ride = await rideModal.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }   
        ride.status = 'accepted';
        await ride.save();
        publishToQueue("ride-accepted", JSON.stringify(ride));
        res.json({ message: 'Ride accepted', ride });
    } catch (error) {
        console.error('Error accepting ride:', error);
        res.status(500).json({ message: 'Server error' });
    }
};