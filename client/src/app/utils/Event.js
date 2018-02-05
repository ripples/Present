export default class Event {
  constructor(courseId, title, start, end, description, location, summary, hexColor){
    this.courseId = courseId;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.location = location;
    this.summary = summary;
    this.hexColor = hexColor;
  }
}
