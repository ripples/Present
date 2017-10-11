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
    courseId: req.params.courseId,
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
  const videoPath = path.join(MEDIA_PATH, info.course.id, info.lectureName, "videoLarge.mp4");
  sendRedirectResponse(videoPath, "video/mp4", res);
});

router.get("/:courseId/:lectureName/images", (req, res, next) => {
  const info = getLectureInfoOrReturn401(req, res);
  mediaApi.getLectureData(info.course.id, info.lectureName)
    .then(data => res.send(data))
    .catch(next);
});

module.exports = router;