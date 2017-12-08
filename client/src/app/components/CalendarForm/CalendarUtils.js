import _ from 'underscore';
import moment from 'moment';

export function getCurrentSemester(){
  var year = new Date().getFullYear().toString().substr(-2);
  var curMonth = new Date().getMonth(); //Jan:0, May=4, Aug=7, Dec=11, 1-3, 5-6, 8-10
  var curDay = new Date().getDate();
  var semester = "";
  switch(curMonth){
    case 0:
      (curDay < 21) ? semester = "WINTER" : semester = "SPRING";
      break;
    case 4:
      (curDay < 17) ? semester = "SPRING" : semester = "SUMMER";
      break;
    case 7:
      (curDay < 24) ? semester = "SUMMER" : semester = "FALL";
      break;
    case 11:
      (curDay < 22) ? semester = "FALL" : semester = "WINTER";
      break;
    default:
      (curMonth >= 1 && curMonth <= 3) ? semester = "SPRING" : (curMonth >= 5 && curMonth <= 6) ? semester = "SUMMER" : semester = "FALL";
      break;
  }
  return semester + year;
}

export function getEventDT(date, time){
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = parseInt(time.substring(1, 3), 10);
  let min = parseInt(time.substring(3, 5), 10);
  let sec = parseInt(time.substring(5, 7), 10);
  return new Date(year, month, day, hour, min, sec);
}

export function processEvents(events){ //Converts the JSON representation of the start/end times of each event from server into JS Date objects (required by calendar component for reading).
  let processedEvents = [];
  for (let event of events){
    let start = event.start;
    let end = event.end;
    event.start = new Date(start);
    event.end = new Date(end);
    processedEvents.push(event);
  }
  return processedEvents;
}

export function deepCopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

export function formatTime(time){
  var split = time.split(":");
  return 'T' + split[0] + split[1] + '00Z'
}

export function formatDate(date) {
  var split = date.split("-");
  return split[0] + split[1] + split[2];
}

export function isValidDate(str){
  var regex = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/
  if(regex.test(str) && moment(str, "MDY").isValid()){
    return true;
  }
  else{
    return false;
  }
}

export function revertDate(date) { //20171014
  var yyyy = date.substring(0, 4);
  var mm = date.substring(4, 6);
  var dd = date.substring(6, 8);

  return mm + "/" + dd + "/" + yyyy;
}

export function isEqual(array1, array2){
	if(array1.length !== array2.length){
  	return false;
  }
  else{
    for(let event of array1){
      var found = false;
      for(let e2 of array2){
        if(found){break;}
        if(_.isEqual(event, e2)){
          found = true;
        }
      }
      if(!found){return false;}
    }
    return true;
  }
}
