const mongoose = require("mongoose");
const schema = mongoose.Schema;

const calendarSchema = new schema({
	date: {
		type: Number,
		required: true
	},
	vehicleId: [{type: Number}],
})

const orderSchema = new schema({
	orderDate: {
		type: Date,
		required: true
	},
	orderNumber: {
		type: String,
		required: true,
		index: { unique: true }	
	},
	customerId: {
		type: schema.Types.ObjectId,
		// required: true,
		ref: 'User'
	},
	startDate: {
		type: Date,
		required: true
	},
	startDateNumber: {
		type: Number,
		required: true
	},
	endDateNumber: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	vehicleAlloted: {
		type: String,
		required: true,
		ref: 'Car'
	},
	pickUpLocation: {
		type: String,
		required: true,
		ref: 'Location'
	},
	status: {
		type: String,
		required: true
	},
	baseAmount: Number,
	discountedAmount: Number,
	taxAmount: Number,
	couponCode: String,
	totalAmount: {
		type: Number,
		required: true
	}
})

exports.calendarSchema = mongoose.model('Calendar', calendarSchema);
exports.orderSchema = mongoose.model('Order', orderSchema);