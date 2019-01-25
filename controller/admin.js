const path = require("path");

const car = require(path.join(__dirname, '../', 'models', 'car.js'));

exports.getAddCar = (req, res) => {
	car.modelSchema.find((err, result) => {
		if(err){
			console.log(err);
		} else {
			res.render("addCar", {displayMessage: false, message: '', model: result});
		}
	})
	
}

exports.postAddCar = (req, res) => {
	const carName = req.body.carModel;
	const registrationNumber = req.body.registrationNumber;
	const carModelYear = req.body.carModelYear;
	const procuredOn = req.body.procuredOn;
	const nextServiceDue = req.body.nextServiceDue;
	const lastServiceDate = req.body.lastServiceDate;

	const addCar = new car.carSchema({
		carName: carName, 
		registrationNumber: registrationNumber, 
		carModelYear: carModelYear,
		procuredOn: procuredOn
		// nextServiceDue: nextServiceDue,
		// lastServiceDate: lastServiceDate
	});
	
	addCar.save((err) => {
		if(err) {
			car.modelSchema.find((err, result) => {
				if(err){
					console.log(err);
				} else {
					res.render("addCar", {displayMessage: true, message: err, model: result});
				}
			})
			// res.render("addCar", {displayMessage: true, message: err, model: model.modelDetails});
		} else {
			car.modelSchema.find((err, result) => {
				if(err){
					console.log(err);
				} else {
					// res.render("addCar", {displayMessage: true, message: err, model: result});
					res.render("addCar", {displayMessage: true, message: 'Car added successfully!', model: result});
				}
			})
			// res.render("addCar", {displayMessage: true, message: 'Car added successfully!', model: model.modelDetails});
		}
	})
}

exports.getAddModel = (req, res) => {
	res.render("addModel", {displayMessage: false, message: ''});
}

exports.postAddModel = (req, res) => {
	const name = req.body.name;
	const carClass = req.body.carClass;
	const engineCC = req.body.engineCC;
	const enginePower = req.body.enginePower;
	const pricePerHour = req.body.pricePerHour;
	const seating = req.body.seating;
	const imageURL = req.body.imageURL;
	const transmission = req.body.transmission;
	const mileage = req.body.mileage;

	const addModel = new car.modelSchema({
		name: name,
		modelClass: carClass,
		engineCC: engineCC,
		enginePower: enginePower,
		pricePerHour: pricePerHour,
		seating: seating,
		imageURL: imageURL,
		transmission: transmission,
		mileage: mileage,
	})

	addModel.save((err) => {
		if(err) {
			res.render("addModel", {displayMessage: true, message: err});
		}
		res.render("addModel", {displayMessage: true, message: 'Model added successfully!'});
	})
}