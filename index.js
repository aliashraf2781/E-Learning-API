// const express = require("express");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const cors = require("cors");
// require("./config/db.config");
// dotenv.config();


// const app = express();

// const corsOptions = {
//   origin: "*",
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));


// const userRoutes = require("./routes/user.routes");
// const courseRoutes = require("./routes/course.routes");
// const quizRoutes = require("./routes/quiz.routes");
// const forumRoutes = require("./routes/forum.routes");
// const progressRoutes = require("./routes/progress.routes");
// const badgeRoutes = require("./routes/badge.routes");
// const leaderboardRoutes = require("./routes/leaderboard.routes");



// const path = require("path");

// app.use(bodyParser.json());

// app.use("/api/auth", userRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api", quizRoutes);
// app.use("/api/courses/:courseId/forums", forumRoutes);
// app.use("/api", progressRoutes);
// app.use("/api/badges", badgeRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);


const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
require("./config/db.config");
dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
}));
app.use(bodyParser.json());

// ===== Static Files =====
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/certificates", express.static(path.join(__dirname, "certificates")));

// ===== Routes =====
const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const quizRoutes = require("./routes/quiz.routes");
const forumRoutes = require("./routes/forum.routes");
const progressRoutes = require("./routes/progress.routes");
const badgeRoutes = require("./routes/badge.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const certificateRoutes = require("./routes/certificate.routes");

app.use("/api/auth", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", quizRoutes);
app.use("/api/courses/:courseId/forums", forumRoutes);
app.use("/api", progressRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/certificates", certificateRoutes);

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
