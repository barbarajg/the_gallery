const connection = require("../config/db");

class Work {

    // Ver formulario de registro de obras
    showWorkForm = (req, res) => {
        let artist_id = req.params.artist_id;
        res.render("registerWork", { artist_id });
    };

    // Guarda una nueva obra
    saveWork = (req, res) => {
        let artist_id = req.params.artist_id;
        let { title, description } = req.body;
    
        let sql = `INSERT INTO work (title, description, artist_id) VALUES ("${title}","${description}",${artist_id})`;
    
        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `INSERT INTO work (title, description, artist_id, img) VALUES ("${title}","${description}",${artist_id},"${img}")`;
        }
    
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/artist/oneArtist/${artist_id}`);
        });
    };

    // Muestra el formulario de editar obra
    showWorkEditForm = (req, res) => {
        let work_id = req.params.work_id;
        let sql = `SELECT * FROM work WHERE work_id = ${work_id}`;
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.render("editWorkForm", { result });
        });
    };

    // Guarda el formulario de editar obra
    saveWorkEditForm = (req, res) => {
        let { work_id, artist_id } = req.params;
        let { title, description } = req.body;
        let sql = `UPDATE work SET title = "${title}", description = "${description}", artist_id = ${artist_id} WHERE work_id = ${work_id}`;
        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `UPDATE work SET title = "${title}", description = "${description}", artist_id = ${artist_id}, img = "${img}" WHERE work_id = ${work_id}`;
        }
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/artist/oneArtist/${artist_id}`);
        });
    };

      // Borra una obra
      deleteWork = (req, res) => {
        let { work_id, artist_id } = req.params;
        let sql = `DELETE FROM work WHERE work_id = ${work_id}`;
    
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/artist/oneArtist/${artist_id}`);
        });
    };

    // Muestra formulario de registro de nueva obra (desde navbar)
    showWorkFormFromNav = (req, res) => {
        //let artist_id = req.params.artist_id;
        let sql = `SELECT * FROM artist`;
        console.log("OKKKKKKK");
        connection.query(sql, (error, resultArtist) => {
            if (error) throw error;
            res.render("registerWorkFromNav", { resultArtist });
          });        
    };

    // Guarda el formulario de editar obra (desde navbar)
    saveWorkFormFromNav = (req, res) => {
        let artist_id = req.params.artist_id;
        let { title, description} = req.body;
    
        let sql = `INSERT INTO work (title, description, artist_id) VALUES ("${title}","${description}",${artist_id})`;
    
        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `INSERT INTO work (title, description, artist_id, img) VALUES ("${title}","${description}",${artist_id},"${img}")`;
        }
    
        connection.query(sql, (error, result) => {
          if (error) throw error;
          //res.redirect(`/artist/oneArtist/${artist_id}`);
          res.send("Obra registrada");

        });
    }; 
      
}

module.exports = new Work();