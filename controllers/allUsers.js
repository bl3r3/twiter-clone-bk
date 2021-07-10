const { User} = require('../models')

//This endpoint give all users are in the database
async function allUsers (req, res){
	try{
		const users = await User.findAll()
		return res.json(users)
	}catch(err){
		console.log(err);
		res.status(500).json(err)
	}
}

module.exports = allUsers;