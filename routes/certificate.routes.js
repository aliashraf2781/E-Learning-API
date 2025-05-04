const express = require("express");
const router = express.Router();
const Certificate = require("../models/certificate.model");

router.get("/user/:userId", async (req, res) => {
  try {
    const certs = await Certificate.find({ userId: req.params.userId }).populate("courseId");

    const filteredCertificates = certs.map(cert => ({
      _id: cert._id,
      userId: cert.userId,
      courseId: {
        _id: cert.courseId._id,
        title: cert.courseId.title,
        description: cert.courseId.description,
        createdBy: cert.courseId.createdBy,
        category: cert.courseId.category,
        thumbnail: cert.courseId.thumbnail,
        __v: cert.courseId.__v
      },
      certificateUrl: cert.certificateUrl,
        certificateImageUrl: cert.certificateImageUrl,
      issueDate: cert.issueDate,
      __v: cert.__v
    }));

    res.json({
      message: "success",
      certificates: filteredCertificates
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
