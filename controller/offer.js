const path = require("path")
const offer = require(path.join(__dirname, '../', 'models', 'offer.js'));

exports.getOffer = (req, res) => {
	offer.offerSchema.find((err, result) => {
		if(err){
			console.log(err);
		} else {
			res.render("offer", {offer: result});
		}
	})
}

exports.getAddOffer = (req, res) => {
	res.render("addOffer", {displayMessage: false, message: ''});
}

exports.postAddOffer = (req, res) => {
	const offerName = req.body.offerName;
	const offerCode = req.body.offerCode;
	const couponCode = req.body.couponCode;
	const active = req.body.active;
	const validTill = req.body.validTill;

	const addOffer = new offer.offerSchema({
		offerName: offerName ,
		offerCode: offerCode ,
		couponCode: couponCode,
		active: active,
		validTill: validTill 
	});

	addOffer.save((err) => {
		if(err) {
			res.render("addOffer", {displayMessage: true, message: err});
		}
		res.render("addOffer", {displayMessage: true, message: 'Offer added successfully!'});
	})
}

exports.getOfferDetail = (req, res) => {
	const offerID = req.params.offerId;

	offer.offerSchema.findById(offerID, (err, result) => {
		if(err){
			console.log(err);
		} else {
			res.render("offerDetail", {offerDetail: result});
		}	
	})
}