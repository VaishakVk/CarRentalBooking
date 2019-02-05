const path = require("path");
const model = require(path.join(__dirname, '../', 'models', 'car.js'));

exports.getModels = (req, res) => {
	try {
		model.modelSchema.find((err, result) => {
			if(err) {
				console.log(err);
			} else {
				res.render("model", {model: result});
			}
		}); 
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}