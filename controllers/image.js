const Clarifai = require('clarifai');

//You must add your API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '2e5d4e7a2139464788c68f1af296e3b0'
});

const handleApiCall = (req, res ) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage =(req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('unable to entries'))
  }

module.exports = {
	handleImage, 
	handleApiCall
}
