const express = require('express');
var cors = require('cors')
const passport = require("passport");
const {sequelize} = require('./models')
const port = process.env.PORT || 5000

//Controllers
const getTweets = require("./controllers/tweets")
const createUser = require("./controllers/createUser")
const allUsers = require("./controllers/allUsers")
const login = require("./controllers/login")
const createTweet = require("./controllers/createTweet")

// Auth
require("./auth/passport");

//start app
const app = express();

//Middleware
app.use(cors())
app.use(express.json());


//////////////////////////////// ROUTES //////////////////////////////////

//Create User
app.post("/user-create", createUser);

//Get Users
app.get("/users", allUsers)

// Login
app.post("/login", login)

//Create a Tweet
app.post("/create-tweet", createTweet)

//Get Tweets
app.get("/tweets", passport.authenticate('jwt', {session: false}), getTweets)

//Reauthenticate

app.get("/reauthenticate", passport.authenticate('jwt', {session: false}) , (req, res) =>{
	res.send(req.user)
})

//TEST 

app.get("/", (req, res) =>{ res.send("Hello world")})

///////// Listen app /////

app.listen(port, async() =>{
	console.log("Server up LocalHost")
	await sequelize.authenticate()
	console.log("Database Connected")
})

