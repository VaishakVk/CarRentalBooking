const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
	res.render("home");
});


router.post('/book', function(req, res) {
	var pickUpLocation = req.body.location;
	var startDate = req.body.startDate;
	var duration = req.body.duration;
	console.log(req.body);
	// var carsAvailable = Cars.find({});
	res.render("book", {pickUpLocation: pickUpLocation, startDate: startDate, duration:duration});
});

module.exports = router;
