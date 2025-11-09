
const app = require('express')
const router = app.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt')

// ENSEMBLE DE ROUTES LIEES AU USER : /user/nomDeLaRoute
router.post("/signup",  (req, res) => {
    // Coder le process pour le signup
    console.log(req.body)

    // On récupère les infos transmises par le front : username, email, password
    const { name, email, password } = req.body
    
    // Username pris ? Email pris ? -> si oui on informe le front et on annule le processus
    const sql = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(sql, [email, name], (error, results) => {
        if (error) {
            res.status(500).send("Erreur lors de la vérification des infos")
        } else {
            console.log(results)

            // Si on a un tableau avec des infos dans results c'est qu'il y a des doublons !
            if (results.length) {
                // On veut savoir si il s'agit du username ou du mail 
                if (email === results[0].email) {
                    res.send("Le mail est déjà pris !")
                } else if (name === results[0].username) {
                    res.send("Le nom est déjà pris !")
                }

            } else {

                // On vient hasher le mdp 
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        res.status(500).send("Erreur lors du hashage du password")
                    } else {
                        console.log(hash)

                        const sqlSignup = "INSERT INTO users(username, email, password_hash) VALUES(?, ?, ?)"

                        db.query(sqlSignup, [name, email, hash], (error, results) => {
                            if (error) {
                                res.status(500).send("Erreur lors de l'ajout du user en BDD")
                            } else {
                                console.log(results)
                                res.status(200).send("User ajouté avec succès !")
                            }
                        })
                    }
                })
            }
        }
    })
})
