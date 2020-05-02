const Clarifai = require('clarifai');

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({ apiKey: '48ab05d6a0af406586d1179d82f479e8' });

const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json("Unable to work with API"))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('Unable to get count'));
}

module.exports = {
    handleImage,
    handleAPICall
}