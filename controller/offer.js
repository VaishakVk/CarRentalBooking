const path = require("path")
const offer = require(path.join(__dirname, '../', 'models', 'offer.js'));

exports.getOffer = (req, res) => {
	try {
		offer.offerSchema.find((err, result) => {
			if(err){
				console.log(err);
			} else {
				res.render("offer", {offer: result});
			}
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.getAddOffer = (req, res) => {
	try {
		res.render("addOffer", {displayMessage: false, message: ''});
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.postAddOffer = (req, res) => {
	try {
		const offerName = req.body.offerName;
		const offerCode = req.body.offerCode;
		const couponCode = req.body.couponCode;
		const active = req.body.active;
		const validTill = req.body.validTill;
		const operator = req.body.operator;
		const couponValue = req.body.couponValue;

		const addOffer = new offer.offerSchema({
			offerName: offerName ,
			offerCode: offerCode ,
			couponCode: couponCode,
			active: active,
			validTill: validTill ,
			operator: operator,
			couponValue: couponValue
		});

		addOffer.save((err) => {
			if(err) {
				res.render("addOffer", {displayMessage: true, message: err});
			}
			res.render("addOffer", {displayMessage: true, message: 'Offer added successfully!'});
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}

exports.getOfferDetail = (req, res) => {
	try {
		const offerID = req.params.offerId;

		offer.offerSchema.findById(offerID, (err, result) => {
			if(err){
				console.log(err);
			} else {
				res.render("offerDetail", {offerDetail: result});
			}	
		})
	} catch(err) {
		console.log(err)
		res.render('500');
	}
}