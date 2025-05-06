const Quiz = require("../models/quiz.model");

const getQuizLeaderboard = async (req, res) => {
  try {
    const { courseId, quizId } = req.params;

    const quiz = await Quiz.findOne({ _id: quizId, course: courseId })
      .populate("attempts.student", "name")
      .lean();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found in this course" });
    }

    const leaderboard = quiz.attempts
      .filter(attempt => attempt.score !== null)
      .sort((a, b) => b.score - a.score)
      .map((attempt, index) => ({
        rank: index + 1,
        student: attempt.student.name,
        score: attempt.score,
      }));

    res.status(200).json({ quizTitle: quiz.title, leaderboard });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getQuizLeaderboard };
