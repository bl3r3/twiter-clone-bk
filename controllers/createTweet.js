const {Tweets} = require('../models')

//This endpoint create a new tweet
async function createTweet (req, res){
	const {id, content} = req.body;
	try {
		const tweet = await Tweets.create({content: content, userId: id})
		return res.status(201).json(tweet)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

module.exports = createTweet;