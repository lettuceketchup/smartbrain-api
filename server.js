const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        // For Heroku
        // connectionString: process.env.DATABASE_URL,
        // ssl: { rejectUnauthorized: false }
        // For Local
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pradhumn123',
        database: 'smartbrain'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

// ROOT
app.get('/', (req, res) => { res.json(db.users) });
// SIGNIN
app.post('/signin', signin.handleSignin(db, bcrypt));
// REGISTER
app.post('/register', register.handleRegister(db, bcrypt));
// PROFILE
app.get('/profile/:id', profile.handleProfileGet(db));
// IMAGE
app.post('/imageurl', image.handleAPICall);
app.put('/image', image.handleImage(db));

// For Heroku
// const PORT = process.env.PORT;
// For Local
const PORT = 3005;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));