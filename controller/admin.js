const path = require("path");

const car = require(path.join(__dirname, '../', 'models', 'car.js'));

exports.getAddCar = (req, res) => {
	res.render("addCar", {displayMessage: false, message: ''});
}

exports.postAddCar = (req, res) => {
	const carName = req.body.carModel;
	const registrationNumber = req.body.registrationNumber;
	const imageURL = req.body.imageURL;
	const carModelYear = req.body.carModelYear;
	const carClass = req.body.carClass;

	const addCar = new car.carSchema({
		carName: carName, 
		registrationNumber: registrationNumber, 
		imageURL: imageURL,
		carModelYear: carModelYear,
		carClass: carClass
	});
	
	addCar.save((err) => {
		if(err) {
			res.render("addCar", {displayMessage: true, message: err});
		}
		res.render("addCar", {displayMessage: true, message: 'Product added successfully!'});
	})
}