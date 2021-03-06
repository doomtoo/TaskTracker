"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Just structure for a task
 */
var DateTime_1 = require("./DateTime");
var Tools_1 = require("./Tools");
var Task = /** @class */ (function () {
    function Task() {
    }
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
    Task.prototype.SetFromJSONObj = function (obj) {
        Object.assign(this, obj);
        this.Init();
        /*for (var property in obj)
        {
            if (this.hasOwnProperty(property))
            {
                this.pr
            }
        }*/
    };
    Task.prototype.Init = function () {
        this.start_date_time = new DateTime_1.DateTime(this.start_date_time_str);
        if (!Tools_1.Tools.IsNull(this.end_date_time_str))
            this.end_date_time = new DateTime_1.DateTime(this.end_date_time_str);
    };
    /*
    for updating the start/end dates when changing them from the UI, after sending them to mysql
     */
    Task.prototype.SetStartAndEndDateTimeFromMySQL = function (start_date_time_mysql_str, end_date_time_mysql_str) {
        this.start_date_time_str = start_date_time_mysql_str;
        this.end_date_time_str = end_date_time_mysql_str;
        this.start_date_time.SetDateTimeFromMySQL(this.start_date_time_str);
        if (Tools_1.Tools.IsNull(this.end_date_time_str))
            this.end_date_time = null;
        else if (Tools_1.Tools.IsNull(this.end_date_time) || this.end_date_time === null)
            this.end_date_time = new DateTime_1.DateTime(this.end_date_time_str);
        else
            this.end_date_time.SetDateTimeFromMySQL(this.end_date_time_str);
    };
    Task.prototype.SetEndDateTimeFromMySQL = function (end_date_time_mysql_str) {
        this.end_date_time_str = end_date_time_mysql_str;
        if (!Tools_1.Tools.IsNull(end_date_time_mysql_str)) {
            if (Tools_1.Tools.IsNull(this.end_date_time) || this.end_date_time === null)
                this.end_date_time = new DateTime_1.DateTime(this.end_date_time_str);
            else
                this.end_date_time.SetDateTimeFromMySQL(this.end_date_time_str);
        }
    };
    Task.prototype.SetStartDateTimeFromMySQL = function (start_date_time_mysql_str) {
        this.start_date_time_str = start_date_time_mysql_str;
        console.log("SetStartDateTimeFromMySQL: " + start_date_time_mysql_str + " this.start_date_time: " + this.start_date_time + ", str: " + this.start_date_time_str + ", ==null? :" + (this.start_date_time == null));
        if (Tools_1.Tools.IsNull(this.start_date_time))
            this.start_date_time = new DateTime_1.DateTime(this.start_date_time_str);
        else
            this.start_date_time.SetDateTimeFromMySQL(this.start_date_time_str);
    };
    return Task;
}());
exports.Task = Task;
/*
The actual class to handle Everything involved with tasks-
 */
var TaskHandler = /** @class */ (function () {
    function TaskHandler() {
    }
    /*
    For when the "create task" button has been clicked.
    Should verify all fields are filled out correctly, then grab values and submit it to function below
     */
    TaskHandler.prototype.CreateTaskFromUI = function () {
    };
    TaskHandler.prototype.CreateTask = function () {
    };
    TaskHandler.prototype.GetAllTasks = function () {
    };
    TaskHandler.prototype.GetTasks = function (start_date_time, end_date_time) {
    };
    return TaskHandler;
}());
exports.TaskHandler = TaskHandler;
//# sourceMappingURL=Tasks.js.map