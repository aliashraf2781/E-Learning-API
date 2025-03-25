// const User = require("../models/user.model");

// const getLeaderboard = async (req, res) => {
//   try {
//     const users = await User.find()
//       .sort({ points: -1 }) // ترتيب المستخدمين حسب النقاط
//       .limit(10) // عرض أول 10 فقط
//       .select("name points");

//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { getLeaderboard };

const Quiz = require("../models/quiz.model");

const getQuizLeaderboard = async (req, res) => {
  try {
    const { courseId, quizId } = req.params;

    // البحث عن الـ Quiz داخل الكورس مع ترتيب الطلاب حسب الدرجات
    const quiz = await Quiz.findOne({ _id: quizId, course: courseId })
      .populate("attempts.student", "name") // جلب بيانات الطلاب
      .lean();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found in this course" });
    }

    // ترتيب الطلاب حسب الدرجة من الأعلى إلى الأدنى
    const leaderboard = quiz.attempts
      .filter(attempt => attempt.score !== null) // استبعاد المحاولات بدون درجات
      .sort((a, b) => b.score - a.score) // ترتيب تنازلي
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
