import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import {getProfiles, getProfile} from './database.js'

import { pool } from './database.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('No worky ):')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname +`\\index.html`);
});

app.get('/login', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + `\\login.html`);
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + `\\signup.html`);
});

app.get('/page', (req, res) => {
    res.sendFile(__dirname + `\\page.html`);
});



app.post('/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    const [rows] = await pool.execute(
        'SELECT * FROM profiles WHERE email = ?',
        [email]
    );

    if (rows.length !== 0){
        res.status(401).send('You already have an account!')
        return;
    }
     else{
         const hash = await bcrypt.hash(password, 10)

         await pool.query("INSERT INTO profiles (username, email, hash) VALUES (?, ?, ?)", [username, email, hash])
         res.redirect('/page')
     }
})



app.post('/login', async (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;

    const [rows] = await pool.execute(
        'SELECT * FROM profiles WHERE username = ?',
        [username]
    );

    if (rows.length === 0) {
        res.status(401).send('Invalid username or password');
        return;
    }
    
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.hash)
    if (!valid) {
        console.log(user.password)
        console.log(password)
        res.status(401).send('Invalid username or password');
        return;
    }

    res.redirect('/page')
});

app.get("/profile/:id", async (req, res) => {
    const id = req.params.id 
    const profile = await getProfile(id)
    res.send(profile)
})

app.listen('https://nocaps.onrender.com', () => {
    console.log('Server is running on 3000')
})