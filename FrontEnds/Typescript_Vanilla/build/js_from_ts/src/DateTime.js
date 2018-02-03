"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
To handle transferring from human readable dates and times to MYSQL compatible ones
 */
var DateTime = /** @class */ (function () {
    //public day_display:string; //01-31
    function DateTime(date_time_mysql_str) {
        this.month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.SetDateTimeFromMySQL(date_time_mysql_str);
    }
    DateTime.prototype.SetDateTimeFromMySQL = function (date_time_mysql_str) {
        var date_time_arr = date_time_mysql_str.split(" ");
        var date_mysql = date_time_arr[0];
        var time_mysql = date_time_arr[1];
        //first do date
        var date_arr = date_mysql.split("-");
        var year_str = date_arr[0];
        this.month_display = date_arr[1];
        var day_str = date_arr[2];
        this.day = parseInt(day_str);
        this.month = parseInt(this.month_display);
        this.year = parseInt(year_str);
        //change month from number 1-12 to abr date name
        this.month_display = this.month_names[this.month - 1];
        day_str = this.day.toString(); //for getting rid of the leading 0
        this.date_display = this.month_display + " " + day_str + " " + year_str;
        //next do time 05:40:06 (starting at 0, ending at 23:59:59 to starting at 1, ending at 12
        var time_arr = time_mysql.split(":");
        var hour_str = time_arr[0];
        var minute_str = parseInt(time_arr[1]).toString();
        this.hours = parseInt(hour_str);
        this.mins = parseInt(minute_str);
        var hr_num = this.hours + 1; //to go from 0 o clock to 1 o clock
        this.hours_12hr = hr_num;
        this.hours_AM_OR_PM = "AM";
        if (hr_num > 11) {
            this.hours_AM_OR_PM = "PM";
            hr_num -= 12;
        }
        hour_str = hr_num.toString();
        this.time_display = hour_str + ":" + minute_str + " " + this.hours_AM_OR_PM;
    };
    /*
        find the difference in mins between 2 date times
     */
    DateTime.DifferenceInMins = function (date_time1, date_time2) {
        //have to convert both date times to Dates, and find the difference in ms
        //https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
        //new Date(year, month [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
        //month needs to be from 0-11
        var date1 = new Date(date_time1.year, date_time1.month, date_time1.day, date_time1.hours, date_time1.mins, 0, 0);
        var date2 = new Date(date_time2.year, date_time2.month, date_time2.day, date_time2.hours, date_time2.mins, 0, 0);
        //now difference:
        //https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
        var diff_in_ms = (date1.getTime() - date2.getTime());
        //convert to s, mins, ect
        var diff_in_s = diff_in_ms / 1000;
        var diff_in_mins = diff_in_s / 60;
        var diff_in_hrs = diff_in_mins / 60;
        var diff_mins_final = Math.round((diff_in_hrs % 1) * 60);
        var diff_hrs_final = Math.round(diff_in_hrs);
        console.log("Total time difference: " + diff_hrs_final + ": " + diff_mins_final);
    };
    return DateTime;
}());
exports.DateTime = DateTime;
//# sourceMappingURL=DateTime.js.map