// const Clarifai = require('clarifai');

// // Instantiate a new Clarifai app by passing in your API key.
// const app = new Clarifai.App({ apiKey: '48ab05d6a0af406586d1179d82f479e8' });

// const handleAPICall = (req, res) => {
//     app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//         .then(data => {
//             res.json(data)
//         })
//         .catch(err => res.status(400).json("Unable to work with API"))
// }

const axios = require('axios');
FACEDETECT_API = 'http://127.0.0.1:5000/image/';

const handleAPICall = (req, response) => {
    axios.post(FACEDETECT_API, {
        imgUrl: req.body.input
    })
        .then(res => {
            // console.log('res.data', res.data)
            response.json(res.data)
        })
        .catch(err => {
            console.log(err)
            response.status(400).json("Unable to work with API")
        })
        .finally(console.log(req.body.input))
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