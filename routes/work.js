var express = require('express');
const workController = require("../controllers/workController");
const uploadImage = require("../middleware/uploadImage");
var router = express.Router();

// Ruta raíz:
// localhost:3000/work

// localhost:3000/work/showWorkForm/:artist_id
router.get("/showWorkForm/:artist_id", workController.showWorkForm);

// localhost:3000/work/saveWork/:artist_id
router.post("/saveWork/:artist_id", uploadImage("works"), workController.saveWork);

// localhost:3000/work/showWorkEditForm/:work_id
router.get("/showWorkEditForm/:work_id", workController.showWorkEditForm);

// localhost:3000/work/saveWorkEditForm/:work_id/:artist_id
router.post("/saveWorkEditForm/:work_id/:artist_id", uploadImage("works"), workController.saveWorkEditForm);

// localhost:3000/work/deleteWork/:work_id
router.get("/deleteWork/:work_id/:artist_id", workController.deleteWork);

// localhost:3000/work/showWorkFormFromNav
router.get("/showWorkFormFromNav", workController.showWorkFormFromNav);

// localhost:3000/work/saveWorkFormFromNav/:artist_id
router.post("/saveWorkFormFromNav/:artist_id", uploadImage("works"), workController.saveWorkFormFromNav);


module.exports = router;