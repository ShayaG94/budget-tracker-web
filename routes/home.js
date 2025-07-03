const express = require("express");
const router = express.Router(); // Create a new router instance
const home = require("../controllers/home");

router.route("").get(home.home);

module.exports = router; // Export the router
