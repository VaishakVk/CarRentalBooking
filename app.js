const path = require("path");

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const app = express();

const bookingRoute = require(path.join(__dirname, "routes", "home.js"));
const adminRoute = require(path.join(__dirname, "routes", "admin.js"));
const offerRoute = require(path.join(__dirname, "routes", "offer.js"))
const modelRoute = require(path.join(__dirname, "routes", "car.js"))
const authRoute = require(path.join(__dirname, "routes", "authRoute.js"))
const pageNotFoundRoute = require(path.join(__dirname, "routes", "error.js"))
require('dotenv').config();

console.log(process.env.MONGO_USER);
const MONGODB_URI  = "mongodb+srv://"+process.env.MONGO_USER+ ":Hello123@clusterdb-ohjmw.mongodb.net/CarRentalDB"
const store = new mongoDbStore({uri: MONGODB_URI,
								collection: "session"});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({secret: "12kjfgmnduwehrnsdfkk8",
				saveUninitialized: false,
				resave: false,
				store: store
			}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  next(); 
});

app.use(bookingRoute); 
app.use('/admin', adminRoute);
app.use(offerRoute);
app.use(modelRoute);
app.use(authRoute); 
app.use(pageNotFoundRoute);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, err => {
	if(err) {
		console.log('Error connecting to DB');
	} else {
		app.listen(process.env.PORT || 3000, function() {
			console.log('Listening on port 3000');
		});		
	}
})
