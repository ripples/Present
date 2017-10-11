"use strict";

const router = require("express").Router();
const path = require("path");

const mediaApi = require("./mediaApi");

const MEDIA_PATH = path.join("/api", "/media/lecture_viewer");

function sendRedirectResponse(mediaPath, contentType, res) {
  res.setHeader("X-Accel-Redirect", mediaPath);
  res.setHeader("Content-Type", contentType);
  res.end();
}

function getLectureInfoOrReturn401(req, res) {
  const info = {
    courseId: req.params.lis_course_section_sourcedid,
    lectureName: req.params.lectureName,
  };

  if (!info.course) {
    res.sendStatus(401);
  }
  return info;
}

/**
 *  Serves authenticated video data via lv-proxy
 */
router.get("/:courseId/:lectureName/video", (req, res, next) => {
  const info = getLectureInfoOrReturn401(req, res);
  const videoPath = path.join(MEDIA_PATH, info.lis_course_section_sourcedid, info.lectureName, "videoLarge.mp4");
  sendRedirectResponse(videoPath, "video/mp4", res);
});

module.exports = router;