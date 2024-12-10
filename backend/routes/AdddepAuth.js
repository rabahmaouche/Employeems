const express = require("express");
const {
  AdddepController,
  getdepController,
  geteditdepcontroller,
  Updatedepcontroller,
  Deletedepcontroller,
} = require("../Controller/AdddepController");
const Middlewear = require("../middlewear/AuthMiddlewear");

const router = express.Router();

router.get("/Department", Middlewear, getdepController);
router.post("/Adddep", Middlewear, AdddepController);
router.get("/:id", Middlewear, geteditdepcontroller);
router.put("/:id", Middlewear, Updatedepcontroller);
router.delete("/:id", Middlewear, Deletedepcontroller);

module.exports = router;
