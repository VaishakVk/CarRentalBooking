// AIzaSyB0VgKhPXAxE2VbC9aUGD70W76IyvOERcY

const path = require("path");
const user = require(path.join(__dirname, '../', 'models', 'user.js'));

exports.getLogin = (req, res) => {
	res.render('login');
};

exports.postLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	user.findOne({email: email}, (err, result) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	})
}

exports.getSignUp = (req, res) => {
	res.render('signup');
};

exports.postSignUp = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;	
	const dateOfBirth = req.body.dateOfBirth;
	const confirmPassword = req.body.confirmPassword;

	const adduser = new user({
		email: email,
		passwordHash: password,
		firstName: firstName,
		lastName: lastName,
		dateOfBirth: dateOfBirth
	});

	adduser.save(err => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/login');
		}
	})
};