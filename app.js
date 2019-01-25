const path = require("path");

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const bookingRoute = require(path.join(__dirname, "routes", "booking.js"));
const adminRoute = require(path.join(__dirname, "routes", "admin.js"));
const offerRoute = require(path.join(__dirname, "routes", "offer.js"))
const modelRoute = require(path.join(__dirname, "routes", "car.js"))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(bookingRoute);
app.use('/admin', adminRoute);
app.use(offerRoute);
app.use(modelRoute);

mongoose.connect('mongodb+srv://vaishakvk:Hello123@clusterdb-ohjmw.mongodb.net/CarRentalDB?retryWrites=true', {useNewUrlParser: true}, err => {
	if(err) {
		console.log('Error');
	} else {
		app.listen(3000, function() {
			console.log('Listening on port 3000');
		});		
	}
})
