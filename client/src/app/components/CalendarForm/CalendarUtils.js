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

export function formatDate(date) {
  var split = date.split("-");
  return split[0] + split[1] + split[2];
}

export function revertDate(date) { //20171014
  var yyyy = date.substring(0, 4);
  var mm = date.substring(4, 6);
  var dd = date.substring(6, 8);

  return mm + "/" + dd + "/" + yyyy;
}
