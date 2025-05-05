// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 5,
//     maxlength: 100,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 10,
//     maxlength: 500,
//   },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   enrolledStudents: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   quizzes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Quiz",
//     },
//   ],
//   materials: [
//     {
//       type: String,
//     },
//   ],
//   lessons: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Lesson",
//     },
//   ],
// });

// module.exports = mongoose.model("Course", courseSchema);

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  materials: [
    {
      type: String,
    },
  ],
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      
      ref: "Lesson",
    // return the lesson not the lessons id

    
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  category: {
    type: String,
    required: true,
    enum: ["Arabic", "Mathematics", "Science", "English", "Social Studies", "Physics", "Chemistry", "Biology", "Philosophy and Logic", "Psychology and Sociology", "History", "Geography", "Computer Science"],
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
