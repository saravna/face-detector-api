const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json('incorrect form submission');
    }

    var hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            email : email,
            hash : hash
        })
        .into('login')
        .then(response => {
            console.log(email);
            return trx('users')
                .insert({
                    name : name,
                    email : email,
                    joined : new Date()
                })
                .then(id => {
                    console.log(email);
                    db.select('*')
                        .from('users')
                        .where('id','=',id)
                        .then(user => {
                            res.json(user[0]);
                        });
                });
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).send('Error Registering'));
    // database.users.push({
    //     id : '3',
    //     name : name,
    //     email : email,
    //     password : password,
    //     entries : 0,
    //     join : new Date()
    // });
    // res.json(database.users[database.users.length-1]);
}

module.exports = {
    handleRegister : handleRegister
};