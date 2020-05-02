const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Incorrect form submission")
    }
    console.log(req.body);
    const hash = bcrypt.hashSync(password);
    console.log('hash', hash);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .catch(err => console.log)
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => res.json(user[0]));
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => {
            res.status(400).json('Unable to register.')
            console.log(err)
        });
}

module.exports = {
    handleRegister: handleRegister
}