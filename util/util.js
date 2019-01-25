const path = require("path");
const car = require(path.join(__dirname, '../', 'models', 'car.js'));

exports.modelDetails = car.modelSchema.find((err, result) => {
	if(err) {
		console.log(err)
	} else {
		return result;
	}
});