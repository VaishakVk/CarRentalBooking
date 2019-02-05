// AIzaSyB0VgKhPXAxE2VbC9aUGD70W76IyvOERcY
const bcrypt = require("bcryptjs");
const path = require("path");
const user = require(path.join(__dirname, '../', 'models', 'user.js'));

exports.getLogin = (req, res) => {
	try {
		res.render('login', {displayMessage: ""});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
};

exports.postLogin = (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		user.findOne({email: email}, (err, userInfo) => {
			if(err) {
				console.log(err);
				res.render('login', {displayMessage: "Invalid Username or Password"});
			} else {
				if(!userInfo) {
					res.render('login', {displayMessage: "Invalid Username or Password"});				
				} else {
					bcrypt.compare(password, userInfo.passwordHash, (err, match) => {
						// console.log(match, err)
						if(match) {
							req.session.user = userInfo;
							req.session.loggedIn = true;
							res.redirect('/');
						} else {
							res.render('login', {displayMessage: "Invalid Username or Password"});
						}
					})					
				}			
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.getSignUp = (req, res) => {
	try {
		res.render('signup', {displayMessage: ""});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
};

exports.postSignUp = (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;	
		const dateOfBirth = req.body.dateOfBirth;
		const confirmPassword = req.body.confirmPassword;

		user.findOne({email: email}, (err, result)=> {
			if(err) {
				console.log(err);
			} else {
				if(result) {
					res.render("signup", {displayMessage:"Email already exists. Please use a different email." });
				} else {
					bcrypt.hash(password, 12, (err, hashedPassword) => {
						// console.log(hashedPassword);
						const adduser = new user({
												email: email,
												passwordHash: hashedPassword,
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
					})				
				}
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
};

exports.postLogout = (req, res) => {
	try {
		req.session.destroy(err => {
		    console.log(err);
		    res.redirect('/');
		});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
};

exports.getchangePassword = (req, res) => {
	try {
		res.render('changePassword', {displayMessage: ""});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
};

exports.postchangePassword = (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		console.log(email);
		user.findOne({email: email}, (err, userInfo) => {
			// console.log(userInfo);
			if(err) {
				console.log(err);
				res.render('forgotPassword', {displayMessage: "Invalid Username or Password"});
			} else {
				if(!userInfo) {
					res.render('forgotPassword', {displayMessage: "Invalid Username or Password"});				
				} else {
					bcrypt.hash(password, 12, (err, hashedPassword) => {
						// console.log(hashedPassword);
						userInfo.passwordHash = hashedPassword;
						userInfo.save();
						res.render("login", {displayMessage: "Password changed successfully"});
						// user.updateOne({"email": email}, 
						// 				{"passwordhash": hashedPassword}, 
						// 				(err, result) => {
						// 													if(err) {
						// 														console.log(err)
						// 														res.render('500');
						// 													} else {
						// 														console.log(result);
						// 														res.render("login", {displayMessage: "Password changed successfully"});
						// 													}
						// 												})
					})	
				}
			}
		})	
	} catch(err) {
		console.log(err)
		res.render('500');
	}
};