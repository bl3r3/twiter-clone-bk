const bcrypt = require("bcrypt");
const { User } = require('../models')


//This endpoint get the data send to the client by https method and create a new user with the password encrypted.

async function createUser (req, res){
	const {name, last_name, email, username, password} = req.body
	try{
		var salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt)
		const user = await User.create({name, last_name, email, username, password: hash});
		return res.status(201).json(user);
	}catch(err){
		console.log(err)
		res.status(500).json(err)
	}
}

module.exports = createUser;