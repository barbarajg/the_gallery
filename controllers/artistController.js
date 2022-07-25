const connection = require("../config/db");
const bcrypt = require("bcrypt");

class Artist {

    //Muestra el formulario de registro de artistas
    showRegisterForm = (req, res) => {
        res.render("registerArtist")
    };

    // Guarda un nuevo artista
    saveArtist = (req, res) => {
        console.log("Entra en  saveArtist");
        let { name, last_name, alias, email, password, description, phone_number } = req.body;

        bcrypt.hash(password, 10, (error, hash) => {
            if (error) throw error;
            let sql = `INSERT INTO artist (name, last_name, alias, email, password, description, phone_number) VALUES ("${name}", "${last_name}", "${alias}","${email}", "${hash}", "${description}", "${phone_number}")`;
            if (req.file != undefined) {
              let img = req.file.filename;
              sql = `INSERT INTO artist (name, last_name, alias, email, password, description, phone_number, img) VALUES ("${name}", "${last_name}", "${alias}","${email}", "${hash}", "${description}", "${phone_number}", "${img}")`;
            }
      
            connection.query(sql, (error, result) => {
              //if (error) throw error;
              if (error) {
                res.send("Error en los datos introducidos no son válidos. Verifique que su email no se encuentre ya en el sistema.");
              }
              res.render("login");
            });
        });
    };

    // Muestra el formulario de login
    showLoginForm = (req, res) => {
        res.render("login");
    }

    // Login de artista
    login = (req, res) => {
        let { email, password } = req.body;
        let sql = `SELECT * FROM artist WHERE email = "${email}"`;
        connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length == 1) {
            let encryptedPass = result[0].password;
            bcrypt.compare(password, encryptedPass, (err, resultCompare) => {
            if (resultCompare) {
                let artist_id = result[0].artist_id;
                res.redirect(`/artist/oneArtist/${artist_id}`);
            } else {
                res.send("Wrong credentials");
            }
            });
        } else {
            res.send("Wrong credentials");
        }
        });
    };


    // Renderiza la vista principal, con todos los artistas
    // y todas las obras
    showAll = (req, res) => {
        let sqlArtist = `SELECT * FROM artist`;
        let sqlWork = `SELECT * FROM work`;
    
        connection.query(sqlArtist, (error, resultArtist) => {
          if (error) throw error;
          connection.query(sqlWork, (err, resultWork) => {
            if (err) throw err;
            res.render("index", { resultArtist, resultWork });
          });
        });
    };

    // Muestra el perfil de un artista y sus obras
    showOneArtist = (req, res) => {
        let artist_id = req.params.artist_id;
        let sql = `SELECT * FROM artist WHERE artist_id = ${artist_id}`;
        let sql2 = `SELECT * FROM work WHERE artist_id = ${artist_id}`;
    
        connection.query(sql, (error, resultArtist) => {
          if (error) throw error;
          connection.query(sql2, (err, resultWork) => {
            if (err) throw err;
            res.render("artistProfile", { resultArtist, resultWork });
          });
        });
    };

    // Muestra el formulario de edición de artista
    showEditArtist = (req, res) => {
        let artist_id = req.params.artist_id;
        let sql = `SELECT * FROM artist WHERE artist_id = ${artist_id}`;
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.render("editArtistForm", { result });
        });
    };

    // Guarda la información editada del artista
    saveEditedArtist = (req, res) => {
        console.log(req.body);
        let { name, last_name, alias, email, description, phone_number } = req.body;
        let artist_id = req.params.artist_id;
        let sql = `UPDATE artist SET name = "${name}", last_name = "${last_name}", alias = "${alias}", email = "${email}", description = "${description}", phone_number = "${phone_number}"," WHERE artist_id = ${artist_id}`;

        if (req.file != undefined) {
            let img = req.file.filename;
            sql = `UPDATE artist SET name = "${name}", last_name = "${last_name}", alias = "${alias}", email = "${email}", description = "${description}", phone_number = "${phone_number}", img = "${img}" WHERE artist_id = ${artist_id}`;
        }

        connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/artist/oneArtist/${artist_id}`);
        });
    };

    // Renderiza la vista principal, con todos los artistas
    // y todas las obras
    showAllArtists = (req, res) => {
        let sqlArtist = `SELECT * FROM artist`;
    
        connection.query(sqlArtist, (error, resultArtist) => {
          if (error) throw error;
          res.render("allArtists", { resultArtist });
        });
    };

}

module.exports = new Artist();