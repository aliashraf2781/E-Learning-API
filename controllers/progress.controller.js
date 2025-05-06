const Progress = require("../models/progress.model");
const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");
const User = require("../models/user.model");
const Certificate = require("../models/certificate.model");

const generateCertificateFromHTML = require("../helpers/generateCertificateHtml");
const path = require("path");

exports.markLessonAsComplete = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    let progress = await Progress.findOne({ user: userId, course: courseId });

    if (progress) {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        await progress.save();

        user.points += 10;
        await user.save();

        // await checkAndAwardBadge(user._id);
      }
    } else {
      progress = new Progress({
        user: userId,
        course: courseId,
        completedLessons: [lessonId],
      });
      await progress.save();

      user.points += 10;
      await user.save();

      // await checkAndAwardBadge(user._id);
    }

    // ✅ Check if course is 100% complete
    const totalLessons = course.lessons.length || 1;
    const completedCount = progress.completedLessons.length;
    const percentage = Math.round((completedCount / totalLessons) * 100);

if (percentage === 100) {
  // const alreadyExists = await Certificate.findOne({ userId, courseId });
  if (!false) {
    // const fileName = `${userName.replace(/\s+/g, "_")}_${courseTitle.replace(/\s+/g, "_")}`;
    const fileName = `${user.name.replace(/\s+/g, "_")}_${course.title.replace(/\s+/g, "_")}`;
    const outputDir = path.join(__dirname, "../certificates");

    const { pdfPath, imgPath } = await generateCertificateFromHTML(
      user.name,
      course.title,
      outputDir
    );

    const newCertificate = new Certificate({
      userId,
      courseId,
      certificateUrl: `https://rat-intent-hideously.ngrok-free.app/certificates/${fileName}.pdf`,
      certificateImageUrl: `https://rat-intent-hideously.ngrok-free.app/certificates/${fileName}.png`,
    });

    await newCertificate.save();
  }
}


    res.status(200).json({ message: "Lesson marked as complete" });
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProgressByCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const progress = await Progress.findOne({
      user: userId,
      course: courseId,
    }).populate("completedLessons");

    if (!progress) {
      return res
        .status(404)
        .json({ error: "Progress not found for the course" });
    }

    const completedCount = progress.completedLessons.length;
    const totalLessons = course.lessons.length || 1;
    const percentage = Math.round((completedCount / totalLessons) * 100);

    res.status(200).json({
      message: "success",
      progress: `${percentage}`,
    });
  } catch (error) {
    console.error("Error getting progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
