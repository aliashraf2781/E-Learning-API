// const express = require("express");
// const router = express.Router();
// const leaderboardController = require("../controllers/leaderboard.controller");

// router.get("/", leaderboardController.getLeaderboard);

// module.exports = router;


const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboard.controller");

router.get("/courses/:courseId/quizzes/:quizId", leaderboardController.getQuizLeaderboard);

module.exports = router;