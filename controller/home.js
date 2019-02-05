const path = require("path");

const locationSchema = require(path.join(__dirname, '../', 'models', 'location.js'));
const book = require(path.join(__dirname, '../', 'models', 'book.js'));
const cars = require(path.join(__dirname, '../', 'models', 'car.js'));
const coupons = require(path.join(__dirname, '../', 'models', 'offer.js'));

exports.getHome = (req, res) => {
	try {
		locationSchema.find((err, result) => {
			if(err) {
				console.log(err);
			} else {
				res.render("home", {location: result, displayMessage: ""})
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postBooking = (req, res) => {
	try {
		if(req.session.loggedIn) {
			const pickUpLocation = req.body.pickUpLocation;
			const startDateReq = req.body.startDate;
			const duration = req.body.duration;
			var vehiclesInUse = []
			const startDate = new Date(startDateReq);
			const startDateTransf = new Date(startDateReq);
					// console.log(startDateReq, startDateTransf.getMonth() , duration, pickUpLocation);
			if(!pickUpLocation) {
				locationSchema.find((err, result) => {
					if(err) {
						console.log(err);
					} else {
						res.render("home", {location: result, displayMessage: "Please select a location"})
					}
				})
				
			} else if(!startDateReq) {
				locationSchema.find((err, result) => {
				if(err) {
						console.log(err);
					} else {
						res.render("home", {location: result, displayMessage: "Please select a start date"})
					}
				})		
			} else {
				const endDate = new Date(startDateTransf.setMonth(startDateTransf.getMonth() + Number(duration)));
				var locations;
				const startDateNumber = Math.round(startDate.getTime()/86400000);
				const endDateNumber = Math.round(endDate.getTime()/86400000);


				locationSchema.find((err, result) => {
					// console.log(result);
					if(err) {
						console.log(err);
					} else {
						locations = result;
					}
				})

				book.calendarSchema.find({"date": {"$gte":startDateNumber, "$lte": endDateNumber}}, (err, result) => {
					if(err) {
						console.log(err);
					} else {
						for(i=0; i<result.length; i++) {
							vehiclesInUse = vehiclesInUse.concat(result[i].vehicleId);
						}
						vehiclesInUse = [...new Set(vehiclesInUse)];

						cars.carSchema.distinct("carModelName", {"registrationNumber": {"$nin": vehiclesInUse}}, (err, carsNotInUse) => {
							// console.log(vehiclesInUse, carsNotInUse);
							if(err) {
								console.log(err);
							} else {
								cars.modelSchema.find({"name": {"$in": carsNotInUse}}, (err, result) => {
									res.render("book", {model: result,
														pickUpLocation: pickUpLocation, 
														startDate: startDateReq, 
														duration:duration, 
														vehiclesInUse: vehiclesInUse,
														locations: locations
												})
								})
							}	
						})
					}
				})	
			}
		} else {
			res.render("login", {displayMessage: ""});
		}

	} catch(err) {
		console.log(err)
		res.render('500');
	}	

	// const addCalendar = book.calendarSchema({
	// 	date: 123,
	// 	order: [123, 234]
	// })
	// const addOrder = book.orderSchema({
	// 	orderDate: startDate,
	// 	startDate: startDate,
	// 	startDateNumber: 123,
	// 	endDateNumber: 123,
	// 	duration: 1,
	// 	status: 'DRAFT',
	// 	totalAmount: 12300
	// });

	// addCalendar.save((err) =>  { 
	// 	if(err) {
	// 		console.log(err);
	// 	} else {
	// 		res.redirect('/');
	// 	}
	// })
}

exports.getCheckout = (req, res) => {
	try {
		if(req.session.loggedIn) {
			const vehiclesInUse = req.body.vehiclesInUse;
			const modelId = req.body.modelId;
			const pickUpLocation = req.body.pickUpLocation;
			const startDate = req.body.startDate;
			const duration = req.body.duration;
			const couponCode = req.body.couponCode;
			var discount = req.body.discount;
			const modifiedPrice = req.body.modifiedPrice;
			// console.log(pickUpLocation)
			if(discount == undefined) {
				discount = 0;
			}
			
			cars.modelSchema.findOne({name: modelId}, (err, result) => {
				if(err) {
					console.log(err);
				} else {
					res.render("checkout", {modelDetail: result,
								pickUpLocation: pickUpLocation,
								startDate: startDate, 
								duration:duration, 
								vehiclesInUse: vehiclesInUse, 
								couponCode: couponCode,
								modifiedPrice: (result.pricePerHour * duration) - discount,
								message: "",
								discount: discount
					})
				}
			})
		} else {
			res.render("login", {displayMessage: ""});
		}

	} catch(err) {
		console.log(err)
		res.render('500');
	}
}
exports.postConfirm = (req, res) => {
	try {
		if(req.session.loggedIn) {
			const startDateReq = req.body.startDate;
			var vehiclesInUse = [];
			const modelId = req.body.modelId;
			const pickUpLocation = req.body.pickUpLocation;
			const duration = req.body.duration;
			const couponCode = req.body.couponCode;
			var discount = req.body.discount;
			const modifiedPrice = req.body.modifiedPrice;
			const startDate = new Date(startDateReq);
			const startDateTransf = new Date(startDateReq);
			// console.log(startDateTransf, startDateReq, startDateTransf.getMonth() + duration, startDateTransf.getMonth());
			const endDate = new Date(startDateTransf.setMonth(startDateTransf.getMonth() + parseInt(duration, 10)));
			// console.log(startDate, endDate, vehiclesInUse)
			const startDateNumber = Math.round(startDate.getTime()/86400000);
			const endDateNumber = Math.round(endDate.getTime()/86400000);

			const date = new Date();
			const orderNumber = date.getDate().toString() + date.getMonth().toString() + date.getYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getMilliseconds().toString();
			// console.log(startDateNumber, endDateNumber, startDateReq)
			book.calendarSchema.find({"date": {"$gte":startDateNumber, "$lte": endDateNumber}}, (err, result) => {
				if(err) {
					console.log(err);
				} else {
					// console.log(result); 
					for(i=0; i<result.length; i++) {
						// console.log('Loop', result[i].vehicleId)
						vehiclesInUse = vehiclesInUse.concat(result[i].vehicleId);
					}
					// console.log(vehiclesInUse);
					vehiclesInUse = [...new Set(vehiclesInUse)];
					// console.log(vehiclesInUse)
					cars.carSchema.findOne({"carModelName": modelId, "registrationNumber": {"$nin": vehiclesInUse}}, (err, result) => {
						// console.log(result);
						var carAlloted = result.registrationNumber;
						const addOrder = book.orderSchema({
							orderDate: new Date().toString(),
							startDate: startDate,
							startDateNumber: startDateNumber,
							endDateNumber: endDateNumber,
							duration: duration,
							status: 'CONFIRMED',
							totalAmount: modifiedPrice,
							orderNumber: orderNumber,
							vehicleAlloted: carAlloted,
							pickUpLocation: pickUpLocation
						});

						addOrder.save((err, OrderResult) => {
							if(err) {
								console.log(err);
							} else {
								res.render("confirm", {modelDetail: result,
										pickUpLocation: pickUpLocation,
										startDate: startDate, 
										duration:duration, 
										vehiclesInUse: vehiclesInUse, 
										couponCode: couponCode,
										modifiedPrice: modifiedPrice,
										message: "",
										discount: discount
								})
								for(i=startDateNumber; i<=endDateNumber; i++) {
									var calendarEntry = {
										$push: {vehicleId: result.registrationNumber}
									}

									book.calendarSchema.updateOne(
									    {date: i}, // find a document with that filter
									    calendarEntry, // document to insert when nothing was found
									    {upsert: true}, // options
									    function (err, result) { // callback
									        if (err) {
									            console.log(err);// handle error
									        }
									    });
								}
							}
						})	
					})
				}
			})
		} else {
			res.render("login", {displayMessage: ""});
		}
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postValdiateCoupon = (req, res) => {
	try {
		if(req.session.loggedIn) {
			const vehiclesInUse = req.body.vehiclesInUse;
			const modelId = req.body.modelId;
			const pickUpLocation = req.body.pickUpLocation;
			const startDate = req.body.startDate;
			const duration = req.body.duration;
			const couponCode = req.body.couponCode;
			var discount = req.body.discount;
			var basePrice;
			var modifiedPrice = req.body.modifiedPrice;
			var message = "";
			var basePrice;
			var operator;
			var couponValue;
			// console.log('duration', duration);
			cars.modelSchema.findOne({name: modelId}, (err, modelResult) => {
				if(err) {
					console.log(err);
				} else {
					coupons.offerSchema.findOne({couponCode: couponCode}, (err, offerResult) => {
						if(err) {
							console.log(err);
						} else {
							if (couponCode == "") {
								message = "Please enter a coupon!"
								modifiedPrice = modelResult.pricePerHour
								basePrice = modelResult.pricePerHour
								discount = 0
							} else if(offerResult == null) {
								message = "Coupon does not exist"
								modifiedPrice = modelResult.pricePerHour
								basePrice = modelResult.pricePerHour
								discount = 0
							} else {
								if (offerResult.active !== "Active") {
									message = "Coupon is not active."
								} else {		

									basePrice = modelResult.pricePerHour * duration;
									operator = offerResult.operator;
									couponValue = offerResult.couponValue;
									// console.log(basePrice, operator, couponValue, modelResult.pricePerHour,modelResult)
									if(operator === "Lumpsum") {
										discount = couponValue;
										modifiedPrice =basePrice - couponValue;
										message = "Congrats! You have received a discount of Rs. " + discount.toString();													
									} else if (operator == "Percentage") {
										discount = Math.round((offerResult.couponValue * basePrice)/100)
										modifiedPrice = basePrice-discount
										message = "Congrats! You have received a discount of Rs. " + discount.toString()
									}
								}
							}
							res.render("checkout", {modelDetail: modelResult,
														pickUpLocation: pickUpLocation,
														startDate: startDate, 
														duration:duration, 
														vehiclesInUse: vehiclesInUse, 
														couponCode: couponCode,
														modifiedPrice: modifiedPrice,
														message: message,
														discount: discount
							});
						}
					})
				}
			})
		} else {
			res.render("login", {displayMessage: ""});
		}
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}	