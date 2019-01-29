const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: Date,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);