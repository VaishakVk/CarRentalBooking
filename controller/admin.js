const path = require("path");

const car = require(path.join(__dirname, '../', 'models', 'car.js'));
const locationSchema = require(path.join(__dirname, '../', 'models', 'location.js'));

exports.getHome = (req, res) => {
	locationSchema.find((err, result) => {
		if(err) {
			console.log(err);
		} else {
			res.render("home", {location: result})
		}
	})
}

exports.getAddCar = (req, res) => {
	car.modelSchema.find((err, result) => {
		if(err){
			console.log(err);
		} else {
			res.render("addCar", {displayMessage: false, message: '', model: result, purpose: 'add'});
		}
	})
	
}

exports.getEditCar = (req, res) => {
	const id = req.params.id;
	car.modelSchema.findOne({_id: id}, (err, result) => {
		if(err){
			console.log(err);
		} else {
			res.render("addCar", {displayMessage: false, message: '', model: result, purpose: 'edit'});
		}
	})
	
}

exports.postAddCar = (req, res) => {
	const carModelName = req.body.carModel;
	const registrationNumber = req.body.registrationNumber;
	const carModelYear = req.body.carModelYear;
	const procuredOn = req.body.procuredOn;
	
	const addCar = new car.carSchema({
		carModelName: carModelName, 
		registrationNumber: registrationNumber, 
		carModelYear: carModelYear,
		procuredOn: procuredOn
		// nextServiceDue: nextServiceDue,
		// lastServiceDate: lastServiceDate
	});

	addCar.save((err) => {
		try {
			if(err) {
				console.log(err);	
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
						console.log(result);
						// res.render("addCar", {displayMessage: true, message: err, model: result});
						res.render("addCar", {displayMessage: true, message: 'Car added successfully!', model: result});
					}
				})
				// res.render("addCar", {displayMessage: true, message: 'Car added successfully!', model: model.modelDetails});
			}
		}
		catch(err) {
			console.log(err)
			res.redirect('/');
		}
	})
}

exports.getAddModel = (req, res) => {
	res.render("addModel", {displayMessage: false, message: '', purpose: 'add', model: {}});
}

exports.getEditModel = (req, res) => {
	const modelId = req.params.id;
	car.modelSchema.findById(modelId, (err, result) => {
		if(err) {
			console.log(err)
		} else {
			res.render("addModel", {displayMessage: false, message: '', model: result, purpose: 'edit'});
		}
	})
}

exports.postEditModel = (req, res) => {
	const modelId = req.params.id;
	const name = req.body.name;
	const carClass = req.body.carClass;
	const engineCC = req.body.engineCC;
	const enginePower = req.body.enginePower;
	const pricePerHour = req.body.pricePerHour;
	const seating = req.body.seating;
	const imageURL = req.body.imageURL;
	const transmission = req.body.transmission;
	const mileage = req.body.mileage;
	const displayName= req.body.displayName;
	// car.modelSchema.updateOne({__id: modelId}, err, result => {
	// 	if(err) {
	// 		console.log(err)
	// 	} else {
	// 		res.render("addModel", {displayMessage: false, message: '', model: result, edit: true});
	// 	}
	// })
	car.modelSchema.updateOne({_id: modelId}, {
		name: name,
		modelClass: carClass,
		engineCC: engineCC,
		enginePower: enginePower,
		pricePerHour: pricePerHour,
		seating: seating,
		imageURL: imageURL,
		transmission: transmission,
		mileage: mileage,
		displayName: displayName}, (err, result) => {
		if(err) {
			console.log(err)
		} else {
			res.redirect('/models');
		}
	})
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
	const displayName= req.body.displayName;

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
		displayName: displayName
	})

	addModel.save((err) => {
		if(err) {
			res.render("addModel", {displayMessage: true, message: err, purpose: 'add-edit', model: {name: name,
																							modelClass: carClass,
																							engineCC: engineCC,
																							enginePower: enginePower,
																							pricePerHour: pricePerHour,
																							seating: seating,
																							imageURL: imageURL,
																							transmission: transmission,
																							mileage: mileage,
																							displayName: displayName}
																						});
		}
		res.render("addModel", {displayMessage: true, message: 'Model added successfully!', purpose: 'add'});
	})
}

exports.postDeleteModel = (req, res) => {
	const id = req.params.id;
	car.modelSchema.deleteOne({_id: id}, (err) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/models');
		}
	})
}
exports.getAddLocation = (req, res) => {
			res.render("addLocation", {displayMessage: false, message: ''});
}

exports.postAddLocation = (req, res) => {
	const location = req.body.location;
	const displayName = req.body.displayName;
	const addressLine1 = req.body.addressLine1;
	const addressLine2 = req.body.addressLine2;
	const addressLine3 = req.body.addressLine3;
	const city = req.body.city;
	const state = req.body.state;
	const country = req.body.country;
	const pincode = req.body.pincode;
	const contactNumber = req.body.contactNumber;

	const addLocation = new locationSchema({
		location: location,
		displayName: displayName,
		addressLine1: addressLine1,
		addressLine2: addressLine2,
		addressLine3: addressLine3,
		city: city,
		state: state,
		country: country,
		pincode: pincode,
		contactNumber: contactNumber
	})

	addLocation.save((err) => {
		if(err) {
			console.log(err);
		} else {
			res.render("addLocation",{displayMessage: true, message: 'Location added successfully!'});
		}
	})
}
exports.getLocation = (req, res) => {
	locationSchema.find((err, result) => {
		if(err) {
			console.log(err)
		} else {
			res.render("location", {location: result});
		}
	})		
}