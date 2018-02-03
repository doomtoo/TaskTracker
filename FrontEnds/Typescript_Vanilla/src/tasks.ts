/*
Just structure for a task
 */
import {DateTime} from "./DateTime"
import {Tools} from "./Tools";

export class Task
{
    public id:number;
    public user_id:number;
    public task:string;
    public category:string;

    // public start_date:Date;
    // public end_date:Date;
    //
    // public start_time:string;
    // public end_time:string;

    public parent_id:number;

    //for loading from mysql automatically- just a string, not the actual date object
    public start_date_time_str:string;
    public end_date_time_str:string;

    //date time objects
    public start_date_time:DateTime;
    public end_date_time:DateTime|null;

    //the date-time as a string to be displayed in browser in readable format (Jan 28 2016, 6:22pm)
    // public start_date_display_str:string;
    // public end_date_display_str:string;
    // public start_time_display_str:string;
    // public end_time_display_str:string;
    //
    // public month_names:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //
    // public time_difference_s:number;//the time difference between the two dates and the time


    /*
    We should setup all the properties from mysql here
     */
    public SetFromJSONObj(obj:Object)
    {
        Object.assign(this, obj);
        this.Init();
        /*for (var property in obj)
        {
            if (this.hasOwnProperty(property))
            {
                this.pr
            }
        }*/
    }
    private Init()
    {
        this.start_date_time = new DateTime(this.start_date_time_str);

        if(this.end_date_time_str!=null)//since the task could be unfinished/ no end date yet
            this.end_date_time = new DateTime(this.end_date_time_str);
    }
    /*
    for updating the start/end dates when changing them from the UI, after sending them to mysql
     */
    public SetStartAndEndDateTimeFromMySQL(start_date_time_mysql_str:string, end_date_time_mysql_str:string)
    {
        this.start_date_time_str=start_date_time_mysql_str;
        this.end_date_time_str=end_date_time_mysql_str;

        this.start_date_time.SetDateTimeFromMySQL(this.start_date_time_str);

        if(this.end_date_time_str==null)//since the task could be unfinished/ no end date yet
            this.end_date_time=null;
        else if(this.end_date_time==null)
            this.end_date_time = new DateTime(this.end_date_time_str);
        else
            this.end_date_time.SetDateTimeFromMySQL(this.end_date_time_str);
    }
    public SetStartDateTimeFromMySQL(start_date_time_mysql_str:string)
    {
        this.start_date_time_str=start_date_time_mysql_str;

        console.log("SetStartDateTimeFromMySQL: "+start_date_time_mysql_str+" this.start_date_time: "+this.start_date_time+", str: "+this.start_date_time_str+", ==null? :"+(this.start_date_time==null));

        if(Tools.IsNull(this.start_date_time))
            this.start_date_time = new DateTime(this.start_date_time_str);
        else
            this.start_date_time.SetDateTimeFromMySQL(this.start_date_time_str);
    }

    /*
    for getting the date and time strings from the mysql strings
     */
    /*public GetDateAndTimeFromMySQL()
    {
        //change from mySQL datetime string to human readable
        //from: 2012-06-22 05:40:06
        //to: (Jan 28 2016, 6:22pm)

        //-----------------for start date
        let date_time_start_arr:string[] = this.ConvertMySQLDateTimeToDisplayDateTime(this.start_date_time_str);
        this.start_date_display_str = date_time_start_arr[0];
        this.start_time_display_str = date_time_start_arr[1];


        if(this.end_date_time_str!=null &&this.end_date_time_str.length>0)
        {
            let date_time_end_arr:string[] = this.ConvertMySQLDateTimeToDisplayDateTime(this.end_date_time_str);
            this.end_date_display_str = date_time_end_arr[0];
            this.end_time_display_str = date_time_end_arr[1];
        }
        console.log("GetDateAndTimeFromMySQL formatted strings: \nStart date-time: "+this.start_date_display_str+" "+this.start_time_display_str+"\nEnd date-time: "+this.end_date_display_str+" "+this.end_time_display_str);
    }*/
    /*
    sets the time_difference_s variable from the date ranges
     */
    /*public GetDateTimeDifferenceFromMySQL()
    {
        //going to use the mysql strings to get the date/ time difference
        //just going to use the date object to get the s in difference between the 2 dates

    }*/
    /*public ConvertMySQLDateTimeToDisplayDateTime(date_time_mysql_str:string)
    {
        let date_time_arr:string[] = date_time_mysql_str.split(" ");

        let date_mysql:string = date_time_arr[0];
        let time_mysql:string = date_time_arr[1];

        //first do date
        let date_arr:string[] = date_mysql.split("-");
        let year:string = date_arr[0];
        let month:string = date_arr[1];
        let day:string = date_arr[2];

        //change month from number 1-12 to abr date name
        month= this.month_names[parseInt(month)-1];
        day = parseInt(day).toString();//for getting rid of the leading 0

        let date_display =  month+" "+ day+ " "+year;

        //next do time 05:40:06 (starting at 0, ending at 23:59:59 to starting at 1, ending at 12
        let time_arr:string[] = time_mysql.split(":");
        let hour:string = date_arr[0];
        let minute:string = parseInt(date_arr[1]).toString();

        let hr_num:number = parseInt(hour)+1;//to go from 0 o clock to 1 o clock
        let time_extra:string = "AM";
        if(hr_num>11)
        {
            time_extra = "PM";
            hr_num-=12;
        }
        hour = hr_num.toString();

        let time_display:string = hr_num+" "+minute+" "+time_extra;

        return [date_display, time_display];
    }*/
}
/*
The actual class to handle Everything involved with tasks-
 */
export class TaskHandler
{
    /*
    For when the "create task" button has been clicked.
    Should verify all fields are filled out correctly, then grab values and submit it to function below
     */
    CreateTaskFromUI()
    {

    }
    CreateTask()
    {

    }

    GetAllTasks()
    {

    }
    GetTasks(start_date_time:Date, end_date_time:Date)
    {

    }


}
