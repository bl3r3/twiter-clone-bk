const {Tweets} = require('../models')

//This endpoint return all tweets are in the database and each tweet contains your user creator.
async function getTweets(req, res) {
	try {
		const tweets = await Tweets.findAll({include: 'user', order: [ ['id', "DESC"]]});
		return res.json(tweets)
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
}

module.exports = getTweets;
