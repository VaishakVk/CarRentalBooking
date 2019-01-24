const mongoose = require("mongoose");

const schema = mongoose.Schema

const modelSchema = new schema({
	name: {
		type: String,
		required: true
	},
	modelClass: {
		type: String,
		enum: ['Bike-upto 150cc', 'Bike-above 150cc', 'Scooter', 'Car-Hatchback', 'Car-Sedan', 'Car-SUV'],
		required: true
	},
	engineCC: {
		type: Number,
		required: true
	},
	enginePower: {
		type: Number,
		required: true
	},
	pricePerHour: {
		type: Number,
		required: true
	}
})

const carSchema = new schema({
	carName: {
		type: String,
		required: true
	},
	registrationNumber: {
		type: String,
		required: true
	},
	imageURL: {
		type: String,
		required: true
	},
	carClass: {
		type: String,
		required: true
	},
	carModelYear: {
		type: Number,
	}
})

exports.carSchema = mongoose.model('Car', carSchema);
exports.modelSchema = mongoose.model('Model', modelSchema);