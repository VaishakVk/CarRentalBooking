const mongoose = require("mongoose");

const schema = mongoose.Schema

const locationSchema = new schema({
	location: {
		type: String,
		required: true,
		index: { unique: true }
	},
	displayName: {
		type: String,
		required: true,
		index: { unique: true }
	},
	addressLine1: {
		type: String,
		required: true
	},
	addressLine2: {
		type: String
	},
	addressLine3: {
		type: String,
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	pincode: {
		type: String,
		required: true
	},
	contactNumber: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Location', locationSchema);
