const Clarifai = require('clarifai'); 
const app = new Clarifai.App({
    apiKey: 'c7f445ac64284dd78e898a09595b7e10'
});

const handleApiCall = (req, res) => {
    app.models
        .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
        .then(data => { 
            res.json(data);
        })
        .catch(err=>res.status(400).json('unable to handle api call'));
}

const handleEntry = (req, res, db) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .then(entry=>{
            db.select('entries')
                .from('users')
                .where('id','=',id)
                .then(entry => {
                    res.json(entry[0].entries)
                });
        })
        .catch(err=>res.status(400).send('Error Updating Entry'));
}

module.exports = {
    handleEntry : handleEntry,
    handleApiCall : handleApiCall
};