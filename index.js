const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const redisClient = require('./config/redis');
const path = require('path');

dotenv.config();

db.connect((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

const app = express();

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));