"use strict";

const fetch = require("node-fetch");
const co = require("co");

function request(route) {
  const requestUrl = encodeURI(`http://lv-media:5000/${route}`);
  return co(function* () {
    const response = yield fetch(requestUrl, "GET", {
      "Content-Type": "application/json"
    });
    const status = response.status;
    const data = yield response.json();
    if (data.error) {
      let err = new Error(data.error);
      err.status = status == 404 ? 404 : 500;
      throw err;
    }
    return data;
  });
}

function getLectures(courseId) {
  return request(`${courseId}`);
}

function getLectureData(courseId, lectureName) {
  return request(`${courseId}/${lectureName}/data`);
}

module.exports = {
  getLectures,
  getLectureData
};
