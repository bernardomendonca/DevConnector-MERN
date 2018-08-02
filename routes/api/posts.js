const express = require("express");
const router = express.Router();

// @route       GET request to api/posts/test
// @description Tests post route
// @access      Public Route
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

module.exports = router;
