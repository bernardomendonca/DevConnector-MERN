const express = require("express");
const router = express.Router();

// @route       GET request to api/profile/test
// @description Tests profile route
// @access      Public Route
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

module.exports = router;
