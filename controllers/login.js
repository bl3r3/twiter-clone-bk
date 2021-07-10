const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require('../models')
const secret = require('../constants')

//This endpoint validate to the data send by client, if its data is valid return a token and the it toke will be desencript
async function login (req, res){
	const {email, password} = req.body;
	try{
		const user = await User.findOne({where: {email}})
		if(user){
			const validPassword = bcrypt.compareSync(password, user.password)
			if(validPassword){
				const jwtToken = jwt.sign({id: user.id, email: user.email}, secret )
				res.status(200).json({message:"User Correct", user, token: jwtToken})
			}else{
				res.status(404).json({message: "INVALID CREDENTIALS"})
			}
		}
	}catch(err){
		console.log(err);
		res.status(500).json(err)
	}
}

module.exports = login;