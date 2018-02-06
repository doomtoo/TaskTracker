/*
To handle transferring from human readable dates and times to MYSQL compatible ones
 */
import {Tools} from "./Tools";

export class DateTime
{
    //formats are from mySQL format
    public  year:number;
    public  month:number;//1-12
    public  day:number;//1-31

    public  hours:number;// 0-23
    public  mins:number;//0-59
    public  secs:number;//0-59

    public  hours_12hr:number;// 1-12

    public  hours_displayed_12hr:string;// have to add leading 0s + in 12 hr format instead of 24
    public  mins_displayed:string;// have to add leading 0s
    public  hours_AM_OR_PM:string; //whether AM or PM for 24 hr display

    public month_names:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    public date_display:string;//displays date in format: Jan 28 2018
    public time_display:string;//displays time in format: 10 : 09 PM

    public month_display:string; //Jan
    //public day_display:string; //01-31



    public constructor(date_time_mysql_str:string)
    {
        this.SetDateTimeFromMySQL(date_time_mysql_str);
    }
    public SetDateTimeFromMySQL(date_time_mysql_str:string)
    {
        let date_time_arr:string[] = date_time_mysql_str.split(" ");

        let date_mysql:string = date_time_arr[0];
        let time_mysql:string = date_time_arr[1];

        //first do date
        let date_arr:string[] = date_mysql.split("-");
        let year_str:string = date_arr[0];
        this.month_display = date_arr[1];
        let day_str:string = date_arr[2];

        this.day= parseInt(day_str);
        this.month = parseInt(this.month_display);
        this.year = parseInt(year_str);
        //change month from number 1-12 to abr date name
        this.month_display= this.month_names[this.month -1];
        day_str = this.day.toString();//for getting rid of the leading 0

        this.date_display =  this.month_display+" "+ day_str+ " "+year_str;


        //next do time 05:40:06 (starting at 0, ending at 23:59:59 to starting at 1, ending at 12
        let time_arr:string[] = time_mysql.split(":");
        let hour_str:string = time_arr[0];
        let minute_str:string = parseInt(time_arr[1]).toString();

        this.hours= parseInt(hour_str);
        this.mins= parseInt(minute_str);

        //have to add leading 0 to mins
        this.mins_displayed= this.mins.toString();
        if(this.mins_displayed.length<2)
            this.mins_displayed= "0"+this.mins_displayed;

        //let hr_num:number = this.hours;//to go from 0 o clock to 1 o clock AM
        this.hours_12hr = this.hours;

        this.hours_AM_OR_PM = "AM";
        if(this.hours_12hr>11)//AM is 1-11 is AM, 12-11 is PM
        {
            this.hours_AM_OR_PM = "PM";
            this.hours_12hr-=12;
        }
        //for having 0=12 AM
        if(this.hours_12hr==0)
            this.hours_12hr=12;

        this.hours_displayed_12hr = this.hours_12hr.toString();
        if(this.hours_displayed_12hr.length<2)
            this.hours_displayed_12hr= "0"+this.hours_displayed_12hr;

        this.time_display = this.hours_displayed_12hr+" : "+this.mins_displayed+" "+this.hours_AM_OR_PM;

        console.log("SetDateTimeFromMySQL: from date time: "+date_time_mysql_str+", to date time: "+this.date_display+" "+this.time_display);
    }
    /*
    needed for wickedpicker for setting default value
    //should change:
        3 : 00 PM to
        15:00
        12 AM should be 0:00
     */
    public static Get24hrFormatFromReadable(time_readable:string)
    {
        let arr:string[] = time_readable.split(" ");
        //0=hr, 1=:, 2=min, 3=PM
        let hr:number = parseInt(arr[0]);
        let AM:boolean = arr[3]==="AM";

        if(hr===12&&AM)
            hr-=12;

        if(!AM&&hr>12)
            hr+=12;
        return hr+":"+arr[2];
    }

    /*
        find the difference in mins between 2 date times
     */
    public static DifferenceInMins(date_time1:DateTime, date_time2:DateTime)
    {
        //have to convert both date times to Dates, and find the difference in ms
        //https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript

        //new Date(year, month [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
        //month needs to be from 0-11

        let date1:Date = new Date(date_time1.year, date_time1.month, date_time1.day, date_time1.hours, date_time1.mins, 0,0);
        let date2:Date = new Date(date_time2.year, date_time2.month, date_time2.day, date_time2.hours, date_time2.mins, 0,0);

        console.log("going to find the differnce between date2: "+date2+", and date1: "+date1);
        //now difference:
        //https://stackoverflow.com/questions/1968167/difference-between-dates-in-javascript
        let diff_in_ms:number = (date2.getTime()-date1.getTime());

        //convert to s, mins, ect
        let diff_in_s:number = diff_in_ms/1000;

        let diff_in_mins:number = diff_in_s/60;
        let diff_in_hrs:number = diff_in_mins/60;
        console.log("difference in hrs: "+diff_in_hrs);

        let diff_mins_final:number = Math.floor((diff_in_hrs%1)*60);
        let diff_hrs_final:number = Math.floor(diff_in_hrs);

        console.log("DifferenceInMins: Total time difference: "+diff_hrs_final+": "+diff_mins_final);

        return diff_hrs_final+" hrs "+diff_mins_final+" mins";
    }

    /*
    changes date format from:
    Jan 24 2018
    to (MYSQL format)
    2012-06-22 05:40:06

     */
    public static GetDateForMySQLFromReadable(date:string)
    {
        let date_split:string[] = date.split(" ");
        let month_name:string = date_split[0];
        let day:string = date_split[1];
        let year:string = date_split[2];



        //https://stackoverflow.com/questions/13566552/easiest-way-to-convert-month-name-to-month-number-in-js-jan-01
        let month_number:string =(new Date(Date.parse(month_name +" 1, 2012")).getMonth()+1).toString();

        if (month_number.length == 1)
            month_number = "0"+month_number;

        console.log("month: "+month_name+", day:"+day+", year: "+year+", month name: "+", month num: "+month_number);

        let mysql_format:string = year+"-"+month_number+"-"+day;
        return mysql_format;
    }
    /*
    changes time format from:
    9 : 11 PM
    to (MYSQL format)
    08:07:14 (HH MM SS)
     */
    public static GetTimeForMySQLFromReadable(time:string)
    {
        time = time.replace(": ", "");
        let time_split:string[] = time.split(" ");

        console.log("time : "+time);

        // time_split[0] =(parseInt(time_split[0])).toString(); //since the time picker is 1am -12pm, but mysql is 0 -24
        let hour:number = parseInt(time_split[0]);

        //for 12 AM, it becomes 0 o clock
        if(time_split[2]==="AM"&&hour==12)
            hour-=12;

        //for any PM's, except 12, add 12hrs to them
        if(time_split[2]==="PM"&&hour!=12)
            hour+=12;

        let hour_str:string = hour.toString();
        if(hour<10)//add leading 0 onto hour
            hour_str="0"+hour;

        if(time_split[1].length==1)//add leading 0 to minute
            time_split[1]="0"+time_split[1];

        let mysql_time = hour_str+":"+time_split[1]+":00";
        console.log("Time for MYSQL: "+mysql_time);

        return mysql_time;
    }

    public static GetDateTimeForMySQLFromReadable(date:string, time:string)
    {
        console.log("GetDateTimeForMySQLFromReadable: "+date+", "+time);
        if(Tools.IsNull(date)||Tools.IsNull(time))
            return null;

        let date_mysql:string = this.GetDateForMySQLFromReadable(date);
        let time_mysql:string = this.GetTimeForMySQLFromReadable(time);

        return date_mysql+" "+time_mysql;
    }
    // mysql format: 2012-06-22 05:40:06
    public static GetDateTimeMySQLFromDate(date:Date)
    {
        let month:string = (date.getMonth()+1).toString();//normally 0-11
        if(month.length==1)//add leading 0 to minute
            month="0"+month;

        let day:string = date.getDate().toString();
        if(day.length==1)//add leading 0
            day="0"+day;

        let hour:string=date.getHours().toString();
        if(hour.length==1)//add leading 0
            hour="0"+hour;

        let mins:string=date.getMinutes().toString();
        if(mins.length==1)//add leading 0
            mins="0"+mins;

        let secs:string=date.getSeconds().toString();
        if(secs.length==1)//add leading 0
            secs="0"+secs;


        let str_date_time_mysql:string = date.getFullYear()+"-"+month+"-"+day+" "+hour+":"+mins+":"+secs;
        return str_date_time_mysql;
    }

    /*
    For gettign the current date/ time for sending to mysql
     */
    public static GetCurrentDateTimeMySQL()
    {
        let date:Date = new Date();
        return this.GetDateTimeMySQLFromDate(date);
    }
}