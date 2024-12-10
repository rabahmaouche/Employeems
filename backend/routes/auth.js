const express = require("express");
const Middlewear = require("../middlewear/AuthMiddlewear");
const { verify, login } = require("../Controller/logincontroller");

const router = express.Router();

router.post("/login", login);
router.get("/verifie", Middlewear, verify);

module.exports = router;
