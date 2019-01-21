const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
	res.render("home");
});

router.get('/offers', function(req, res) {
	res.render("offer");
});

router.get('/models', function(req, res) {
	res.render("model");
});

router.post('/book', function(req, res) {
	var pickUpLocation = req.body.location;
	var startDate = req.body.startDate;
	var duration = req.body.duration;
	
	var carsAvailable = Cars.find({});
	res.render("book");
});

module.exports = router;
