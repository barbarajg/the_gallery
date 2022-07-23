var express = require('express');
const artistController = require("../controllers/artistController");
const uploadImage = require("../middleware/uploadImage");
var router = express.Router();

// Ruta raíz:
// localhost:3000/artist/registerForm
router.get("/registerArtist", artistController.showRegisterForm);

// localhost:3000/artist/registerForm
//router.post("/registerArtist", artistController.saveArtist);
router.post("/registerArtist", uploadImage("artists"), artistController.saveArtist);

// localhost:3000/artist/login
router.get("/login", artistController.showLoginForm);

// localhost:3000/artist/login
router.post("/login", artistController.login);

// localhost:3000/artist
router.get("/", artistController.showAll);

// localhost:3000/artist/oneArtist/:artist_id
router.get("/oneArtist/:artist_id", artistController.showOneArtist);

// localhost:3000/artist/editArtist/:artist_id
router.get("/editArtist/:artist_id", artistController.showEditArtist);

// localhost:3000/artist/editArtist/:artist_id
router.post("/editArtist/:artist_id", uploadImage("artists"), artistController.saveEditedArtist);

// localhost:3000/artist/allArtists
router.get("/allArtists", artistController.showAllArtists);

module.exports = router;
