export function convertMonth(date) {
    if(date.substring(0,2) === "01") {
        return "January ";
    }
    else if(date.substring(0,2) === "02") {
        return "February ";
    }
    else if(date.substring(0,2) === "03") {
        return "March ";
    }
    else if(date.substring(0,2) === "04") {
        return "April ";
    }
    else if(date.substring(0,2) === "05") {
        return "May ";
    }
    else if(date.substring(0,2) === "06") {
        return "June ";
    }
    else if(date.substring(0,2) === "07") {
        return "July ";
    }
    else if(date.substring(0,2) === "08") {
        return "August ";
    }
    else if(date.substring(0,2) === "09") {
        return "September ";
    }
    else if(date.substring(0,2) === "10") {
        return "October ";
    }
    else if(date.substring(0,2) === "11") {
        return "November ";
    }
    else if(date.substring(0,2) === "12") {
        return "December ";
    }
    else {
        return date;
    }
}