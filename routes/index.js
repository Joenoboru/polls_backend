const poll = require("../controllers/poll");
const express = require("express");
const router = express.Router();

router.get("/api/polls", poll.getPollList);
router.get("/api/poll/:id", poll.getPoll);
router.post("/api/poll/vote", poll.vote);

module.exports = router;
