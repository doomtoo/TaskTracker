"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Just structure for a task
 */
var DateTime_1 = require("./DateTime");
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
        if (this.end_date_time_str != null)
            this.end_date_time = new DateTime_1.DateTime(this.end_date_time_str);
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
//# sourceMappingURL=tasks.js.map