const fs = require('fs');

module.exports = {
    
    makeLecDir: function(dir){
        var sec = 0;
        var strSec = "00";
        var min = 0;
        var minStr = "00";
    
        while(min < 100 && fs.existsSync(dir)){
            sec = 0;
            while(sec < 100 && fs.existsSync(dir)){
                strSec = sec.toString();
                if(sec < 10){
                    strSec = "0" + strSec;
                }
                dir = dir.substring(0, dir.length - 6) + minStr + "-" + strSec + '/';
                sec++;
            }
            min++;
            minStr = min.toString();
            if(min < 10){
                minStr = "0" + minStr;
            }
        }
    
        if(min === 100 && sec === 100 && fs.existsSync(dir)){
            throw new Error('only 10,000 lectures allowed per day per course');
        }
    
        fs.mkdirSync(dir);
        return dir;
    }
}

