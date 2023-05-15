import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'

import { pool } from './database.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()

app.use(bodyParser.urlencoded({ extended: false}))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('No worky ):')
})

const folderPath = path.join(__dirname, '..\\frontend\\type\\dist');

// console.log(folderPath)

app.use(express.static(path.join(folderPath)));

// console.log(folderPath)

app.get('/', (req, res) => {
    res.sendFile(folderPath +`\\index.html`);
});

app.get('/login', (req, res) => {
    res.sendFile(folderPath + `\\login.html`);
});

app.get('/signup', (req, res) => {
    res.sendFile(folderPath + `\\signup.html`);
});

app.get('/profile', (req, res) => {
    res.sendFile(folderPath + `\\profile.html`);
});

app.use(express.json());

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
         res.json({ success: true });
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
        res.status(401).send('Invalid username or password');
        return;
    }
    const token = jwt.sign({ username: user.username, WPM: user.WPM, userID: user.userID }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ success: true, token });
});


app.post('/', async (req, res) => {
    let newWPM = req.body.WPM;
    console.log('Received score:', newWPM);

    const [rows] = await pool.execute(`SELECT * FROM profiles where userID = 9`);
    const user = rows[0];

    console.log(user)

    console.log(user.WPM)

    if(newWPM > user.WPM){
        await pool.execute(`UPDATE profiles SET WPM = ${newWPM} WHERE userID = 9`);
    }
    // Send a response back to the client
    res.json({ message: 'Score received successfully!' });
});

app.listen(3000, () => {
    console.log('Server is running on 3000')
});