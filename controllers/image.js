const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd115ca1e96874818b1106552241fe944'
   });

   const handleApiCall = (req, res) => {
    app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then( data => {
        res.json(data)
    })
    .catch( err => res.status(400).json('uable to access the clarifai data'))
   }

   

const handleImage =  (req, res, db) => {
    const {id} = req.body;
   
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
       res.json(entries[0])
    })

}

module.exports = {
    handleImage,
    handleApiCall
}