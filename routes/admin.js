const express = require('express');
const path = require('path');

const router = express.Router();
const adminController = require(path.join(__dirname, "../", "controller","admin.js"))

router.get('/', function(req, res){
	res.render("admin");
});

router.get('/addcar', adminController.getAddCar);
router.post('/addcar', adminController.postAddCar);
// router.get('/editcar/:id', adminController.getEditCar);
// router.post('/editcar/:id', adminController.postEditCar);

router.get('/addmodel', adminController.getAddModel);
router.post('/addmodel', adminController.postAddModel);
router.get('/editmodel/:id', adminController.getEditModel);
router.post('/editmodel/:id', adminController.postEditModel);
router.post('/deletemodel/:id', adminController.postDeleteModel);

router.get('/addlocation', adminController.getAddLocation);
router.post('/addlocation', adminController.postAddLocation);
router.get('/location', adminController.getLocation);
// router.get('/editlocation/:id', adminController.getEditLocation);
// router.post('/editlocation/:id', adminController.postEditLocation);

module.exports = router;
