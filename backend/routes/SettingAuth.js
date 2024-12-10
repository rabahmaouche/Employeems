const express = require("express");

const Middlewear = require("../middlewear/AuthMiddlewear");
const { updatepwd } = require("../Controller/Setting");

const router = express.Router();

router.put("/changepwd", Middlewear, updatepwd);

module.exports = router;
