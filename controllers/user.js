const getInfo = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where('id',id)
        .then(user => {
            user.length
                ? res.json(user[0])
                : res.status(400).json('no user found');
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports ={
    getInfo : getInfo   
};