const path = require("path");

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const bookingRoute = require(path.join(__dirname, "routes", "booking.js"));
const adminRoute = require(path.join(__dirname, "routes", "admin.js"));

mongoose.connect("mongodb://localhost:27017/car_booking", { useNewUrlParser: true }, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Successfully Connected to car_booking');
	}
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(bookingRoute);
app.use('/admin', adminRoute);

app.listen(3000, function() {
	console.log('Listening on port 3000');
});