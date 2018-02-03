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
        //have to add leading 0 to mins
        this.mins_displayed = this.mins.toString();
        if (this.mins_displayed.length < 2)
            this.mins_displayed = "0" + this.mins_displayed;
        //let hr_num:number = this.hours;//to go from 0 o clock to 1 o clock AM
        this.hours_12hr = this.hours;
        this.hours_AM_OR_PM = "AM";
        if (this.hours_12hr > 11) {
            this.hours_AM_OR_PM = "PM";
            this.hours_12hr -= 12;
        }
        //for having 0=12 AM
        if (this.hours_12hr == 0)
            this.hours_12hr = 12;
        this.hours_displayed_12hr = this.hours_12hr.toString();
        if (this.hours_displayed_12hr.length < 2)
            this.hours_displayed_12hr = "0" + this.hours_displayed_12hr;
        this.time_display = this.hours_displayed_12hr + " : " + this.mins_displayed + " " + this.hours_AM_OR_PM;
        console.log("SetDateTimeFromMySQL: from date time: " + date_time_mysql_str + ", to date time: " + this.date_display + " " + this.time_display);
    };
    /*
    needed for wickedpicker for setting default value
    //should change:
        3 : 00 PM to
        15:00
        12 AM should be 0:00
     */
    DateTime.Get24hrFormatFromReadable = function (time_readable) {
        var arr = time_readable.split(" ");
        //0=hr, 1=:, 2=min, 3=PM
        var hr = parseInt(arr[0]);
        var AM = arr[3] === "AM";
        if (hr === 12 && AM)
            hr -= 12;
        if (!AM && hr > 12)
            hr += 12;
        return hr + ":" + arr[2];
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
        console.log("going to find the differnce between date2: " + date2 + ", and date1: " + date1);
        //now difference:
        //https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
        var diff_in_ms = (date2.getTime() - date1.getTime());
        //convert to s, mins, ect
        var diff_in_s = diff_in_ms / 1000;
        var diff_in_mins = diff_in_s / 60;
        var diff_in_hrs = diff_in_mins / 60;
        console.log("difference in hrs: " + diff_in_hrs);
        var diff_mins_final = Math.floor((diff_in_hrs % 1) * 60);
        var diff_hrs_final = Math.floor(diff_in_hrs);
        console.log("DifferenceInMins: Total time difference: " + diff_hrs_final + ": " + diff_mins_final);
        return diff_hrs_final + " hrs " + diff_mins_final + " mins";
    };
    /*
    changes date format from:
    Jan 24 2018
    to (MYSQL format)
    2012-06-22 05:40:06

     */
    DateTime.GetDateForMySQLFromReadable = function (date) {
        var date_split = date.split(" ");
        var month_name = date_split[0];
        var day = date_split[1];
        var year = date_split[2];
        //https://stackoverflow.com/questions/13566552/easiest-way-to-convert-month-name-to-month-number-in-js-jan-01
        var month_number = (new Date(Date.parse(month_name + " 1, 2012")).getMonth() + 1).toString();
        if (month_number.length == 1)
            month_number = "0" + month_number;
        console.log("month: " + month_name + ", day:" + day + ", year: " + year + ", month name: " + ", month num: " + month_number);
        var mysql_format = year + "-" + month_number + "-" + day;
        return mysql_format;
    };
    /*
    changes time format from:
    9 : 11 PM
    to (MYSQL format)
    08:07:14 (HH MM SS)
     */
    DateTime.GetTimeForMySQLFromReadable = function (time) {
        time = time.replace(": ", "");
        var time_split = time.split(" ");
        console.log("time : " + time);
        // time_split[0] =(parseInt(time_split[0])).toString(); //since the time picker is 1am -12pm, but mysql is 0 -24
        var hour = parseInt(time_split[0]);
        //for 12 AM, it becomes 0 o clock
        if (time_split[2] === "AM" && hour == 12)
            hour -= 12;
        //for any PM's, except 12, add 12hrs to them
        if (time_split[2] === "PM" && hour != 12)
            hour += 12;
        var hour_str = hour.toString();
        if (hour < 10)
            hour_str = "0" + hour;
        if (time_split[1].length == 1)
            time_split[1] = "0" + time_split[1];
        var mysql_time = hour_str + ":" + time_split[1] + ":00";
        console.log("Time for MYSQL: " + mysql_time);
        return mysql_time;
    };
    DateTime.GetDateTimeForMySQLFromReadable = function (date, time) {
        var date_mysql = this.GetDateForMySQLFromReadable(date);
        var time_mysql = this.GetTimeForMySQLFromReadable(time);
        return date_mysql + " " + time_mysql;
    };
    return DateTime;
}());
exports.DateTime = DateTime;
//# sourceMappingURL=DateTime.js.map