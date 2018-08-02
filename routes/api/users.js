const express = require("express");
const router = express.Router();

// @route       GET request to api/users/test
// @description Tests users route
// @access      Public Route
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

module.exports = router;
