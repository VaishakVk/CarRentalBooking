const express = require('express');
const path = require('path');

const router = express.Router();
const carController = require(path.join(__dirname, "../", "controller","admin.js"))

router.get('/', function(req, res){
	res.render("admin");
});

router.get('/addcar', carController.getAddCar);

router.post('/addcar', carController.postAddCar);

module.exports = router;
