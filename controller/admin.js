const path = require("path");

const car = require(path.join(__dirname, '../', 'models', 'car.js'));
const locationSchema = require(path.join(__dirname, '../', 'models', 'location.js'));

exports.getHome = (req, res) => {
	try {
		locationSchema.find((err, result) => {
			if(err) {
				console.log(err);
			} else {
				res.render("home", {location: result})
			}
		})
	} catch(err) {
		
		console.log(err)
		res.render('500');
	}
}

exports.getAddCar = (req, res) => {
	try {
		car.modelSchema.find((err, result) => {
			if(err){
				console.log(err);
			} else {
				res.render("addCar", {displayMessage: false, message: '', model: result, purpose: 'add'});
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.getEditCar = (req, res) => {
	try {
		const id = req.params.id;
		car.modelSchema.findOne({_id: id}, (err, result) => {
			if(err){
				console.log(err);
			} else {
				res.render("addCar", {displayMessage: false, message: '', model: result, purpose: 'edit'});
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
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
			res.render('500');
		}
	})
}

exports.getAddModel = (req, res) => {
	try {
		res.render("addModel", {displayMessage: false, message: '', purpose: 'add', model: {}});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.getEditModel = (req, res) => {
	try {
		const modelId = req.params.id;
		car.modelSchema.findById(modelId, (err, result) => {
			if(err) {
				console.log(err)
			} else {
				res.render("addModel", {displayMessage: false, message: '', model: result, purpose: 'edit'});
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postEditModel = (req, res) => {
	try {
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
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postAddModel = (req, res) => {
	try {
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
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postDeleteModel = (req, res) => {
	try {
		const id = req.params.id;
		car.modelSchema.deleteOne({_id: id}, (err) => {
			if(err) {
				console.log(err);
			} else {
				res.redirect('/models');
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}
exports.getAddLocation = (req, res) => {
	try {
		res.render("addLocation", {displayMessage: false, message: ''});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postAddLocation = (req, res) => {
	try {
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
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}
exports.getLocation = (req, res) => {
	try {
		locationSchema.find((err, result) => {
			if(err) {
				console.log(err)
			} else {
				res.render("location", {location: result});
			}
		})		
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}