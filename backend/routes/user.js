const app= require('express');
const router = app.Router();
const db = require('../data/db');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res) => {
    res.send('Bonjour !')
})

module.exports = router;