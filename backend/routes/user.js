const app = require('express');
const router = app.Router();
const db = require('../data/db');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;

    const sqlCheck = "SELECT * FROM user WHERE email = ? OR phone = ?";

    db.query(sqlCheck, [email, phone], (error, results) => {
        if (error) return res.status(500).send("Erreur lors de la transmission des infos.");

    
        if (results.length) {
            if (email === results[0].email) return res.send('Cet email est déjà pris.');
            if (phone === results[0].phone) return res.send('Ce numéro de téléphone est déjà pris.');
        }


        bcrypt.hash(password, 10, (error, hash) => {
            if (error) return res.status(500).send("Erreur lors de l'hashage du mot de passe.");

            const sqlInsert = "INSERT INTO user(first_name, last_name, email, phone, password) VALUES(?, ?, ?, ?, ?)";
            db.query(sqlInsert, [first_name, last_name, email, phone, hash], (error) => {
                if (error) return res.status(500).send("Erreur lors de l'ajout en base de donnée.");
                return res.status(200).send("Utilisateur ajouté à la base de donnée.");
            });
        });
    });
});


router.post('/signin', (req, res) => {
    const { email, password } = req.body;

  const sqlCheck = "SELECT * FROM user WHERE email = ?";

    db.query(sqlCheck, [email], (error, results) => {
        if (error) {
            return res.status(500).send("Erreur lors de la transmission des infos.");
        }


        if (results.length === 0) {
            return res.status(404).send("L'email est introuvable.");
        }

        
        const user = results[0];

  
        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                return res.status(500).send("Erreur lors de la vérification du mot de passe.");
            }

            if (isMatch) {
                return res.status(200).send("Utilisateur connecté !");
            } else {
                return res.status(401).send("Mot de passe invalide.");
            }
        });
    });
});


module.exports = router;