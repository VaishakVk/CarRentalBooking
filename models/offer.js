const mongoose = require("mongoose");

const schema = mongoose.Schema;

const offerSchema = new schema({
	offerName: {
		type: String,
		require: true
	},
	offerCode: {
		type: String,
		require: true
	},
	couponCode: {
		type: String,
		require: true
	},
	active: {
		type: String,
		require: true,
		enum: ["Active", "Inactive"]
	},
	validTill: {
		type: Date,
		require: true
	}
})

exports.offerSchema = mongoose.model("Offer", offerSchema);