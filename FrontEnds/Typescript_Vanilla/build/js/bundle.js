/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 122);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
To handle transferring from human readable dates and times to MYSQL compatible ones
 */
var Tools_1 = __webpack_require__(2);
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
        console.log("GetDateTimeForMySQLFromReadable: " + date + ", " + time);
        if (Tools_1.Tools.IsNull(date) || Tools_1.Tools.IsNull(time))
            return null;
        var date_mysql = this.GetDateForMySQLFromReadable(date);
        var time_mysql = this.GetTimeForMySQLFromReadable(time);
        return date_mysql + " " + time_mysql;
    };
    // mysql format: 2012-06-22 05:40:06
    DateTime.GetDateTimeMySQLFromDate = function (date) {
        var month = (date.getMonth() + 1).toString(); //normally 0-11
        if (month.length == 1)
            month = "0" + month;
        var day = date.getDate().toString();
        if (day.length == 1)
            day = "0" + day;
        var hour = date.getHours().toString();
        if (hour.length == 1)
            hour = "0" + hour;
        var mins = date.getMinutes().toString();
        if (mins.length == 1)
            mins = "0" + mins;
        var secs = date.getSeconds().toString();
        if (secs.length == 1)
            secs = "0" + secs;
        var str_date_time_mysql = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + mins + ":" + secs;
        return str_date_time_mysql;
    };
    /*
    For gettign the current date/ time for sending to mysql
     */
    DateTime.GetCurrentDateTimeMySQL = function () {
        var date = new Date();
        return this.GetDateTimeMySQLFromDate(date);
    };
    return DateTime;
}());
exports.DateTime = DateTime;


/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI_1 = __webpack_require__(123);
var Tasks_1 = __webpack_require__(126);
// import * as Moment from "moment";
var DateTime_1 = __webpack_require__(1);
var Tools_1 = __webpack_require__(2);
var Config_1 = __webpack_require__(127);
;
var MainObj = /** @class */ (function () {
    // public tools:Tools= new Tools();//just for acessing from JS
    function MainObj() {
        this.ui = new UI_1.UI();
        this.task_handler = new Tasks_1.TaskHandler();
        this.logged_in = false;
        //have to cast to string, because localstorage could return a string or null, which throws an error
        this.id = localStorage.getItem("id");
        this.auth_key = localStorage.getItem("auth_key");
        if (this.id == null) {
            console.log("could not load previous session");
            this.ui.ShowLogin();
        }
        else {
            console.log("Loaded previous session!");
            this.LoggedIn();
        }
        this.SetupEnterHandling();
    }
    /*
    For doing Ajax calls to the server
     */
    MainObj.prototype.AjaxCall = function (success_to_call, error_to_call, data_to_send_obj) {
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        this.ui.LoaderVisible(true);
        console.log("AjaxCall: going to send: obj:" + JSON.stringify(data_to_send_obj) + ", to page: " + Config_1.Config.BACKEND_URL);
        $.ajax({
            type: 'POST',
            url: Config_1.Config.BACKEND_URL,
            crossDomain: true,
            data: data_to_send_obj,
            // dataType: 'json',
            dataType: 'text',
            //jsonp: false, //I added jsonp- by default returns cross origin requests as jsonp istead of json
            success: function (responseData, textStatus, jqXHR) {
                self.ui.LoaderVisible(false);
                console.log("AJAXCALL: responseData: " + responseData);
                var json_obj = JSON.parse(responseData);
                if (json_obj.type === "error") {
                    error_to_call(json_obj);
                }
                else if (json_obj.type === "success") {
                    success_to_call(json_obj);
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
                self.ui.LoaderVisible(false);
            }
        });
    };
    /*
    so they can hit enter in the pwd field to login/register
     */
    MainObj.prototype.SetupEnterHandling = function () {
        var self = this;
        //have to add [0] to access the DOM element- without it it accesses just the jquery wrapper object
        $("#login_pwd")[0].addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                self.Login();
            }
        });
        $("#register_pwd")[0].addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                self.Register();
            }
        });
    };
    /*
    For registering a new user- get the email address, password, and attempt to register
     */
    MainObj.prototype.Register = function () {
        //have to cast as any to get typescript to ignore that jquery.val may return undefined, and errors out
        var email = Tools_1.Tools.SanitizeInput($("#register_email").val());
        var pwd = Tools_1.Tools.SanitizeInput($("#register_pwd").val());
        console.log("Register: email and pwd entered: " + email + ", " + pwd);
        //so lets check the input first, and provide an error if something was wrong/ they didn't enter both inputs
        //now lets try to submit these to the php page, and get whether they were registered successfully
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "register";
        data_to_send_obj.email = email;
        data_to_send_obj.password = pwd;
        //NOTE: if you try to send  JSON object, it just sends the string as a key, and no value, so have to send the actual object, which it assumably stringifies again
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_SUCCESS);
            self.ui.ShowLogin();
            //should also fill in the email address and clear the password if needed
            $("#login_email").val(email);
            $("#login_pwd").val("");
            //and clear the register boxes
            $("#register_email").val("");
            $("#register_pwd").val("");
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    MainObj.prototype.Login = function () {
        var email = Tools_1.Tools.SanitizeInput($("#login_email").val());
        var pwd = Tools_1.Tools.SanitizeInput($("#login_pwd").val());
        //clear password
        $("#login_pwd").val("");
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "login";
        data_to_send_obj.email = email;
        data_to_send_obj.password = pwd;
        //NOTE: if you try to send  JSON object, it just sends the string as a key, and no value, so have to send the actual object, which it assumably stringifies again
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            //clear the email input too:
            $("#login_email").val("");
            //so store the id and auth key, and bring up the logged in interface
            self.StoreLogin(json_obj.id, json_obj.token);
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    MainObj.prototype.LogOut = function () {
        this.id = null;
        this.auth_key = null;
        localStorage.removeItem("id");
        localStorage.removeItem("auth_key");
        this.ui.ShowLogin();
    };
    MainObj.prototype.StoreLogin = function (id, auth_key) {
        this.id = id;
        this.auth_key = auth_key;
        //save to localstorage, so we can stay logged in on browser refresh
        localStorage.setItem("id", id);
        localStorage.setItem("auth_key", auth_key);
        // console.log("StoreLogin Ran, this is: "+this.constructor.name);
        this.LoggedIn();
    };
    MainObj.prototype.LoggedIn = function () {
        //so hide login/ register data, and show the task tracker interface
        this.ui.ShowTaskTracker();
        this.GetTasksMySQLDates(null, null);
    };
    MainObj.prototype.SubmitTask = function () {
        //hide the AddTaskForm and Show the AddTaskButton again
        this.ui.ShowAddTaskBtn();
        //first get all the fields
        var task = Tools_1.Tools.SanitizeInput($("#new_task_name").val());
        var category = Tools_1.Tools.SanitizeInput($("#new_task_category").val());
        var start_date = $("#task_start_date").val(); //Jan 24 2018
        var start_time = $("#task_start_time").val(); //8 : 25 PM
        var date_mysql = DateTime_1.DateTime.GetDateForMySQLFromReadable(start_date);
        var time_mysql = DateTime_1.DateTime.GetTimeForMySQLFromReadable(start_time);
        var date_time_mysql = date_mysql + " " + time_mysql;
        //now send it to php
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "AddTask";
        data_to_send_obj.user_id = this.id;
        data_to_send_obj.auth_key = this.auth_key;
        data_to_send_obj.task = task;
        data_to_send_obj.category = category;
        data_to_send_obj.date_time = date_time_mysql;
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_SUCCESS);
            var task_id = parseInt(json_obj.id);
            console.log("got back new task id: " + task_id);
            //clear the form
            $("#new_task_name").val("");
            $("#new_task_category").val("");
            //add the task to our tasks array
            var task = new Tasks_1.Task();
            task.id = task_id;
            task.task = data_to_send_obj.task;
            task.category = data_to_send_obj.category;
            task.SetStartDateTimeFromMySQL(data_to_send_obj.date_time);
            self.tasks[task_id] = task;
            //add the task to our UI
            self.AddTask(task);
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    MainObj.prototype.EditTask = function (edit_btn) {
        console.log("Edit task called from element: " + edit_btn + ", \njson:" + JSON.stringify(edit_btn) + "\nclass: " + edit_btn.classList);
        //should be able to get the attribute this way:
        var task_id = parseInt(edit_btn.getAttribute("data-task-id"));
        console.log("task id: " + task_id);
        //first should make sure task edit is not already displayed underneath this- otherwise we should remove it/ hide it (removing it might be better)
        var existing_task_edit = $("#task-" + task_id).find(".tasks_edit");
        if (existing_task_edit.length) {
            //remove it and return;
            existing_task_edit.remove();
            return;
        }
        //so now lets unhide the edit task area (put it under this task), and populate the values
        var task_edit = $("#tasks_edit").clone(true);
        // task_edit.removeAttr("id");//remove id from it
        task_edit.css("display", "block");
        task_edit.attr("id", "task-edit-" + task_id);
        task_edit.appendTo("#task-" + task_id);
        //add task id to close btn to be able to close this
        task_edit.find(".btn-close-task").attr("data-task-id", task_id);
        task_edit.find(".btn-delete-task").attr("data-task-id", task_id);
        task_edit.find(".btn-update-task").attr("data-task-id", task_id);
        //now populate in all the task info:
        //have to grab the task object
        var task = this.tasks[task_id];
        task_edit.find(".task-input-name").val(Tools_1.Tools.UnSanitizeInput(task.task));
        task_edit.find(".task-input-category").val(Tools_1.Tools.UnSanitizeInput(task.category));
        task_edit.find(".task-input-start-date").val(task.start_date_time.date_display);
        task_edit.find(".task-input-start-time").val(task.start_date_time.time_display);
        if (task.end_date_time != null) {
            task_edit.find(".task-input-end-date").val(task.end_date_time.date_display);
            task_edit.find(".task-input-end-time").val(task.end_date_time.time_display);
        }
        //also have to set the time and date fields to be able to use the date and time javascript libraries for nice UI
        //NOTE: this will reset the time/ date to the current value
        this.ui.WireUpDate(task_edit.find(".task-input-start-date"), false);
        this.ui.WireUpTime(task_edit.find(".task-input-start-time"), false);
        this.ui.WireUpDate(task_edit.find(".task-input-end-date"), false);
        this.ui.WireUpTime(task_edit.find(".task-input-end-time"), false);
    };
    MainObj.prototype.CloseEditTask = function (btn_close) {
        var task_id = parseInt(btn_close.getAttribute("data-task-id"));
        var existing_task_edit = $("#task-" + task_id).find(".tasks_edit");
        if (existing_task_edit.length) {
            //remove it and return;
            existing_task_edit.remove();
        }
    };
    /*
    For finishing the task just clicking on the button- to finish it quick witht he current date/ time
     */
    MainObj.prototype.FinishTask = function (btn_clicked) {
        //first get which task it was
        var task_id = parseInt(btn_clicked.getAttribute("data-task-id"));
        //now convert readable dates and times to mysql compatible ones
        var date_time_mysql_end = DateTime_1.DateTime.GetCurrentDateTimeMySQL();
        //now send it to php
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "FinishTask";
        data_to_send_obj.user_id = this.id;
        data_to_send_obj.auth_key = this.auth_key;
        data_to_send_obj.task_id = task_id;
        data_to_send_obj.date_time_end = date_time_mysql_end;
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            //so now update the task object in the array we already have with the update, then tell the UI to update that task
            self.tasks[task_id].task = data_to_send_obj.task_name;
            self.tasks[task_id].SetEndDateTimeFromMySQL(data_to_send_obj.date_time_end);
            //then tell main this task needs to be updated in the UI
            self.SetTaskUIFromTask($("#task-" + task_id), self.tasks[task_id]);
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    MainObj.prototype.UpdateTask = function (btn_update_task) {
        //first get which task it was
        var task_id = parseInt(btn_update_task.getAttribute("data-task-id"));
        //then get all the values from the inputs
        //grab the edit window
        var task_edit_window = $("#task-edit-" + task_id);
        //lets check if we actually foudn the window:
        // console.log("")
        var task_name = Tools_1.Tools.SanitizeInput(task_edit_window.find(".task-input-name").val());
        var task_category = Tools_1.Tools.SanitizeInput(task_edit_window.find(".task-input-category").val());
        var task_date_start_str = task_edit_window.find(".task-input-start-date").val();
        var task_time_start_str = task_edit_window.find(".task-input-start-time").val();
        var task_date_end_str = task_edit_window.find(".task-input-end-date").val();
        var task_time_end_str = task_edit_window.find(".task-input-end-time").val();
        //not working corrrectly
        console.log("going to submit update task with values: \n" + task_name + "\n" + task_category + "\n" + task_date_start_str + "\n" + task_time_start_str + "\n" + task_date_end_str + "\n" + task_time_end_str);
        //now convert readable dates and times to mysql compatible ones
        var date_time_mysql_start = DateTime_1.DateTime.GetDateTimeForMySQLFromReadable(task_date_start_str, task_time_start_str);
        var date_time_mysql_end = DateTime_1.DateTime.GetDateTimeForMySQLFromReadable(task_date_end_str, task_time_end_str);
        if (Tools_1.Tools.IsNull(date_time_mysql_end))
            date_time_mysql_end = "NULL";
        //now send it to php
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "UpdateTask";
        data_to_send_obj.user_id = this.id;
        data_to_send_obj.auth_key = this.auth_key;
        data_to_send_obj.task_id = task_id;
        data_to_send_obj.task_name = task_name;
        data_to_send_obj.category = task_category;
        data_to_send_obj.date_time_start = date_time_mysql_start;
        data_to_send_obj.date_time_end = date_time_mysql_end;
        data_to_send_obj.parent_id = null;
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            //so now update the task object in the array we already have with the update, then tell the UI to update that task
            self.tasks[task_id].task = data_to_send_obj.task_name;
            self.tasks[task_id].category = data_to_send_obj.category;
            self.tasks[task_id].SetStartAndEndDateTimeFromMySQL(data_to_send_obj.date_time_start, data_to_send_obj.date_time_end);
            //remove the edit area
            task_edit_window.remove();
            //then tell main this task needs to be updated in the UI
            self.SetTaskUIFromTask($("#task-" + task_id), self.tasks[task_id]);
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    /*
    For adding a new task in the UI from being sent a task object
     */
    MainObj.prototype.AddTask = function (task) {
        var task_prototype = $("#task_displayed_protoType").clone(true);
        task_prototype.css("display", "block");
        task_prototype.removeAttr("id");
        //should sort them into unfinished tasks vs. finished tasks
        if (task.end_date_time != null)
            //task_prototype.prependTo("#tasks_container_date_range");//prepend- so they are organized by date/ most recent
            task_prototype.appendTo("#tasks_container_date_range");
        else
            // task_prototype.prependTo("#tasks_container_unfinished");
            task_prototype.appendTo("#tasks_container_unfinished");
        //add the id to it, so we can fetch it easily
        task_prototype.attr("id", "task-" + task.id);
        this.SetTaskUIFromTask(task_prototype, task);
    };
    /*
    Universal for setting a task UI from a task object- both for updating and for new ones
     */
    MainObj.prototype.SetTaskUIFromTask = function (task_ui, task) {
        //now change out the tag values
        task_ui.find(".task_displayed_name").html(Tools_1.Tools.UnSanitizeInput(task.task));
        task_ui.find(".task_displayed_category").html("(" + Tools_1.Tools.UnSanitizeInput(task.category) + ")");
        task_ui.find(".task_displayed_start").html("Start: " + task.start_date_time.date_display + ",  " + task.start_date_time.time_display);
        if (!Tools_1.Tools.IsNull(task.end_date_time_str)) {
            task_ui.find(".task_displayed_end").html(("<br/>End: " + task.end_date_time.date_display + ",  " + task.end_date_time.time_display));
            task_ui.find(".btn-finish-task").css("display", "none"); //hide end task button
        }
        else {
            task_ui.find(".btn-finish-task").css("display", "block"); //hide end task button
            task_ui.find(".task_displayed_end").html("(Task not finished) ");
        }
        //also store the task id on the edit btn:
        task_ui.find(".btn-edit-task").attr("data-task-id", task.id);
        task_ui.find(".btn-finish-task").attr("data-task-id", task.id);
        if (!Tools_1.Tools.IsNull(task.end_date_time_str)) {
            var time_diff = DateTime_1.DateTime.DifferenceInMins(task.start_date_time, task.end_date_time);
            console.log("for task: " + task.task + ", time difference: " + time_diff);
            //put in the total time
            task_ui.find(".task_displayed_total").html("<br/>Total time: " + time_diff);
        }
        else {
            task_ui.find(".task_displayed_total").html("");
        }
    };
    //should be called from class 'btn-delete-task'
    MainObj.prototype.DeleteTask = function (btn_clicked) {
        var self = this;
        var task_id = parseInt(btn_clicked.getAttribute("data-task-id"));
        //should show popup confirmation
        vex.dialog.confirm({
            message: 'Are you sure you want to delete the task ' + self.tasks[task_id].task,
            callback: function (value) {
                if (value)
                    self.DeleteTaskAfterConf(btn_clicked);
            }
        });
        return;
    };
    MainObj.prototype.DeleteTaskAfterConf = function (btn_clicked) {
        //first get which task it was
        var task_id = parseInt(btn_clicked.getAttribute("data-task-id"));
        //then get all the values from the inputs
        //grab the edit window
        var task_edit_window = $("#task-edit-" + task_id);
        //not working corrrectly
        console.log("going to delete task id: " + task_id);
        //now send it to php
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "DeleteTask";
        data_to_send_obj.user_id = this.id;
        data_to_send_obj.auth_key = this.auth_key;
        data_to_send_obj.task_id = task_id;
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            self.tasks.forEach(function (item) { console.log(item.id + ": " + item.task); });
            delete self.tasks[task_id];
            self.tasks.forEach(function (item) { console.log(item.id + ": " + item.task); });
            //also remove the task (and edit area) from the screen
            //so find task id of HTML element and remove it
            $("#task-" + task_id).remove();
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    /*
    Needs to be in mysql date time format like:
    2012-06-22 05:40:06
     */
    MainObj.prototype.GetTasksMySQLDates = function (date_time_start, date_time_end) {
        console.log("GetTasksMySQLDates clicked!");
        //if we pass 2 nulls, we'll just use the default date range
        if (date_time_start == null) {
            //lets do up to 30 days ago by default right now?
            var date_time_ago = new Date();
            date_time_ago.setDate(date_time_ago.getDate() - 30);
            //for adding leading zeroes from: https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
            //-2 gives just the last 2 digits
            var day_num1 = ("0" + date_time_ago.getDate()).slice(-2);
            var month_num1 = ("0" + date_time_ago.getMonth() + 1).slice(-2);
            //have to add 1 to month to change from 0-11 to 1-12
            date_time_start = date_time_ago.getFullYear() + "-" + month_num1 + "-" + day_num1;
            //now add time to it
            date_time_start = date_time_start + " " + "00:00:00";
            console.log("start of the day yesterday: " + date_time_start);
            //now lets do the same for the end of the day
            var date_end_of_day = new Date();
            //adding leading zeroes to day again:
            var day_num2 = ("0" + date_end_of_day.getDate()).slice(-2);
            var month_num2 = ("0" + date_end_of_day.getMonth() + 1).slice(-2);
            //have to add 1 to month to change from 0-11 to 1-12
            date_time_end = date_end_of_day.getFullYear() + "-" + month_num2 + "-" + day_num2;
            //now add time to it
            date_time_end = date_time_end + " " + "23:59:59";
            console.log("end of the day today: " + date_time_end);
        }
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "GetTasks";
        data_to_send_obj.user_id = this.id;
        data_to_send_obj.auth_key = this.auth_key;
        data_to_send_obj.date_time_start = date_time_start;
        data_to_send_obj.date_time_end = date_time_end;
        //now lets submit them to the php page
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        function success(json_obj) {
            if (json_obj.message == "NoResults") {
                console.log("Got no tasks back, empty for what we searched for\nsql: " + json_obj.sql);
            }
            else {
                //go through the tasks, creating new HTML for each one to show
                //should have two types- tasks that aren't complete, and tasks that are complete from before
                //but also need hierarchy for ones that have parents
                self.tasks = [];
                //should clear any previous tasks from the HTML DOM too
                $("#tasks_container_date_range").html();
                //so lets first just take from the JSON into actual Task objects
                if (!Tools_1.Tools.IsNull(json_obj.tasks))
                    for (var i = 0; i < json_obj.tasks.length; i++) {
                        //cast JSON object to Task
                        var task = new Tasks_1.Task();
                        task.SetFromJSONObj(json_obj.tasks[i]);
                        self.tasks[task.id] = task;
                        self.AddTask(task);
                    }
            }
        }
        function error(json_obj) {
            self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
        }
        self.AjaxCall(success, error, data_to_send_obj);
    };
    return MainObj;
}());
exports.MainObj = MainObj;
var Main = new MainObj();
//cast window as any to trick typescript into not throwing an error because window doesn't have property main
window.Main = Main;
window.Tools = Tools_1.Tools; //just for testing out tools static functions


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// var Pikaday:any;
// import * as moment from "moment";
var DateTime_1 = __webpack_require__(1);
// declare var moment:any;
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.ShowAddTaskForm = function () {
        //hide AddTaskButton
        $("#btn-add-task").css("display", "none");
        //show form
        $("#add-task-area").css("display", "block");
        //also update the date + time with the current values
        // console.log("should be setting date value to: "+new Date());
        // console.log(",date picker: "+$("#task_start_date").data("date_picker"));
        $("#task_start_date").data("date_picker").setDate(new Date());
        //and wire up the time to set the current time
        // $("#task_start_date");
        // $("#task_start_time");
    };
    UI.prototype.ShowAddTaskBtn = function () {
        //show AddTaskButton
        $("#btn-add-task").css("display", "block");
        //hide form
        $("#add-task-area").css("display", "none");
    };
    /*
    For getting the UI libraries for date and time boxes wired up
     */
    UI.prototype.WireUpDate = function (element, fill_in_curr_date) {
        var date_format_display = 'MMM DD YYYY';
        //probably also make it visible, then invisible real quick since it doesn't always
        // element.css("display", "block");
        // let date_default:string = moment().format(date_format_display);
        // if(!fill_in_curr_date)
        //     date_default= <string>element.val();
        //     // element.val(""+moment().format(date_format_display));
        var picker = new Pikaday({
            // field: $('#task_start_date')[0],
            field: element[0],
            firstDay: 1,
            minDate: moment().subtract(7, 'days').format(date_format_display),
            // defaultDate:date_default,
            maxDate: moment().add(7, 'days').format(date_format_display),
            //yearRange: [2000,2020],
            format: date_format_display,
            onSelect: function (date) {
                // console.log("Pikaday, onselect called!"+picker.toString()+", date: "+date.constructor.name);
                //using moment JS to change it
                //.set(date)
                // var momentsjs_new = moment();
                // // momentsjs_new.format("'YYYY/MM/DD");
                // momentsjs_new.format("'LLLL");
                // console.log("momentJS formatted date: "+momentsjs_new);
            }
        });
        if (fill_in_curr_date || element.val() == null || element.val().length == 0)
            picker.setDate(new Date());
        else
            picker.setDate(new Date(element.val()));
        //lets also save the picker element into the html element, so we can update the picker later
        element.data("date_picker", picker);
        // element.css("display", "none");
    };
    UI.prototype.WireUpTime = function (element, fill_in_curr_date) {
        // element.css("display", "block");
        var prev_value = element.val();
        //for if no end date, just feel it in with current time
        if (prev_value != null)
            if (prev_value.length == 0)
                prev_value = null;
        var now = null;
        if (!fill_in_curr_date && prev_value != null)
            now = DateTime_1.DateTime.Get24hrFormatFromReadable(prev_value);
        else
            now = prev_value;
        console.log("WireUpTime: now: " + now + ", element value: " + element.val() + ", prev_value: " + prev_value);
        var options = {
            //now: "12:35", //hh:mm 24 hour format only, defaults to current time
            twentyFour: false,
            //upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
            //downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
            //close: 'wickedpicker__close', //The close class selector to use, for custom CSS
            //hoverState: 'hover-state', //The hover state class to use, for custom CSS
            title: 'Start Time',
            showSeconds: false,
            timeSeparator: ' : ',
            secondsInterval: 1,
            minutesInterval: 1,
            //beforeShow: null, //A function to be called before the Wickedpicker is shown
            //afterShow: null, //A function to be called after the Wickedpicker is closed/hidden
            //show: null, //A function to be called when the Wickedpicker is shown
            clearable: false,
        };
        if (now !== null)
            options.now = now;
        var element_any = element;
        element_any.wickedpicker(options);
        //lets also save the picker element into the html element, so we can update the picker later
        // element.data("wickedpicker", wickedpicker);
        // if(!fill_in_curr_date)
        //     element.val(prev_value);
        // element.css("display", "none");
    };
    UI.prototype.PopUp = function (text) {
        console.log(text);
    };
    UI.prototype.LoaderVisible = function (visible) {
        if (visible)
            $(".loader").css("display", "block");
        else
            $(".loader").css("display", "none");
    };
    UI.prototype.ShowRegister = function () {
        $("#register").css("display", "block");
        $("#login").css("display", "none");
        $("#TaskTrackerMain").css("display", "none");
        $("#welcome_header").css("display", "block");
    };
    UI.prototype.ShowLogin = function () {
        $("#register").css("display", "none");
        $("#login").css("display", "block");
        $("#TaskTrackerMain").css("display", "none");
        $("#welcome_header").css("display", "block");
    };
    UI.prototype.ShowTaskTracker = function () {
        $("#login").css("display", "none");
        $("#register").css("display", "none");
        $("#TaskTrackerMain").css("display", "block");
        $("#welcome_header").css("display", "none");
        this.HideFeedBack();
    };
    UI.prototype.HideFeedBack = function () {
        $("#feedback").css("display", "none").html();
    };
    UI.prototype.ShowFeedBack = function (message, feedback_type) {
        if (feedback_type === UI.MESSAGE_ERROR) {
            $("#feedback").removeClass("alert-success");
            $("#feedback").addClass("alert-danger");
        }
        else if (feedback_type === UI.MESSAGE_SUCCESS) {
            $("#feedback").removeClass("alert-danger");
            $("#feedback").addClass("alert-success");
        }
        //show the error box, and fill in the message
        $("#feedback").css("display", "block").html(message);
        //should change out class to be error or success bootstrap type
        //hide after 5s
        //first clear any previous timeouts waiting
        // clearTimeout(this.time_out_feedback_area);
        //
        // this.time_out_feedback_area =setTimeout(function()
        // {
        //     $("#feedback").css("display", "none");
        // }, 5000);
    };
    UI.MESSAGE_ERROR = 0;
    UI.MESSAGE_SUCCESS = 1;
    return UI;
}());
exports.UI = UI;


/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
Just structure for a task
 */
var DateTime_1 = __webpack_require__(1);
var Tools_1 = __webpack_require__(2);
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


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
For storing constants for changing out backends
 */
var Config = /** @class */ (function () {
    function Config() {
    }
    Object.defineProperty(Config, "BACKEND_URL", {
        //no static const in JS, so just using a getter makes it so it can't be changed
        get: function () {
            return "http://ackmi.com/projects/TaskTracker/mysql_connect.php";
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
exports.Config = Config;


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.IsNull = function (obj) {
        return obj === null || obj === undefined || obj.length === 0 || obj === "NULL"; //for blank strings
    };
    Tools.SanitizeInput = function (str) {
        //lets replace single quotes and double quotes with escaped quotes
        //first, lets escape the characters
        //str =  str.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
        str = encodeURI(str);
        //also encode single quotes
        str = str.replace(/'/g, "%27");
        console.log("escaped string: \n" + str + "\nunescaped str:\n" + Tools.UnSanitizeInput(str));
        return str;
    };
    /*
    for putting it back to human readable
     */
    Tools.UnSanitizeInput = function (str) {
        str = decodeURI(str);
        str = str.replace(/%27/g, "'");
        return str;
    };
    return Tools;
}());
exports.Tools = Tools;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjc1NDlkMWE2NWFmN2JkNGQ5YTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9EYXRlVGltZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL01haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9VSS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1Rhc2tzLnRzIiwid2VicGFjazovLy8uL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvQ29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvVG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7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RDdCLCtFQUErRTthQUMvRTtZQUVJLE1BQU0sQ0FBQyx5REFBeUQsQ0FBQztRQUNyRSxDQUFDOzs7T0FBQTtJQUNMLGFBQUM7QUFBRCxDQUFDO0FBUFksd0JBQU07Ozs7Ozs7Ozs7O0FDSm5CO0lBQUE7SUErQkEsQ0FBQztJQTdCaUIsWUFBTSxHQUFwQixVQUFxQixHQUFPO1FBRXhCLE1BQU0sQ0FBQyxHQUFHLEtBQUcsSUFBSSxJQUFFLEdBQUcsS0FBRyxTQUFTLElBQUUsR0FBRyxDQUFDLE1BQU0sS0FBRyxDQUFDLElBQUUsR0FBRyxLQUFHLE1BQU0sQ0FBQyxvQkFBbUI7SUFDeEYsQ0FBQztJQUVhLG1CQUFhLEdBQTNCLFVBQTRCLEdBQVU7UUFFbEMsa0VBQWtFO1FBQ2xFLG1DQUFtQztRQUNuQyxpRkFBaUY7UUFDakYsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQiwyQkFBMkI7UUFDM0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUMsR0FBRyxHQUFDLG9CQUFvQixHQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ1cscUJBQWUsR0FBN0IsVUFBOEIsR0FBVTtRQUVwQyxHQUFHLEdBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVMLFlBQUM7QUFBRCxDQUFDO0FBL0JZLHNCQUFLIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEyMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjc1NDlkMWE2NWFmN2JkNGQ5YTgiLCIvKlxyXG5UbyBoYW5kbGUgdHJhbnNmZXJyaW5nIGZyb20gaHVtYW4gcmVhZGFibGUgZGF0ZXMgYW5kIHRpbWVzIHRvIE1ZU1FMIGNvbXBhdGlibGUgb25lc1xyXG4gKi9cclxuaW1wb3J0IHtUb29sc30gZnJvbSBcIi4vVG9vbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVxyXG57XHJcbiAgICAvL2Zvcm1hdHMgYXJlIGZyb20gbXlTUUwgZm9ybWF0XHJcbiAgICBwdWJsaWMgIHllYXI6bnVtYmVyO1xyXG4gICAgcHVibGljICBtb250aDpudW1iZXI7Ly8xLTEyXHJcbiAgICBwdWJsaWMgIGRheTpudW1iZXI7Ly8xLTMxXHJcblxyXG4gICAgcHVibGljICBob3VyczpudW1iZXI7Ly8gMC0yM1xyXG4gICAgcHVibGljICBtaW5zOm51bWJlcjsvLzAtNTlcclxuICAgIHB1YmxpYyAgc2VjczpudW1iZXI7Ly8wLTU5XHJcblxyXG4gICAgcHVibGljICBob3Vyc18xMmhyOm51bWJlcjsvLyAxLTEyXHJcblxyXG4gICAgcHVibGljICBob3Vyc19kaXNwbGF5ZWRfMTJocjpzdHJpbmc7Ly8gaGF2ZSB0byBhZGQgbGVhZGluZyAwcyArIGluIDEyIGhyIGZvcm1hdCBpbnN0ZWFkIG9mIDI0XHJcbiAgICBwdWJsaWMgIG1pbnNfZGlzcGxheWVkOnN0cmluZzsvLyBoYXZlIHRvIGFkZCBsZWFkaW5nIDBzXHJcbiAgICBwdWJsaWMgIGhvdXJzX0FNX09SX1BNOnN0cmluZzsgLy93aGV0aGVyIEFNIG9yIFBNIGZvciAyNCBociBkaXNwbGF5XHJcblxyXG4gICAgcHVibGljIG1vbnRoX25hbWVzOnN0cmluZ1tdID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdO1xyXG5cclxuICAgIHB1YmxpYyBkYXRlX2Rpc3BsYXk6c3RyaW5nOy8vZGlzcGxheXMgZGF0ZSBpbiBmb3JtYXQ6IEphbiAyOCAyMDE4XHJcbiAgICBwdWJsaWMgdGltZV9kaXNwbGF5OnN0cmluZzsvL2Rpc3BsYXlzIHRpbWUgaW4gZm9ybWF0OiAxMCA6IDA5IFBNXHJcblxyXG4gICAgcHVibGljIG1vbnRoX2Rpc3BsYXk6c3RyaW5nOyAvL0phblxyXG4gICAgLy9wdWJsaWMgZGF5X2Rpc3BsYXk6c3RyaW5nOyAvLzAxLTMxXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZGF0ZV90aW1lX215c3FsX3N0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZXREYXRlVGltZUZyb21NeVNRTChkYXRlX3RpbWVfbXlzcWxfc3RyKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREYXRlVGltZUZyb21NeVNRTChkYXRlX3RpbWVfbXlzcWxfc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBsZXQgZGF0ZV90aW1lX2FycjpzdHJpbmdbXSA9IGRhdGVfdGltZV9teXNxbF9zdHIuc3BsaXQoXCIgXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0ZV9teXNxbDpzdHJpbmcgPSBkYXRlX3RpbWVfYXJyWzBdO1xyXG4gICAgICAgIGxldCB0aW1lX215c3FsOnN0cmluZyA9IGRhdGVfdGltZV9hcnJbMV07XHJcblxyXG4gICAgICAgIC8vZmlyc3QgZG8gZGF0ZVxyXG4gICAgICAgIGxldCBkYXRlX2FycjpzdHJpbmdbXSA9IGRhdGVfbXlzcWwuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgIGxldCB5ZWFyX3N0cjpzdHJpbmcgPSBkYXRlX2FyclswXTtcclxuICAgICAgICB0aGlzLm1vbnRoX2Rpc3BsYXkgPSBkYXRlX2FyclsxXTtcclxuICAgICAgICBsZXQgZGF5X3N0cjpzdHJpbmcgPSBkYXRlX2FyclsyXTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXk9IHBhcnNlSW50KGRheV9zdHIpO1xyXG4gICAgICAgIHRoaXMubW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoX2Rpc3BsYXkpO1xyXG4gICAgICAgIHRoaXMueWVhciA9IHBhcnNlSW50KHllYXJfc3RyKTtcclxuICAgICAgICAvL2NoYW5nZSBtb250aCBmcm9tIG51bWJlciAxLTEyIHRvIGFiciBkYXRlIG5hbWVcclxuICAgICAgICB0aGlzLm1vbnRoX2Rpc3BsYXk9IHRoaXMubW9udGhfbmFtZXNbdGhpcy5tb250aCAtMV07XHJcbiAgICAgICAgZGF5X3N0ciA9IHRoaXMuZGF5LnRvU3RyaW5nKCk7Ly9mb3IgZ2V0dGluZyByaWQgb2YgdGhlIGxlYWRpbmcgMFxyXG5cclxuICAgICAgICB0aGlzLmRhdGVfZGlzcGxheSA9ICB0aGlzLm1vbnRoX2Rpc3BsYXkrXCIgXCIrIGRheV9zdHIrIFwiIFwiK3llYXJfc3RyO1xyXG5cclxuXHJcbiAgICAgICAgLy9uZXh0IGRvIHRpbWUgMDU6NDA6MDYgKHN0YXJ0aW5nIGF0IDAsIGVuZGluZyBhdCAyMzo1OTo1OSB0byBzdGFydGluZyBhdCAxLCBlbmRpbmcgYXQgMTJcclxuICAgICAgICBsZXQgdGltZV9hcnI6c3RyaW5nW10gPSB0aW1lX215c3FsLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICBsZXQgaG91cl9zdHI6c3RyaW5nID0gdGltZV9hcnJbMF07XHJcbiAgICAgICAgbGV0IG1pbnV0ZV9zdHI6c3RyaW5nID0gcGFyc2VJbnQodGltZV9hcnJbMV0pLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaG91cnM9IHBhcnNlSW50KGhvdXJfc3RyKTtcclxuICAgICAgICB0aGlzLm1pbnM9IHBhcnNlSW50KG1pbnV0ZV9zdHIpO1xyXG5cclxuICAgICAgICAvL2hhdmUgdG8gYWRkIGxlYWRpbmcgMCB0byBtaW5zXHJcbiAgICAgICAgdGhpcy5taW5zX2Rpc3BsYXllZD0gdGhpcy5taW5zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYodGhpcy5taW5zX2Rpc3BsYXllZC5sZW5ndGg8MilcclxuICAgICAgICAgICAgdGhpcy5taW5zX2Rpc3BsYXllZD0gXCIwXCIrdGhpcy5taW5zX2Rpc3BsYXllZDtcclxuXHJcbiAgICAgICAgLy9sZXQgaHJfbnVtOm51bWJlciA9IHRoaXMuaG91cnM7Ly90byBnbyBmcm9tIDAgbyBjbG9jayB0byAxIG8gY2xvY2sgQU1cclxuICAgICAgICB0aGlzLmhvdXJzXzEyaHIgPSB0aGlzLmhvdXJzO1xyXG5cclxuICAgICAgICB0aGlzLmhvdXJzX0FNX09SX1BNID0gXCJBTVwiO1xyXG4gICAgICAgIGlmKHRoaXMuaG91cnNfMTJocj4xMSkvL0FNIGlzIDEtMTEgaXMgQU0sIDEyLTExIGlzIFBNXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhvdXJzX0FNX09SX1BNID0gXCJQTVwiO1xyXG4gICAgICAgICAgICB0aGlzLmhvdXJzXzEyaHItPTEyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2ZvciBoYXZpbmcgMD0xMiBBTVxyXG4gICAgICAgIGlmKHRoaXMuaG91cnNfMTJocj09MClcclxuICAgICAgICAgICAgdGhpcy5ob3Vyc18xMmhyPTEyO1xyXG5cclxuICAgICAgICB0aGlzLmhvdXJzX2Rpc3BsYXllZF8xMmhyID0gdGhpcy5ob3Vyc18xMmhyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYodGhpcy5ob3Vyc19kaXNwbGF5ZWRfMTJoci5sZW5ndGg8MilcclxuICAgICAgICAgICAgdGhpcy5ob3Vyc19kaXNwbGF5ZWRfMTJocj0gXCIwXCIrdGhpcy5ob3Vyc19kaXNwbGF5ZWRfMTJocjtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lX2Rpc3BsYXkgPSB0aGlzLmhvdXJzX2Rpc3BsYXllZF8xMmhyK1wiIDogXCIrdGhpcy5taW5zX2Rpc3BsYXllZCtcIiBcIit0aGlzLmhvdXJzX0FNX09SX1BNO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldERhdGVUaW1lRnJvbU15U1FMOiBmcm9tIGRhdGUgdGltZTogXCIrZGF0ZV90aW1lX215c3FsX3N0citcIiwgdG8gZGF0ZSB0aW1lOiBcIit0aGlzLmRhdGVfZGlzcGxheStcIiBcIit0aGlzLnRpbWVfZGlzcGxheSk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgbmVlZGVkIGZvciB3aWNrZWRwaWNrZXIgZm9yIHNldHRpbmcgZGVmYXVsdCB2YWx1ZVxyXG4gICAgLy9zaG91bGQgY2hhbmdlOlxyXG4gICAgICAgIDMgOiAwMCBQTSB0b1xyXG4gICAgICAgIDE1OjAwXHJcbiAgICAgICAgMTIgQU0gc2hvdWxkIGJlIDA6MDBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXQyNGhyRm9ybWF0RnJvbVJlYWRhYmxlKHRpbWVfcmVhZGFibGU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBhcnI6c3RyaW5nW10gPSB0aW1lX3JlYWRhYmxlLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAvLzA9aHIsIDE9OiwgMj1taW4sIDM9UE1cclxuICAgICAgICBsZXQgaHI6bnVtYmVyID0gcGFyc2VJbnQoYXJyWzBdKTtcclxuICAgICAgICBsZXQgQU06Ym9vbGVhbiA9IGFyclszXT09PVwiQU1cIjtcclxuXHJcbiAgICAgICAgaWYoaHI9PT0xMiYmQU0pXHJcbiAgICAgICAgICAgIGhyLT0xMjtcclxuXHJcbiAgICAgICAgaWYoIUFNJiZocj4xMilcclxuICAgICAgICAgICAgaHIrPTEyO1xyXG4gICAgICAgIHJldHVybiBocitcIjpcIithcnJbMl07XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBmaW5kIHRoZSBkaWZmZXJlbmNlIGluIG1pbnMgYmV0d2VlbiAyIGRhdGUgdGltZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBEaWZmZXJlbmNlSW5NaW5zKGRhdGVfdGltZTE6RGF0ZVRpbWUsIGRhdGVfdGltZTI6RGF0ZVRpbWUpXHJcbiAgICB7XHJcbiAgICAgICAgLy9oYXZlIHRvIGNvbnZlcnQgYm90aCBkYXRlIHRpbWVzIHRvIERhdGVzLCBhbmQgZmluZCB0aGUgZGlmZmVyZW5jZSBpbiBtc1xyXG4gICAgICAgIC8vaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk2ODE2Ny9kaWZmZXJlbmNlLWJldHdlZW4tZGF0ZXMtaW4tamF2YXNjcmlwdFxyXG5cclxuICAgICAgICAvL25ldyBEYXRlKHllYXIsIG1vbnRoIFssIGRheSBbLCBob3VycyBbLCBtaW51dGVzIFssIHNlY29uZHMgWywgbWlsbGlzZWNvbmRzXV1dXV0pO1xyXG4gICAgICAgIC8vbW9udGggbmVlZHMgdG8gYmUgZnJvbSAwLTExXHJcblxyXG4gICAgICAgIGxldCBkYXRlMTpEYXRlID0gbmV3IERhdGUoZGF0ZV90aW1lMS55ZWFyLCBkYXRlX3RpbWUxLm1vbnRoLCBkYXRlX3RpbWUxLmRheSwgZGF0ZV90aW1lMS5ob3VycywgZGF0ZV90aW1lMS5taW5zLCAwLDApO1xyXG4gICAgICAgIGxldCBkYXRlMjpEYXRlID0gbmV3IERhdGUoZGF0ZV90aW1lMi55ZWFyLCBkYXRlX3RpbWUyLm1vbnRoLCBkYXRlX3RpbWUyLmRheSwgZGF0ZV90aW1lMi5ob3VycywgZGF0ZV90aW1lMi5taW5zLCAwLDApO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvaW5nIHRvIGZpbmQgdGhlIGRpZmZlcm5jZSBiZXR3ZWVuIGRhdGUyOiBcIitkYXRlMitcIiwgYW5kIGRhdGUxOiBcIitkYXRlMSk7XHJcbiAgICAgICAgLy9ub3cgZGlmZmVyZW5jZTpcclxuICAgICAgICAvL2h0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NjgxNjcvZGlmZmVyZW5jZS1iZXR3ZWVuLWRhdGVzLWluLWphdmFzY3JpcHRcclxuICAgICAgICBsZXQgZGlmZl9pbl9tczpudW1iZXIgPSAoZGF0ZTIuZ2V0VGltZSgpLWRhdGUxLmdldFRpbWUoKSk7XHJcblxyXG4gICAgICAgIC8vY29udmVydCB0byBzLCBtaW5zLCBlY3RcclxuICAgICAgICBsZXQgZGlmZl9pbl9zOm51bWJlciA9IGRpZmZfaW5fbXMvMTAwMDtcclxuXHJcbiAgICAgICAgbGV0IGRpZmZfaW5fbWluczpudW1iZXIgPSBkaWZmX2luX3MvNjA7XHJcbiAgICAgICAgbGV0IGRpZmZfaW5faHJzOm51bWJlciA9IGRpZmZfaW5fbWlucy82MDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRpZmZlcmVuY2UgaW4gaHJzOiBcIitkaWZmX2luX2hycyk7XHJcblxyXG4gICAgICAgIGxldCBkaWZmX21pbnNfZmluYWw6bnVtYmVyID0gTWF0aC5mbG9vcigoZGlmZl9pbl9ocnMlMSkqNjApO1xyXG4gICAgICAgIGxldCBkaWZmX2hyc19maW5hbDpudW1iZXIgPSBNYXRoLmZsb29yKGRpZmZfaW5faHJzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEaWZmZXJlbmNlSW5NaW5zOiBUb3RhbCB0aW1lIGRpZmZlcmVuY2U6IFwiK2RpZmZfaHJzX2ZpbmFsK1wiOiBcIitkaWZmX21pbnNfZmluYWwpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlmZl9ocnNfZmluYWwrXCIgaHJzIFwiK2RpZmZfbWluc19maW5hbCtcIiBtaW5zXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIGNoYW5nZXMgZGF0ZSBmb3JtYXQgZnJvbTpcclxuICAgIEphbiAyNCAyMDE4XHJcbiAgICB0byAoTVlTUUwgZm9ybWF0KVxyXG4gICAgMjAxMi0wNi0yMiAwNTo0MDowNlxyXG5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXREYXRlRm9yTXlTUUxGcm9tUmVhZGFibGUoZGF0ZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRhdGVfc3BsaXQ6c3RyaW5nW10gPSBkYXRlLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICBsZXQgbW9udGhfbmFtZTpzdHJpbmcgPSBkYXRlX3NwbGl0WzBdO1xyXG4gICAgICAgIGxldCBkYXk6c3RyaW5nID0gZGF0ZV9zcGxpdFsxXTtcclxuICAgICAgICBsZXQgeWVhcjpzdHJpbmcgPSBkYXRlX3NwbGl0WzJdO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTM1NjY1NTIvZWFzaWVzdC13YXktdG8tY29udmVydC1tb250aC1uYW1lLXRvLW1vbnRoLW51bWJlci1pbi1qcy1qYW4tMDFcclxuICAgICAgICBsZXQgbW9udGhfbnVtYmVyOnN0cmluZyA9KG5ldyBEYXRlKERhdGUucGFyc2UobW9udGhfbmFtZSArXCIgMSwgMjAxMlwiKSkuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBpZiAobW9udGhfbnVtYmVyLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgICBtb250aF9udW1iZXIgPSBcIjBcIittb250aF9udW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibW9udGg6IFwiK21vbnRoX25hbWUrXCIsIGRheTpcIitkYXkrXCIsIHllYXI6IFwiK3llYXIrXCIsIG1vbnRoIG5hbWU6IFwiK1wiLCBtb250aCBudW06IFwiK21vbnRoX251bWJlcik7XHJcblxyXG4gICAgICAgIGxldCBteXNxbF9mb3JtYXQ6c3RyaW5nID0geWVhcitcIi1cIittb250aF9udW1iZXIrXCItXCIrZGF5O1xyXG4gICAgICAgIHJldHVybiBteXNxbF9mb3JtYXQ7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgY2hhbmdlcyB0aW1lIGZvcm1hdCBmcm9tOlxyXG4gICAgOSA6IDExIFBNXHJcbiAgICB0byAoTVlTUUwgZm9ybWF0KVxyXG4gICAgMDg6MDc6MTQgKEhIIE1NIFNTKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFRpbWVGb3JNeVNRTEZyb21SZWFkYWJsZSh0aW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aW1lID0gdGltZS5yZXBsYWNlKFwiOiBcIiwgXCJcIik7XHJcbiAgICAgICAgbGV0IHRpbWVfc3BsaXQ6c3RyaW5nW10gPSB0aW1lLnNwbGl0KFwiIFwiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aW1lIDogXCIrdGltZSk7XHJcblxyXG4gICAgICAgIC8vIHRpbWVfc3BsaXRbMF0gPShwYXJzZUludCh0aW1lX3NwbGl0WzBdKSkudG9TdHJpbmcoKTsgLy9zaW5jZSB0aGUgdGltZSBwaWNrZXIgaXMgMWFtIC0xMnBtLCBidXQgbXlzcWwgaXMgMCAtMjRcclxuICAgICAgICBsZXQgaG91cjpudW1iZXIgPSBwYXJzZUludCh0aW1lX3NwbGl0WzBdKTtcclxuXHJcbiAgICAgICAgLy9mb3IgMTIgQU0sIGl0IGJlY29tZXMgMCBvIGNsb2NrXHJcbiAgICAgICAgaWYodGltZV9zcGxpdFsyXT09PVwiQU1cIiYmaG91cj09MTIpXHJcbiAgICAgICAgICAgIGhvdXItPTEyO1xyXG5cclxuICAgICAgICAvL2ZvciBhbnkgUE0ncywgZXhjZXB0IDEyLCBhZGQgMTJocnMgdG8gdGhlbVxyXG4gICAgICAgIGlmKHRpbWVfc3BsaXRbMl09PT1cIlBNXCImJmhvdXIhPTEyKVxyXG4gICAgICAgICAgICBob3VyKz0xMjtcclxuXHJcbiAgICAgICAgbGV0IGhvdXJfc3RyOnN0cmluZyA9IGhvdXIudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihob3VyPDEwKS8vYWRkIGxlYWRpbmcgMCBvbnRvIGhvdXJcclxuICAgICAgICAgICAgaG91cl9zdHI9XCIwXCIraG91cjtcclxuXHJcbiAgICAgICAgaWYodGltZV9zcGxpdFsxXS5sZW5ndGg9PTEpLy9hZGQgbGVhZGluZyAwIHRvIG1pbnV0ZVxyXG4gICAgICAgICAgICB0aW1lX3NwbGl0WzFdPVwiMFwiK3RpbWVfc3BsaXRbMV07XHJcblxyXG4gICAgICAgIGxldCBteXNxbF90aW1lID0gaG91cl9zdHIrXCI6XCIrdGltZV9zcGxpdFsxXStcIjowMFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGltZSBmb3IgTVlTUUw6IFwiK215c3FsX3RpbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gbXlzcWxfdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERhdGVUaW1lRm9yTXlTUUxGcm9tUmVhZGFibGUoZGF0ZTpzdHJpbmcsIHRpbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2V0RGF0ZVRpbWVGb3JNeVNRTEZyb21SZWFkYWJsZTogXCIrZGF0ZStcIiwgXCIrdGltZSk7XHJcbiAgICAgICAgaWYoVG9vbHMuSXNOdWxsKGRhdGUpfHxUb29scy5Jc051bGwodGltZSkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgZGF0ZV9teXNxbDpzdHJpbmcgPSB0aGlzLkdldERhdGVGb3JNeVNRTEZyb21SZWFkYWJsZShkYXRlKTtcclxuICAgICAgICBsZXQgdGltZV9teXNxbDpzdHJpbmcgPSB0aGlzLkdldFRpbWVGb3JNeVNRTEZyb21SZWFkYWJsZSh0aW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGVfbXlzcWwrXCIgXCIrdGltZV9teXNxbDtcclxuICAgIH1cclxuICAgIC8vIG15c3FsIGZvcm1hdDogMjAxMi0wNi0yMiAwNTo0MDowNlxyXG4gICAgcHVibGljIHN0YXRpYyBHZXREYXRlVGltZU15U1FMRnJvbURhdGUoZGF0ZTpEYXRlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtb250aDpzdHJpbmcgPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7Ly9ub3JtYWxseSAwLTExXHJcbiAgICAgICAgaWYobW9udGgubGVuZ3RoPT0xKS8vYWRkIGxlYWRpbmcgMCB0byBtaW51dGVcclxuICAgICAgICAgICAgbW9udGg9XCIwXCIrbW9udGg7XHJcblxyXG4gICAgICAgIGxldCBkYXk6c3RyaW5nID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihkYXkubGVuZ3RoPT0xKS8vYWRkIGxlYWRpbmcgMFxyXG4gICAgICAgICAgICBkYXk9XCIwXCIrZGF5O1xyXG5cclxuICAgICAgICBsZXQgaG91cjpzdHJpbmc9ZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYoaG91ci5sZW5ndGg9PTEpLy9hZGQgbGVhZGluZyAwXHJcbiAgICAgICAgICAgIGhvdXI9XCIwXCIraG91cjtcclxuXHJcbiAgICAgICAgbGV0IG1pbnM6c3RyaW5nPWRhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYobWlucy5sZW5ndGg9PTEpLy9hZGQgbGVhZGluZyAwXHJcbiAgICAgICAgICAgIG1pbnM9XCIwXCIrbWlucztcclxuXHJcbiAgICAgICAgbGV0IHNlY3M6c3RyaW5nPWRhdGUuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYoc2Vjcy5sZW5ndGg9PTEpLy9hZGQgbGVhZGluZyAwXHJcbiAgICAgICAgICAgIHNlY3M9XCIwXCIrc2VjcztcclxuXHJcblxyXG4gICAgICAgIGxldCBzdHJfZGF0ZV90aW1lX215c3FsOnN0cmluZyA9IGRhdGUuZ2V0RnVsbFllYXIoKStcIi1cIittb250aCtcIi1cIitkYXkrXCIgXCIraG91citcIjpcIittaW5zK1wiOlwiK3NlY3M7XHJcbiAgICAgICAgcmV0dXJuIHN0cl9kYXRlX3RpbWVfbXlzcWw7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEZvciBnZXR0aWduIHRoZSBjdXJyZW50IGRhdGUvIHRpbWUgZm9yIHNlbmRpbmcgdG8gbXlzcWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRDdXJyZW50RGF0ZVRpbWVNeVNRTCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRhdGU6RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0RGF0ZVRpbWVNeVNRTEZyb21EYXRlKGRhdGUpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9EYXRlVGltZS50cyIsImltcG9ydCB7VUl9IGZyb20gXCIuL1VJXCI7XHJcbmltcG9ydCB7VGFzaywgVGFza0hhbmRsZXJ9IGZyb20gXCIuL1Rhc2tzXCI7XHJcblxyXG4vLyBpbXBvcnQgKiBhcyBNb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQge0RhdGVUaW1lfSBmcm9tIFwiLi9EYXRlVGltZVwiO1xyXG5pbXBvcnQge1Rvb2xzfSBmcm9tIFwiLi9Ub29sc1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vQ29uZmlnXCI7O1xyXG5cclxuLy9mb3IgdmV4IG1vZGFsIGRpYWxvZ1xyXG5kZWNsYXJlIHZhciB2ZXg6YW55OyAvLyB3YXkgb2YgZ2V0dGluZyBKUyBsb2FkZWQgbGlicmFyaWVzIHdvcmtpbmcgcHJvcGVybHlcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1haW5PYmpcclxue1xyXG4gICAgcHVibGljICB1aTpVSSA9IG5ldyBVSSgpO1xyXG4gICAgcHVibGljIHRhc2tfaGFuZGxlcjpUYXNrSGFuZGxlciA9IG5ldyBUYXNrSGFuZGxlcigpO1xyXG5cclxuICAgIC8vZm9yIHN0YXlpbmcgbG9nZ2VkIGluLSBoYXZlIHRvIHNheSBvciBudWxsLCBzaW5jZSB0aGV5IGFyZSBudWxsIGluaXRpYWxseSwgb3IgaWYgeW91IGNhbid0IGdldCB0aGVtIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgcHVibGljIGlkOnN0cmluZ3xudWxsO1xyXG4gICAgcHVibGljIGF1dGhfa2V5OnN0cmluZ3xudWxsO1xyXG4gICAgcHVibGljIGxvZ2dlZF9pbjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyB0YXNrczpUYXNrW107XHJcblxyXG4gICAgLy8gcHVibGljIHRvb2xzOlRvb2xzPSBuZXcgVG9vbHMoKTsvL2p1c3QgZm9yIGFjZXNzaW5nIGZyb20gSlNcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgLy9oYXZlIHRvIGNhc3QgdG8gc3RyaW5nLCBiZWNhdXNlIGxvY2Fsc3RvcmFnZSBjb3VsZCByZXR1cm4gYSBzdHJpbmcgb3IgbnVsbCwgd2hpY2ggdGhyb3dzIGFuIGVycm9yXHJcbiAgICAgICAgdGhpcy5pZCA9IDxzdHJpbmc+bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZFwiKTtcclxuICAgICAgICB0aGlzLmF1dGhfa2V5ID0gPHN0cmluZz5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhfa2V5XCIpO1xyXG4gICAgICAgIGlmKHRoaXMuaWQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvdWxkIG5vdCBsb2FkIHByZXZpb3VzIHNlc3Npb25cIik7XHJcbiAgICAgICAgICAgIHRoaXMudWkuU2hvd0xvZ2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIHByZXZpb3VzIHNlc3Npb24hXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2dlZEluKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2V0dXBFbnRlckhhbmRsaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEZvciBkb2luZyBBamF4IGNhbGxzIHRvIHRoZSBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBBamF4Q2FsbChzdWNjZXNzX3RvX2NhbGw6RnVuY3Rpb24sIGVycm9yX3RvX2NhbGw6RnVuY3Rpb24sIGRhdGFfdG9fc2VuZF9vYmo6T2JqZWN0KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzZWxmOk1haW5PYmogPSB0aGlzOy8vIFRoZSBhamF4IGZ1bmN0aW9ucyBhcmUgaW5zaWRlIGEgZGlmZmVyZW50IG9iamVjdCwgc28gdGhpcyB3b24ndCByZWZlciB0byB0aGlzIG9iamVjdCBhbnltb3JlLCBzbyBoYXZlIHRvIG1ha2UgYW4gYWxpYXMgdXAgaGVyZSBmb3IgaXQgdG8gc3RpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIG9iamVjdCB3ZSdyZSBpblxyXG4gICAgICAgIHRoaXMudWkuTG9hZGVyVmlzaWJsZSh0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBamF4Q2FsbDogZ29pbmcgdG8gc2VuZDogb2JqOlwiK0pTT04uc3RyaW5naWZ5KGRhdGFfdG9fc2VuZF9vYmopK1wiLCB0byBwYWdlOiBcIitDb25maWcuQkFDS0VORF9VUkwpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgdXJsOiBDb25maWcuQkFDS0VORF9VUkwsXHJcbiAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhX3RvX3NlbmRfb2JqLFxyXG4gICAgICAgICAgICAvLyBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAvL2pzb25wOiBmYWxzZSwgLy9JIGFkZGVkIGpzb25wLSBieSBkZWZhdWx0IHJldHVybnMgY3Jvc3Mgb3JpZ2luIHJlcXVlc3RzIGFzIGpzb25wIGlzdGVhZCBvZiBqc29uXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlRGF0YSwgdGV4dFN0YXR1cywganFYSFIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudWkuTG9hZGVyVmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFKQVhDQUxMOiByZXNwb25zZURhdGE6IFwiK3Jlc3BvbnNlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbl9vYmo6YW55ID0gSlNPTi5wYXJzZShyZXNwb25zZURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGpzb25fb2JqLnR5cGU9PT1cImVycm9yXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfdG9fY2FsbChqc29uX29iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGpzb25fb2JqLnR5cGU9PT1cInN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzX3RvX2NhbGwoanNvbl9vYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlRGF0YSwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdQT1NUIGZhaWxlZC4nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYudWkuTG9hZGVyVmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgc28gdGhleSBjYW4gaGl0IGVudGVyIGluIHRoZSBwd2QgZmllbGQgdG8gbG9naW4vcmVnaXN0ZXJcclxuICAgICAqL1xyXG4gICAgU2V0dXBFbnRlckhhbmRsaW5nKClcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpcztcclxuICAgICAgICAvL2hhdmUgdG8gYWRkIFswXSB0byBhY2Nlc3MgdGhlIERPTSBlbGVtZW50LSB3aXRob3V0IGl0IGl0IGFjY2Vzc2VzIGp1c3QgdGhlIGpxdWVyeSB3cmFwcGVyIG9iamVjdFxyXG4gICAgICAgICQoXCIjbG9naW5fcHdkXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7ICAvL2NoZWNrcyB3aGV0aGVyIHRoZSBwcmVzc2VkIGtleSBpcyBcIkVudGVyXCJcclxuICAgICAgICAgICAgICAgIHNlbGYuTG9naW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI3JlZ2lzdGVyX3B3ZFwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgeyAgLy9jaGVja3Mgd2hldGhlciB0aGUgcHJlc3NlZCBrZXkgaXMgXCJFbnRlclwiXHJcbiAgICAgICAgICAgICAgICBzZWxmLlJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgRm9yIHJlZ2lzdGVyaW5nIGEgbmV3IHVzZXItIGdldCB0aGUgZW1haWwgYWRkcmVzcywgcGFzc3dvcmQsIGFuZCBhdHRlbXB0IHRvIHJlZ2lzdGVyXHJcbiAgICAgKi9cclxuICAgIFJlZ2lzdGVyKClcclxuICAgIHtcclxuICAgICAgICAvL2hhdmUgdG8gY2FzdCBhcyBhbnkgdG8gZ2V0IHR5cGVzY3JpcHQgdG8gaWdub3JlIHRoYXQganF1ZXJ5LnZhbCBtYXkgcmV0dXJuIHVuZGVmaW5lZCwgYW5kIGVycm9ycyBvdXRcclxuICAgICAgICBsZXQgZW1haWw6c3RyaW5nID0gVG9vbHMuU2FuaXRpemVJbnB1dCg8YW55PiQoXCIjcmVnaXN0ZXJfZW1haWxcIikudmFsKCkpO1xyXG4gICAgICAgIGxldCBwd2Q6c3RyaW5nID0gVG9vbHMuU2FuaXRpemVJbnB1dCg8YW55PiQoXCIjcmVnaXN0ZXJfcHdkXCIpLnZhbCgpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyOiBlbWFpbCBhbmQgcHdkIGVudGVyZWQ6IFwiK2VtYWlsK1wiLCBcIitwd2QpO1xyXG5cclxuICAgICAgICAvL3NvIGxldHMgY2hlY2sgdGhlIGlucHV0IGZpcnN0LCBhbmQgcHJvdmlkZSBhbiBlcnJvciBpZiBzb21ldGhpbmcgd2FzIHdyb25nLyB0aGV5IGRpZG4ndCBlbnRlciBib3RoIGlucHV0c1xyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHRyeSB0byBzdWJtaXQgdGhlc2UgdG8gdGhlIHBocCBwYWdlLCBhbmQgZ2V0IHdoZXRoZXIgdGhleSB3ZXJlIHJlZ2lzdGVyZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouYWN0aW9uPVwicmVnaXN0ZXJcIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmVtYWlsPWVtYWlsO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoucGFzc3dvcmQ9cHdkO1xyXG5cclxuICAgICAgICAvL05PVEU6IGlmIHlvdSB0cnkgdG8gc2VuZCAgSlNPTiBvYmplY3QsIGl0IGp1c3Qgc2VuZHMgdGhlIHN0cmluZyBhcyBhIGtleSwgYW5kIG5vIHZhbHVlLCBzbyBoYXZlIHRvIHNlbmQgdGhlIGFjdHVhbCBvYmplY3QsIHdoaWNoIGl0IGFzc3VtYWJseSBzdHJpbmdpZmllcyBhZ2FpblxyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHN1Ym1pdCB0aGVtIHRvIHRoZSBwaHAgcGFnZVxyXG5cclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dGZWVkQmFjayhqc29uX29iai5tZXNzYWdlLCBVSS5NRVNTQUdFX1NVQ0NFU1MpO1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dMb2dpbigpO1xyXG5cclxuICAgICAgICAgICAgLy9zaG91bGQgYWxzbyBmaWxsIGluIHRoZSBlbWFpbCBhZGRyZXNzIGFuZCBjbGVhciB0aGUgcGFzc3dvcmQgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICQoXCIjbG9naW5fZW1haWxcIikudmFsKGVtYWlsKTtcclxuICAgICAgICAgICAgJChcIiNsb2dpbl9wd2RcIikudmFsKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgLy9hbmQgY2xlYXIgdGhlIHJlZ2lzdGVyIGJveGVzXHJcbiAgICAgICAgICAgICQoXCIjcmVnaXN0ZXJfZW1haWxcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiI3JlZ2lzdGVyX3B3ZFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfRVJST1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5BamF4Q2FsbChzdWNjZXNzLCBlcnJvciwgZGF0YV90b19zZW5kX29iaik7XHJcbiAgICB9XHJcblxyXG4gICAgTG9naW4oKVxyXG4gICAge1xyXG5cclxuICAgICAgICBsZXQgZW1haWw6c3RyaW5nID0gVG9vbHMuU2FuaXRpemVJbnB1dCg8YW55PiQoXCIjbG9naW5fZW1haWxcIikudmFsKCkpO1xyXG4gICAgICAgIGxldCBwd2Q6c3RyaW5nID0gVG9vbHMuU2FuaXRpemVJbnB1dCg8YW55PiQoXCIjbG9naW5fcHdkXCIpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgLy9jbGVhciBwYXNzd29yZFxyXG4gICAgICAgICQoXCIjbG9naW5fcHdkXCIpLnZhbChcIlwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouYWN0aW9uPVwibG9naW5cIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmVtYWlsPWVtYWlsO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoucGFzc3dvcmQ9cHdkO1xyXG5cclxuICAgICAgICAvL05PVEU6IGlmIHlvdSB0cnkgdG8gc2VuZCAgSlNPTiBvYmplY3QsIGl0IGp1c3Qgc2VuZHMgdGhlIHN0cmluZyBhcyBhIGtleSwgYW5kIG5vIHZhbHVlLCBzbyBoYXZlIHRvIHNlbmQgdGhlIGFjdHVhbCBvYmplY3QsIHdoaWNoIGl0IGFzc3VtYWJseSBzdHJpbmdpZmllcyBhZ2FpblxyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHN1Ym1pdCB0aGVtIHRvIHRoZSBwaHAgcGFnZVxyXG4gICAgICAgIGxldCBzZWxmOk1haW5PYmogPSB0aGlzOy8vIFRoZSBhamF4IGZ1bmN0aW9ucyBhcmUgaW5zaWRlIGEgZGlmZmVyZW50IG9iamVjdCwgc28gdGhpcyB3b24ndCByZWZlciB0byB0aGlzIG9iamVjdCBhbnltb3JlLCBzbyBoYXZlIHRvIG1ha2UgYW4gYWxpYXMgdXAgaGVyZSBmb3IgaXQgdG8gc3RpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIG9iamVjdCB3ZSdyZSBpblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vY2xlYXIgdGhlIGVtYWlsIGlucHV0IHRvbzpcclxuICAgICAgICAgICAgJChcIiNsb2dpbl9lbWFpbFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgIC8vc28gc3RvcmUgdGhlIGlkIGFuZCBhdXRoIGtleSwgYW5kIGJyaW5nIHVwIHRoZSBsb2dnZWQgaW4gaW50ZXJmYWNlXHJcbiAgICAgICAgICAgIHNlbGYuU3RvcmVMb2dpbihqc29uX29iai5pZCwganNvbl9vYmoudG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dGZWVkQmFjayhqc29uX29iai5tZXNzYWdlLCBVSS5NRVNTQUdFX0VSUk9SKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuQWpheENhbGwoc3VjY2VzcywgZXJyb3IsIGRhdGFfdG9fc2VuZF9vYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBMb2dPdXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaWQ9bnVsbDtcclxuICAgICAgICB0aGlzLmF1dGhfa2V5PW51bGw7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJpZFwiKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImF1dGhfa2V5XCIpO1xyXG4gICAgICAgIHRoaXMudWkuU2hvd0xvZ2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgU3RvcmVMb2dpbihpZDpzdHJpbmcsIGF1dGhfa2V5OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkPWlkO1xyXG4gICAgICAgIHRoaXMuYXV0aF9rZXk9YXV0aF9rZXk7XHJcblxyXG4gICAgICAgIC8vc2F2ZSB0byBsb2NhbHN0b3JhZ2UsIHNvIHdlIGNhbiBzdGF5IGxvZ2dlZCBpbiBvbiBicm93c2VyIHJlZnJlc2hcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlkXCIsIGlkKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImF1dGhfa2V5XCIsIGF1dGhfa2V5KTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJTdG9yZUxvZ2luIFJhbiwgdGhpcyBpczogXCIrdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuICAgICAgICB0aGlzLkxvZ2dlZEluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2dnZWRJbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zbyBoaWRlIGxvZ2luLyByZWdpc3RlciBkYXRhLCBhbmQgc2hvdyB0aGUgdGFzayB0cmFja2VyIGludGVyZmFjZVxyXG4gICAgICAgIHRoaXMudWkuU2hvd1Rhc2tUcmFja2VyKCk7XHJcbiAgICAgICAgdGhpcy5HZXRUYXNrc015U1FMRGF0ZXMobnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFN1Ym1pdFRhc2soKVxyXG4gICAge1xyXG4gICAgICAgIC8vaGlkZSB0aGUgQWRkVGFza0Zvcm0gYW5kIFNob3cgdGhlIEFkZFRhc2tCdXR0b24gYWdhaW5cclxuICAgICAgICB0aGlzLnVpLlNob3dBZGRUYXNrQnRuKCk7XHJcblxyXG4gICAgICAgIC8vZmlyc3QgZ2V0IGFsbCB0aGUgZmllbGRzXHJcbiAgICAgICAgbGV0IHRhc2s6c3RyaW5nID0gVG9vbHMuU2FuaXRpemVJbnB1dCg8c3RyaW5nPiQoXCIjbmV3X3Rhc2tfbmFtZVwiKS52YWwoKSk7XHJcbiAgICAgICAgbGV0IGNhdGVnb3J5OnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPHN0cmluZz4kKFwiI25ld190YXNrX2NhdGVnb3J5XCIpLnZhbCgpKTtcclxuICAgICAgICBsZXQgc3RhcnRfZGF0ZTpzdHJpbmcgPSA8c3RyaW5nPiQoXCIjdGFza19zdGFydF9kYXRlXCIpLnZhbCgpOyAvL0phbiAyNCAyMDE4XHJcbiAgICAgICAgbGV0IHN0YXJ0X3RpbWU6c3RyaW5nID0gPHN0cmluZz4kKFwiI3Rhc2tfc3RhcnRfdGltZVwiKS52YWwoKTsgLy84IDogMjUgUE1cclxuICAgICAgICBsZXQgZGF0ZV9teXNxbDpzdHJpbmcgPSBEYXRlVGltZS5HZXREYXRlRm9yTXlTUUxGcm9tUmVhZGFibGUoc3RhcnRfZGF0ZSk7XHJcbiAgICAgICAgbGV0IHRpbWVfbXlzcWw6c3RyaW5nID0gRGF0ZVRpbWUuR2V0VGltZUZvck15U1FMRnJvbVJlYWRhYmxlKHN0YXJ0X3RpbWUpO1xyXG4gICAgICAgIGxldCBkYXRlX3RpbWVfbXlzcWw6c3RyaW5nID0gZGF0ZV9teXNxbCsgXCIgXCIrIHRpbWVfbXlzcWw7XHJcblxyXG4gICAgICAgIC8vbm93IHNlbmQgaXQgdG8gcGhwXHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cIkFkZFRhc2tcIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnVzZXJfaWQ9dGhpcy5pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmF1dGhfa2V5PXRoaXMuYXV0aF9rZXk7XHJcblxyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoudGFzaz10YXNrO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouY2F0ZWdvcnk9Y2F0ZWdvcnk7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5kYXRlX3RpbWU9ZGF0ZV90aW1lX215c3FsO1xyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHN1Ym1pdCB0aGVtIHRvIHRoZSBwaHAgcGFnZVxyXG4gICAgICAgIGxldCBzZWxmOk1haW5PYmogPSB0aGlzOy8vIFRoZSBhamF4IGZ1bmN0aW9ucyBhcmUgaW5zaWRlIGEgZGlmZmVyZW50IG9iamVjdCwgc28gdGhpcyB3b24ndCByZWZlciB0byB0aGlzIG9iamVjdCBhbnltb3JlLCBzbyBoYXZlIHRvIG1ha2UgYW4gYWxpYXMgdXAgaGVyZSBmb3IgaXQgdG8gc3RpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIG9iamVjdCB3ZSdyZSBpblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfU1VDQ0VTUyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGFza19pZDpudW1iZXIgPSBwYXJzZUludChqc29uX29iai5pZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGJhY2sgbmV3IHRhc2sgaWQ6IFwiK3Rhc2tfaWQpO1xyXG5cclxuICAgICAgICAgICAgLy9jbGVhciB0aGUgZm9ybVxyXG4gICAgICAgICAgICAkKFwiI25ld190YXNrX25hbWVcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKFwiI25ld190YXNrX2NhdGVnb3J5XCIpLnZhbChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRoZSB0YXNrIHRvIG91ciB0YXNrcyBhcnJheVxyXG4gICAgICAgICAgICBsZXQgdGFzazpUYXNrID0gbmV3IFRhc2soKTtcclxuXHJcbiAgICAgICAgICAgIHRhc2suaWQ9dGFza19pZDtcclxuICAgICAgICAgICAgdGFzay50YXNrPWRhdGFfdG9fc2VuZF9vYmoudGFzaztcclxuICAgICAgICAgICAgdGFzay5jYXRlZ29yeT1kYXRhX3RvX3NlbmRfb2JqLmNhdGVnb3J5O1xyXG4gICAgICAgICAgICB0YXNrLlNldFN0YXJ0RGF0ZVRpbWVGcm9tTXlTUUwoZGF0YV90b19zZW5kX29iai5kYXRlX3RpbWUpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi50YXNrc1t0YXNrX2lkXT10YXNrO1xyXG5cclxuICAgICAgICAgICAgLy9hZGQgdGhlIHRhc2sgdG8gb3VyIFVJXHJcbiAgICAgICAgICAgIHNlbGYuQWRkVGFzayh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi51aS5TaG93RmVlZEJhY2soanNvbl9vYmoubWVzc2FnZSwgVUkuTUVTU0FHRV9FUlJPUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLkFqYXhDYWxsKHN1Y2Nlc3MsIGVycm9yLCBkYXRhX3RvX3NlbmRfb2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRWRpdFRhc2soZWRpdF9idG46SFRNTEVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFZGl0IHRhc2sgY2FsbGVkIGZyb20gZWxlbWVudDogXCIrZWRpdF9idG4rXCIsIFxcbmpzb246XCIrSlNPTi5zdHJpbmdpZnkoZWRpdF9idG4pK1wiXFxuY2xhc3M6IFwiK2VkaXRfYnRuLmNsYXNzTGlzdCk7XHJcbiAgICAgICAgLy9zaG91bGQgYmUgYWJsZSB0byBnZXQgdGhlIGF0dHJpYnV0ZSB0aGlzIHdheTpcclxuICAgICAgICBsZXQgdGFza19pZDpudW1iZXIgPSBwYXJzZUludCg8c3RyaW5nPmVkaXRfYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtdGFzay1pZFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXNrIGlkOiBcIit0YXNrX2lkKTtcclxuXHJcbiAgICAgICAgLy9maXJzdCBzaG91bGQgbWFrZSBzdXJlIHRhc2sgZWRpdCBpcyBub3QgYWxyZWFkeSBkaXNwbGF5ZWQgdW5kZXJuZWF0aCB0aGlzLSBvdGhlcndpc2Ugd2Ugc2hvdWxkIHJlbW92ZSBpdC8gaGlkZSBpdCAocmVtb3ZpbmcgaXQgbWlnaHQgYmUgYmV0dGVyKVxyXG4gICAgICAgIGxldCBleGlzdGluZ190YXNrX2VkaXQ6SlF1ZXJ5PSAkKFwiI3Rhc2stXCIrdGFza19pZCkuZmluZChcIi50YXNrc19lZGl0XCIpO1xyXG4gICAgICAgIGlmKGV4aXN0aW5nX3Rhc2tfZWRpdC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3JlbW92ZSBpdCBhbmQgcmV0dXJuO1xyXG4gICAgICAgICAgICBleGlzdGluZ190YXNrX2VkaXQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vc28gbm93IGxldHMgdW5oaWRlIHRoZSBlZGl0IHRhc2sgYXJlYSAocHV0IGl0IHVuZGVyIHRoaXMgdGFzayksIGFuZCBwb3B1bGF0ZSB0aGUgdmFsdWVzXHJcbiAgICAgICAgbGV0IHRhc2tfZWRpdDpKUXVlcnkgPSAkKFwiI3Rhc2tzX2VkaXRcIikuY2xvbmUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIHRhc2tfZWRpdC5yZW1vdmVBdHRyKFwiaWRcIik7Ly9yZW1vdmUgaWQgZnJvbSBpdFxyXG4gICAgICAgIHRhc2tfZWRpdC5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgdGFza19lZGl0LmF0dHIoXCJpZFwiLCBcInRhc2stZWRpdC1cIit0YXNrX2lkKTtcclxuXHJcbiAgICAgICAgdGFza19lZGl0LmFwcGVuZFRvKFwiI3Rhc2stXCIrdGFza19pZCk7XHJcblxyXG4gICAgICAgIC8vYWRkIHRhc2sgaWQgdG8gY2xvc2UgYnRuIHRvIGJlIGFibGUgdG8gY2xvc2UgdGhpc1xyXG4gICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLmJ0bi1jbG9zZS10YXNrXCIpLmF0dHIoXCJkYXRhLXRhc2staWRcIiwgdGFza19pZCk7XHJcbiAgICAgICAgdGFza19lZGl0LmZpbmQoXCIuYnRuLWRlbGV0ZS10YXNrXCIpLmF0dHIoXCJkYXRhLXRhc2staWRcIiwgdGFza19pZCk7XHJcbiAgICAgICAgdGFza19lZGl0LmZpbmQoXCIuYnRuLXVwZGF0ZS10YXNrXCIpLmF0dHIoXCJkYXRhLXRhc2staWRcIiwgdGFza19pZCk7XHJcblxyXG4gICAgICAgIC8vbm93IHBvcHVsYXRlIGluIGFsbCB0aGUgdGFzayBpbmZvOlxyXG4gICAgICAgIC8vaGF2ZSB0byBncmFiIHRoZSB0YXNrIG9iamVjdFxyXG4gICAgICAgIGxldCB0YXNrOlRhc2sgPSB0aGlzLnRhc2tzW3Rhc2tfaWRdO1xyXG4gICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtbmFtZVwiKS52YWwoVG9vbHMuVW5TYW5pdGl6ZUlucHV0KHRhc2sudGFzaykpO1xyXG4gICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtY2F0ZWdvcnlcIikudmFsKFRvb2xzLlVuU2FuaXRpemVJbnB1dCh0YXNrLmNhdGVnb3J5KSk7XHJcblxyXG5cclxuICAgICAgICB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LXN0YXJ0LWRhdGVcIikudmFsKHRhc2suc3RhcnRfZGF0ZV90aW1lLmRhdGVfZGlzcGxheSk7XHJcbiAgICAgICAgdGFza19lZGl0LmZpbmQoXCIudGFzay1pbnB1dC1zdGFydC10aW1lXCIpLnZhbCh0YXNrLnN0YXJ0X2RhdGVfdGltZS50aW1lX2Rpc3BsYXkpO1xyXG5cclxuXHJcbiAgICAgICAgaWYodGFzay5lbmRfZGF0ZV90aW1lIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFza19lZGl0LmZpbmQoXCIudGFzay1pbnB1dC1lbmQtZGF0ZVwiKS52YWwodGFzay5lbmRfZGF0ZV90aW1lLmRhdGVfZGlzcGxheSk7XHJcbiAgICAgICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtZW5kLXRpbWVcIikudmFsKHRhc2suZW5kX2RhdGVfdGltZS50aW1lX2Rpc3BsYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hbHNvIGhhdmUgdG8gc2V0IHRoZSB0aW1lIGFuZCBkYXRlIGZpZWxkcyB0byBiZSBhYmxlIHRvIHVzZSB0aGUgZGF0ZSBhbmQgdGltZSBqYXZhc2NyaXB0IGxpYnJhcmllcyBmb3IgbmljZSBVSVxyXG4gICAgICAgIC8vTk9URTogdGhpcyB3aWxsIHJlc2V0IHRoZSB0aW1lLyBkYXRlIHRvIHRoZSBjdXJyZW50IHZhbHVlXHJcbiAgICAgICAgdGhpcy51aS5XaXJlVXBEYXRlKCB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LXN0YXJ0LWRhdGVcIiksIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVpLldpcmVVcFRpbWUoIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtc3RhcnQtdGltZVwiKSxmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMudWkuV2lyZVVwRGF0ZSggdGFza19lZGl0LmZpbmQoXCIudGFzay1pbnB1dC1lbmQtZGF0ZVwiKSxmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51aS5XaXJlVXBUaW1lKCB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LWVuZC10aW1lXCIpLGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xvc2VFZGl0VGFzayhidG5fY2xvc2U6SFRNTEVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhc2tfaWQ6bnVtYmVyID0gcGFyc2VJbnQoPHN0cmluZz5idG5fY2xvc2UuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrLWlkXCIpKTtcclxuICAgICAgICBsZXQgZXhpc3RpbmdfdGFza19lZGl0OkpRdWVyeT0gJChcIiN0YXNrLVwiK3Rhc2tfaWQpLmZpbmQoXCIudGFza3NfZWRpdFwiKTtcclxuICAgICAgICBpZihleGlzdGluZ190YXNrX2VkaXQubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9yZW1vdmUgaXQgYW5kIHJldHVybjtcclxuICAgICAgICAgICAgZXhpc3RpbmdfdGFza19lZGl0LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgRm9yIGZpbmlzaGluZyB0aGUgdGFzayBqdXN0IGNsaWNraW5nIG9uIHRoZSBidXR0b24tIHRvIGZpbmlzaCBpdCBxdWljayB3aXRodCBoZSBjdXJyZW50IGRhdGUvIHRpbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZpbmlzaFRhc2soYnRuX2NsaWNrZWQ6SFRNTEVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy9maXJzdCBnZXQgd2hpY2ggdGFzayBpdCB3YXNcclxuICAgICAgICBsZXQgdGFza19pZDpudW1iZXIgPSBwYXJzZUludCg8c3RyaW5nPmJ0bl9jbGlja2VkLmdldEF0dHJpYnV0ZShcImRhdGEtdGFzay1pZFwiKSk7XHJcblxyXG4gICAgICAgIC8vbm93IGNvbnZlcnQgcmVhZGFibGUgZGF0ZXMgYW5kIHRpbWVzIHRvIG15c3FsIGNvbXBhdGlibGUgb25lc1xyXG4gICAgICAgIGxldCBkYXRlX3RpbWVfbXlzcWxfZW5kOnN0cmluZyA9IERhdGVUaW1lLkdldEN1cnJlbnREYXRlVGltZU15U1FMKCk7XHJcblxyXG4gICAgICAgIC8vbm93IHNlbmQgaXQgdG8gcGhwXHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cIkZpbmlzaFRhc2tcIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnVzZXJfaWQ9dGhpcy5pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmF1dGhfa2V5PXRoaXMuYXV0aF9rZXk7XHJcblxyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoudGFza19pZD10YXNrX2lkO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX2VuZD1kYXRlX3RpbWVfbXlzcWxfZW5kO1xyXG5cclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyBzdWJtaXQgdGhlbSB0byB0aGUgcGhwIHBhZ2VcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3NvIG5vdyB1cGRhdGUgdGhlIHRhc2sgb2JqZWN0IGluIHRoZSBhcnJheSB3ZSBhbHJlYWR5IGhhdmUgd2l0aCB0aGUgdXBkYXRlLCB0aGVuIHRlbGwgdGhlIFVJIHRvIHVwZGF0ZSB0aGF0IHRhc2tcclxuICAgICAgICAgICAgc2VsZi50YXNrc1t0YXNrX2lkXS50YXNrPSBkYXRhX3RvX3NlbmRfb2JqLnRhc2tfbmFtZTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudGFza3NbdGFza19pZF0uU2V0RW5kRGF0ZVRpbWVGcm9tTXlTUUwoZGF0YV90b19zZW5kX29iai5kYXRlX3RpbWVfZW5kKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhlbiB0ZWxsIG1haW4gdGhpcyB0YXNrIG5lZWRzIHRvIGJlIHVwZGF0ZWQgaW4gdGhlIFVJXHJcbiAgICAgICAgICAgIHNlbGYuU2V0VGFza1VJRnJvbVRhc2soJChcIiN0YXNrLVwiK3Rhc2tfaWQpLCBzZWxmLnRhc2tzW3Rhc2tfaWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi51aS5TaG93RmVlZEJhY2soanNvbl9vYmoubWVzc2FnZSwgVUkuTUVTU0FHRV9FUlJPUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLkFqYXhDYWxsKHN1Y2Nlc3MsIGVycm9yLCBkYXRhX3RvX3NlbmRfb2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlVGFzayhidG5fdXBkYXRlX3Rhc2s6SFRNTEVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy9maXJzdCBnZXQgd2hpY2ggdGFzayBpdCB3YXNcclxuICAgICAgICBsZXQgdGFza19pZDpudW1iZXIgPSBwYXJzZUludCg8c3RyaW5nPmJ0bl91cGRhdGVfdGFzay5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2staWRcIikpO1xyXG5cclxuICAgICAgICAvL3RoZW4gZ2V0IGFsbCB0aGUgdmFsdWVzIGZyb20gdGhlIGlucHV0c1xyXG4gICAgICAgIC8vZ3JhYiB0aGUgZWRpdCB3aW5kb3dcclxuICAgICAgICBsZXQgdGFza19lZGl0X3dpbmRvdzpKUXVlcnkgPSAgJChcIiN0YXNrLWVkaXQtXCIrdGFza19pZCk7XHJcblxyXG4gICAgICAgIC8vbGV0cyBjaGVjayBpZiB3ZSBhY3R1YWxseSBmb3VkbiB0aGUgd2luZG93OlxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiXCIpXHJcblxyXG4gICAgICAgIGxldCB0YXNrX25hbWU6c3RyaW5nID0gVG9vbHMuU2FuaXRpemVJbnB1dCg8c3RyaW5nPnRhc2tfZWRpdF93aW5kb3cuZmluZChcIi50YXNrLWlucHV0LW5hbWVcIikudmFsKCkpO1xyXG4gICAgICAgIGxldCB0YXNrX2NhdGVnb3J5OnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPHN0cmluZz50YXNrX2VkaXRfd2luZG93LmZpbmQoXCIudGFzay1pbnB1dC1jYXRlZ29yeVwiKS52YWwoKSk7XHJcbiAgICAgICAgbGV0IHRhc2tfZGF0ZV9zdGFydF9zdHI6c3RyaW5nID0gPHN0cmluZz50YXNrX2VkaXRfd2luZG93LmZpbmQoXCIudGFzay1pbnB1dC1zdGFydC1kYXRlXCIpLnZhbCgpO1xyXG4gICAgICAgIGxldCB0YXNrX3RpbWVfc3RhcnRfc3RyOnN0cmluZyA9IDxzdHJpbmc+dGFza19lZGl0X3dpbmRvdy5maW5kKFwiLnRhc2staW5wdXQtc3RhcnQtdGltZVwiKS52YWwoKTtcclxuICAgICAgICBsZXQgdGFza19kYXRlX2VuZF9zdHI6c3RyaW5nID0gPHN0cmluZz50YXNrX2VkaXRfd2luZG93LmZpbmQoXCIudGFzay1pbnB1dC1lbmQtZGF0ZVwiKS52YWwoKTtcclxuICAgICAgICBsZXQgdGFza190aW1lX2VuZF9zdHI6c3RyaW5nID0gPHN0cmluZz50YXNrX2VkaXRfd2luZG93LmZpbmQoXCIudGFzay1pbnB1dC1lbmQtdGltZVwiKS52YWwoKTtcclxuXHJcbiAgICAgICAgLy9ub3Qgd29ya2luZyBjb3JycmVjdGx5XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnb2luZyB0byBzdWJtaXQgdXBkYXRlIHRhc2sgd2l0aCB2YWx1ZXM6IFxcblwiK3Rhc2tfbmFtZStcIlxcblwiK3Rhc2tfY2F0ZWdvcnkrXCJcXG5cIit0YXNrX2RhdGVfc3RhcnRfc3RyK1wiXFxuXCIrdGFza190aW1lX3N0YXJ0X3N0citcIlxcblwiK3Rhc2tfZGF0ZV9lbmRfc3RyK1wiXFxuXCIrdGFza190aW1lX2VuZF9zdHIpO1xyXG5cclxuICAgICAgICAvL25vdyBjb252ZXJ0IHJlYWRhYmxlIGRhdGVzIGFuZCB0aW1lcyB0byBteXNxbCBjb21wYXRpYmxlIG9uZXNcclxuICAgICAgICBsZXQgZGF0ZV90aW1lX215c3FsX3N0YXJ0OnN0cmluZ3xudWxsID0gRGF0ZVRpbWUuR2V0RGF0ZVRpbWVGb3JNeVNRTEZyb21SZWFkYWJsZSh0YXNrX2RhdGVfc3RhcnRfc3RyLCB0YXNrX3RpbWVfc3RhcnRfc3RyKTtcclxuICAgICAgICBsZXQgZGF0ZV90aW1lX215c3FsX2VuZDpzdHJpbmd8bnVsbCA9IERhdGVUaW1lLkdldERhdGVUaW1lRm9yTXlTUUxGcm9tUmVhZGFibGUodGFza19kYXRlX2VuZF9zdHIsIHRhc2tfdGltZV9lbmRfc3RyKTtcclxuICAgICAgICBpZihUb29scy5Jc051bGwoZGF0ZV90aW1lX215c3FsX2VuZCkpXHJcbiAgICAgICAgICAgIGRhdGVfdGltZV9teXNxbF9lbmQ9XCJOVUxMXCI7XHJcblxyXG4gICAgICAgIC8vbm93IHNlbmQgaXQgdG8gcGhwXHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cIlVwZGF0ZVRhc2tcIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnVzZXJfaWQ9dGhpcy5pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmF1dGhfa2V5PXRoaXMuYXV0aF9rZXk7XHJcblxyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoudGFza19pZD10YXNrX2lkO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoudGFza19uYW1lPXRhc2tfbmFtZTtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmNhdGVnb3J5PXRhc2tfY2F0ZWdvcnk7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5kYXRlX3RpbWVfc3RhcnQ9ZGF0ZV90aW1lX215c3FsX3N0YXJ0O1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX2VuZD1kYXRlX3RpbWVfbXlzcWxfZW5kO1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoucGFyZW50X2lkPW51bGw7XHJcblxyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHN1Ym1pdCB0aGVtIHRvIHRoZSBwaHAgcGFnZVxyXG4gICAgICAgIGxldCBzZWxmOk1haW5PYmogPSB0aGlzOy8vIFRoZSBhamF4IGZ1bmN0aW9ucyBhcmUgaW5zaWRlIGEgZGlmZmVyZW50IG9iamVjdCwgc28gdGhpcyB3b24ndCByZWZlciB0byB0aGlzIG9iamVjdCBhbnltb3JlLCBzbyBoYXZlIHRvIG1ha2UgYW4gYWxpYXMgdXAgaGVyZSBmb3IgaXQgdG8gc3RpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIG9iamVjdCB3ZSdyZSBpblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vc28gbm93IHVwZGF0ZSB0aGUgdGFzayBvYmplY3QgaW4gdGhlIGFycmF5IHdlIGFscmVhZHkgaGF2ZSB3aXRoIHRoZSB1cGRhdGUsIHRoZW4gdGVsbCB0aGUgVUkgdG8gdXBkYXRlIHRoYXQgdGFza1xyXG4gICAgICAgICAgICBzZWxmLnRhc2tzW3Rhc2tfaWRdLnRhc2s9IGRhdGFfdG9fc2VuZF9vYmoudGFza19uYW1lO1xyXG4gICAgICAgICAgICBzZWxmLnRhc2tzW3Rhc2tfaWRdLmNhdGVnb3J5PSBkYXRhX3RvX3NlbmRfb2JqLmNhdGVnb3J5O1xyXG4gICAgICAgICAgICBzZWxmLnRhc2tzW3Rhc2tfaWRdLlNldFN0YXJ0QW5kRW5kRGF0ZVRpbWVGcm9tTXlTUUwoZGF0YV90b19zZW5kX29iai5kYXRlX3RpbWVfc3RhcnQsIGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX2VuZCk7XHJcblxyXG4gICAgICAgICAgICAvL3JlbW92ZSB0aGUgZWRpdCBhcmVhXHJcbiAgICAgICAgICAgIHRhc2tfZWRpdF93aW5kb3cucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL3RoZW4gdGVsbCBtYWluIHRoaXMgdGFzayBuZWVkcyB0byBiZSB1cGRhdGVkIGluIHRoZSBVSVxyXG4gICAgICAgICAgICBzZWxmLlNldFRhc2tVSUZyb21UYXNrKCQoXCIjdGFzay1cIit0YXNrX2lkKSwgc2VsZi50YXNrc1t0YXNrX2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfRVJST1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5BamF4Q2FsbChzdWNjZXNzLCBlcnJvciwgZGF0YV90b19zZW5kX29iaik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEZvciBhZGRpbmcgYSBuZXcgdGFzayBpbiB0aGUgVUkgZnJvbSBiZWluZyBzZW50IGEgdGFzayBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBBZGRUYXNrKHRhc2s6VGFzaylcclxuICAgIHtcclxuICAgICAgICBsZXQgdGFza19wcm90b3R5cGU6SlF1ZXJ5ID0gJChcIiN0YXNrX2Rpc3BsYXllZF9wcm90b1R5cGVcIikuY2xvbmUodHJ1ZSk7XHJcbiAgICAgICAgdGFza19wcm90b3R5cGUuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHRhc2tfcHJvdG90eXBlLnJlbW92ZUF0dHIoXCJpZFwiKTtcclxuXHJcbiAgICAgICAgLy9zaG91bGQgc29ydCB0aGVtIGludG8gdW5maW5pc2hlZCB0YXNrcyB2cy4gZmluaXNoZWQgdGFza3NcclxuICAgICAgICBpZih0YXNrLmVuZF9kYXRlX3RpbWUhPW51bGwpXHJcbiAgICAgICAgICAgIC8vdGFza19wcm90b3R5cGUucHJlcGVuZFRvKFwiI3Rhc2tzX2NvbnRhaW5lcl9kYXRlX3JhbmdlXCIpOy8vcHJlcGVuZC0gc28gdGhleSBhcmUgb3JnYW5pemVkIGJ5IGRhdGUvIG1vc3QgcmVjZW50XHJcbiAgICAgICAgICAgdGFza19wcm90b3R5cGUuYXBwZW5kVG8oXCIjdGFza3NfY29udGFpbmVyX2RhdGVfcmFuZ2VcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAvLyB0YXNrX3Byb3RvdHlwZS5wcmVwZW5kVG8oXCIjdGFza3NfY29udGFpbmVyX3VuZmluaXNoZWRcIik7XHJcbiAgICAgICAgICAgIHRhc2tfcHJvdG90eXBlLmFwcGVuZFRvKFwiI3Rhc2tzX2NvbnRhaW5lcl91bmZpbmlzaGVkXCIpO1xyXG5cclxuICAgICAgICAvL2FkZCB0aGUgaWQgdG8gaXQsIHNvIHdlIGNhbiBmZXRjaCBpdCBlYXNpbHlcclxuICAgICAgICB0YXNrX3Byb3RvdHlwZS5hdHRyKFwiaWRcIiwgXCJ0YXNrLVwiK3Rhc2suaWQpO1xyXG4gICAgICAgIHRoaXMuU2V0VGFza1VJRnJvbVRhc2sodGFza19wcm90b3R5cGUsIHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBVbml2ZXJzYWwgZm9yIHNldHRpbmcgYSB0YXNrIFVJIGZyb20gYSB0YXNrIG9iamVjdC0gYm90aCBmb3IgdXBkYXRpbmcgYW5kIGZvciBuZXcgb25lc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFNldFRhc2tVSUZyb21UYXNrKHRhc2tfdWk6SlF1ZXJ5LCB0YXNrOlRhc2spXHJcbiAgICB7XHJcbiAgICAgICAgLy9ub3cgY2hhbmdlIG91dCB0aGUgdGFnIHZhbHVlc1xyXG4gICAgICAgIHRhc2tfdWkuZmluZChcIi50YXNrX2Rpc3BsYXllZF9uYW1lXCIpLmh0bWwoVG9vbHMuVW5TYW5pdGl6ZUlucHV0KHRhc2sudGFzaykpO1xyXG4gICAgICAgIHRhc2tfdWkuZmluZChcIi50YXNrX2Rpc3BsYXllZF9jYXRlZ29yeVwiKS5odG1sKFwiKFwiK1Rvb2xzLlVuU2FuaXRpemVJbnB1dCh0YXNrLmNhdGVnb3J5KStcIilcIik7XHJcbiAgICAgICAgdGFza191aS5maW5kKFwiLnRhc2tfZGlzcGxheWVkX3N0YXJ0XCIpLmh0bWwoXCJTdGFydDogXCIrdGFzay5zdGFydF9kYXRlX3RpbWUuZGF0ZV9kaXNwbGF5KyBcIiwgIFwiK3Rhc2suc3RhcnRfZGF0ZV90aW1lLnRpbWVfZGlzcGxheSk7XHJcblxyXG4gICAgICAgIGlmKCFUb29scy5Jc051bGwodGFzay5lbmRfZGF0ZV90aW1lX3N0cikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXNrX3VpLmZpbmQoXCIudGFza19kaXNwbGF5ZWRfZW5kXCIpLmh0bWwoKFwiPGJyLz5FbmQ6IFwiICsgKDxEYXRlVGltZT50YXNrLmVuZF9kYXRlX3RpbWUpLmRhdGVfZGlzcGxheSArIFwiLCAgXCIgKyAoPERhdGVUaW1lPnRhc2suZW5kX2RhdGVfdGltZSkudGltZV9kaXNwbGF5KSk7XHJcbiAgICAgICAgICAgIHRhc2tfdWkuZmluZChcIi5idG4tZmluaXNoLXRhc2tcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7Ly9oaWRlIGVuZCB0YXNrIGJ1dHRvblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXNrX3VpLmZpbmQoXCIuYnRuLWZpbmlzaC10YXNrXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTsvL2hpZGUgZW5kIHRhc2sgYnV0dG9uXHJcbiAgICAgICAgICAgIHRhc2tfdWkuZmluZChcIi50YXNrX2Rpc3BsYXllZF9lbmRcIikuaHRtbChcIihUYXNrIG5vdCBmaW5pc2hlZCkgXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hbHNvIHN0b3JlIHRoZSB0YXNrIGlkIG9uIHRoZSBlZGl0IGJ0bjpcclxuICAgICAgICB0YXNrX3VpLmZpbmQoXCIuYnRuLWVkaXQtdGFza1wiKS5hdHRyKFwiZGF0YS10YXNrLWlkXCIsIHRhc2suaWQpO1xyXG4gICAgICAgIHRhc2tfdWkuZmluZChcIi5idG4tZmluaXNoLXRhc2tcIikuYXR0cihcImRhdGEtdGFzay1pZFwiLCB0YXNrLmlkKTtcclxuXHJcblxyXG4gICAgICAgIGlmKCFUb29scy5Jc051bGwodGFzay5lbmRfZGF0ZV90aW1lX3N0cikgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHRpbWVfZGlmZjpzdHJpbmcgPSBEYXRlVGltZS5EaWZmZXJlbmNlSW5NaW5zKHRhc2suc3RhcnRfZGF0ZV90aW1lLCA8RGF0ZVRpbWU+dGFzay5lbmRfZGF0ZV90aW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmb3IgdGFzazogXCIrdGFzay50YXNrK1wiLCB0aW1lIGRpZmZlcmVuY2U6IFwiK3RpbWVfZGlmZik7XHJcbiAgICAgICAgICAgIC8vcHV0IGluIHRoZSB0b3RhbCB0aW1lXHJcbiAgICAgICAgICAgIHRhc2tfdWkuZmluZChcIi50YXNrX2Rpc3BsYXllZF90b3RhbFwiKS5odG1sKFwiPGJyLz5Ub3RhbCB0aW1lOiBcIit0aW1lX2RpZmYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0YXNrX3VpLmZpbmQoXCIudGFza19kaXNwbGF5ZWRfdG90YWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9zaG91bGQgYmUgY2FsbGVkIGZyb20gY2xhc3MgJ2J0bi1kZWxldGUtdGFzaydcclxuICAgIHB1YmxpYyBEZWxldGVUYXNrKGJ0bl9jbGlja2VkOkhUTUxFbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzZWxmOk1haW5PYmogPSB0aGlzO1xyXG4gICAgICAgIGxldCB0YXNrX2lkOm51bWJlciA9IHBhcnNlSW50KDxzdHJpbmc+YnRuX2NsaWNrZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrLWlkXCIpKTtcclxuICAgICAgICAvL3Nob3VsZCBzaG93IHBvcHVwIGNvbmZpcm1hdGlvblxyXG4gICAgICAgIHZleC5kaWFsb2cuY29uZmlybSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSB0YXNrICcrc2VsZi50YXNrc1t0YXNrX2lkXS50YXNrLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlOmJvb2xlYW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkRlbGV0ZVRhc2tBZnRlckNvbmYoYnRuX2NsaWNrZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRGVsZXRlVGFza0FmdGVyQ29uZihidG5fY2xpY2tlZDpIVE1MRWxlbWVudClcclxuICAgIHtcclxuICAgICAgICAvL2ZpcnN0IGdldCB3aGljaCB0YXNrIGl0IHdhc1xyXG4gICAgICAgIGxldCB0YXNrX2lkOm51bWJlciA9IHBhcnNlSW50KDxzdHJpbmc+YnRuX2NsaWNrZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrLWlkXCIpKTtcclxuXHJcbiAgICAgICAgLy90aGVuIGdldCBhbGwgdGhlIHZhbHVlcyBmcm9tIHRoZSBpbnB1dHNcclxuICAgICAgICAvL2dyYWIgdGhlIGVkaXQgd2luZG93XHJcbiAgICAgICAgbGV0IHRhc2tfZWRpdF93aW5kb3c6SlF1ZXJ5ID0gICQoXCIjdGFzay1lZGl0LVwiK3Rhc2tfaWQpO1xyXG5cclxuXHJcbiAgICAgICAgLy9ub3Qgd29ya2luZyBjb3JycmVjdGx5XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnb2luZyB0byBkZWxldGUgdGFzayBpZDogXCIrdGFza19pZCk7XHJcblxyXG4gICAgICAgIC8vbm93IHNlbmQgaXQgdG8gcGhwXHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cIkRlbGV0ZVRhc2tcIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnVzZXJfaWQ9dGhpcy5pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmF1dGhfa2V5PXRoaXMuYXV0aF9rZXk7XHJcblxyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmoudGFza19pZD10YXNrX2lkO1xyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHN1Ym1pdCB0aGVtIHRvIHRoZSBwaHAgcGFnZVxyXG4gICAgICAgIGxldCBzZWxmOk1haW5PYmogPSB0aGlzOy8vIFRoZSBhamF4IGZ1bmN0aW9ucyBhcmUgaW5zaWRlIGEgZGlmZmVyZW50IG9iamVjdCwgc28gdGhpcyB3b24ndCByZWZlciB0byB0aGlzIG9iamVjdCBhbnltb3JlLCBzbyBoYXZlIHRvIG1ha2UgYW4gYWxpYXMgdXAgaGVyZSBmb3IgaXQgdG8gc3RpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIG9iamVjdCB3ZSdyZSBpblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudGFza3MuZm9yRWFjaChmdW5jdGlvbihpdGVtOlRhc2spe2NvbnNvbGUubG9nKGl0ZW0uaWQrXCI6IFwiK2l0ZW0udGFzayl9KTtcclxuICAgICAgICAgICAgZGVsZXRlIHNlbGYudGFza3NbdGFza19pZF07XHJcbiAgICAgICAgICAgIHNlbGYudGFza3MuZm9yRWFjaChmdW5jdGlvbihpdGVtOlRhc2spe2NvbnNvbGUubG9nKGl0ZW0uaWQrXCI6IFwiK2l0ZW0udGFzayl9KTtcclxuXHJcbiAgICAgICAgICAgIC8vYWxzbyByZW1vdmUgdGhlIHRhc2sgKGFuZCBlZGl0IGFyZWEpIGZyb20gdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAvL3NvIGZpbmQgdGFzayBpZCBvZiBIVE1MIGVsZW1lbnQgYW5kIHJlbW92ZSBpdFxyXG4gICAgICAgICAgICAkKFwiI3Rhc2stXCIrdGFza19pZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfRVJST1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5BamF4Q2FsbChzdWNjZXNzLCBlcnJvciwgZGF0YV90b19zZW5kX29iaik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIE5lZWRzIHRvIGJlIGluIG15c3FsIGRhdGUgdGltZSBmb3JtYXQgbGlrZTpcclxuICAgIDIwMTItMDYtMjIgMDU6NDA6MDZcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFRhc2tzTXlTUUxEYXRlcyhkYXRlX3RpbWVfc3RhcnQ6c3RyaW5nfG51bGwsIGRhdGVfdGltZV9lbmQ6c3RyaW5nfG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZXRUYXNrc015U1FMRGF0ZXMgY2xpY2tlZCFcIik7XHJcblxyXG4gICAgICAgIC8vaWYgd2UgcGFzcyAyIG51bGxzLCB3ZSdsbCBqdXN0IHVzZSB0aGUgZGVmYXVsdCBkYXRlIHJhbmdlXHJcbiAgICAgICAgaWYoZGF0ZV90aW1lX3N0YXJ0PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9sZXRzIGRvIHVwIHRvIDMwIGRheXMgYWdvIGJ5IGRlZmF1bHQgcmlnaHQgbm93P1xyXG4gICAgICAgICAgICBsZXQgZGF0ZV90aW1lX2FnbzpEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZGF0ZV90aW1lX2Fnby5zZXREYXRlKGRhdGVfdGltZV9hZ28uZ2V0RGF0ZSgpIC0gMzApO1xyXG5cclxuICAgICAgICAgICAgLy9mb3IgYWRkaW5nIGxlYWRpbmcgemVyb2VzIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM2MDUyMTQvamF2YXNjcmlwdC1hZGQtbGVhZGluZy16ZXJvZXMtdG8tZGF0ZVxyXG4gICAgICAgICAgICAvLy0yIGdpdmVzIGp1c3QgdGhlIGxhc3QgMiBkaWdpdHNcclxuICAgICAgICAgICAgbGV0IGRheV9udW0xOnN0cmluZyA9IChcIjBcIitkYXRlX3RpbWVfYWdvLmdldERhdGUoKSkuc2xpY2UoLTIpO1xyXG4gICAgICAgICAgICBsZXQgbW9udGhfbnVtMTpzdHJpbmcgPSAoXCIwXCIrZGF0ZV90aW1lX2Fnby5nZXRNb250aCgpKzEpLnNsaWNlKC0yKTtcclxuXHJcbiAgICAgICAgICAgIC8vaGF2ZSB0byBhZGQgMSB0byBtb250aCB0byBjaGFuZ2UgZnJvbSAwLTExIHRvIDEtMTJcclxuICAgICAgICAgICAgZGF0ZV90aW1lX3N0YXJ0PWRhdGVfdGltZV9hZ28uZ2V0RnVsbFllYXIoKStcIi1cIittb250aF9udW0xK1wiLVwiK2RheV9udW0xO1xyXG4gICAgICAgICAgICAvL25vdyBhZGQgdGltZSB0byBpdFxyXG4gICAgICAgICAgICBkYXRlX3RpbWVfc3RhcnQ9IGRhdGVfdGltZV9zdGFydCtcIiBcIitcIjAwOjAwOjAwXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0IG9mIHRoZSBkYXkgeWVzdGVyZGF5OiBcIitkYXRlX3RpbWVfc3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgLy9ub3cgbGV0cyBkbyB0aGUgc2FtZSBmb3IgdGhlIGVuZCBvZiB0aGUgZGF5XHJcbiAgICAgICAgICAgIGxldCBkYXRlX2VuZF9vZl9kYXk6RGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2FkZGluZyBsZWFkaW5nIHplcm9lcyB0byBkYXkgYWdhaW46XHJcbiAgICAgICAgICAgIGxldCBkYXlfbnVtMjpzdHJpbmcgPSAoXCIwXCIrZGF0ZV9lbmRfb2ZfZGF5LmdldERhdGUoKSkuc2xpY2UoLTIpO1xyXG4gICAgICAgICAgICBsZXQgbW9udGhfbnVtMjpzdHJpbmcgPSAoXCIwXCIrZGF0ZV9lbmRfb2ZfZGF5LmdldE1vbnRoKCkrMSkuc2xpY2UoLTIpO1xyXG5cclxuICAgICAgICAgICAgLy9oYXZlIHRvIGFkZCAxIHRvIG1vbnRoIHRvIGNoYW5nZSBmcm9tIDAtMTEgdG8gMS0xMlxyXG4gICAgICAgICAgICBkYXRlX3RpbWVfZW5kPWRhdGVfZW5kX29mX2RheS5nZXRGdWxsWWVhcigpK1wiLVwiK21vbnRoX251bTIrXCItXCIrZGF5X251bTI7XHJcbiAgICAgICAgICAgIC8vbm93IGFkZCB0aW1lIHRvIGl0XHJcbiAgICAgICAgICAgIGRhdGVfdGltZV9lbmQ9IGRhdGVfdGltZV9lbmQrXCIgXCIrXCIyMzo1OTo1OVwiO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbmQgb2YgdGhlIGRheSB0b2RheTogXCIrZGF0ZV90aW1lX2VuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YV90b19zZW5kX29iajphbnkgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouYWN0aW9uPVwiR2V0VGFza3NcIjtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnVzZXJfaWQ9dGhpcy5pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmF1dGhfa2V5PXRoaXMuYXV0aF9rZXk7XHJcblxyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX3N0YXJ0PWRhdGVfdGltZV9zdGFydDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmRhdGVfdGltZV9lbmQ9ZGF0ZV90aW1lX2VuZDtcclxuXHJcblxyXG4gICAgICAgIC8vbm93IGxldHMgc3VibWl0IHRoZW0gdG8gdGhlIHBocCBwYWdlXHJcbiAgICAgICAgbGV0IHNlbGY6TWFpbk9iaiA9IHRoaXM7Ly8gVGhlIGFqYXggZnVuY3Rpb25zIGFyZSBpbnNpZGUgYSBkaWZmZXJlbnQgb2JqZWN0LCBzbyB0aGlzIHdvbid0IHJlZmVyIHRvIHRoaXMgb2JqZWN0IGFueW1vcmUsIHNvIGhhdmUgdG8gbWFrZSBhbiBhbGlhcyB1cCBoZXJlIGZvciBpdCB0byBzdGlsbCBoYXZlIGFjY2VzcyB0byB0aGUgb2JqZWN0IHdlJ3JlIGluXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoanNvbl9vYmoubWVzc2FnZT09XCJOb1Jlc3VsdHNcIikvL2NvdWxkIGNvbWUgYmFjayB3aXRoIG5vIHJlc3VsdHNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3Qgbm8gdGFza3MgYmFjaywgZW1wdHkgZm9yIHdoYXQgd2Ugc2VhcmNoZWQgZm9yXFxuc3FsOiBcIitqc29uX29iai5zcWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9nbyB0aHJvdWdoIHRoZSB0YXNrcywgY3JlYXRpbmcgbmV3IEhUTUwgZm9yIGVhY2ggb25lIHRvIHNob3dcclxuICAgICAgICAgICAgICAgIC8vc2hvdWxkIGhhdmUgdHdvIHR5cGVzLSB0YXNrcyB0aGF0IGFyZW4ndCBjb21wbGV0ZSwgYW5kIHRhc2tzIHRoYXQgYXJlIGNvbXBsZXRlIGZyb20gYmVmb3JlXHJcbiAgICAgICAgICAgICAgICAvL2J1dCBhbHNvIG5lZWQgaGllcmFyY2h5IGZvciBvbmVzIHRoYXQgaGF2ZSBwYXJlbnRzXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi50YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy9zaG91bGQgY2xlYXIgYW55IHByZXZpb3VzIHRhc2tzIGZyb20gdGhlIEhUTUwgRE9NIHRvb1xyXG4gICAgICAgICAgICAgICAgJChcIiN0YXNrc19jb250YWluZXJfZGF0ZV9yYW5nZVwiKS5odG1sKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9zbyBsZXRzIGZpcnN0IGp1c3QgdGFrZSBmcm9tIHRoZSBKU09OIGludG8gYWN0dWFsIFRhc2sgb2JqZWN0c1xyXG4gICAgICAgICAgICAgICAgaWYoIVRvb2xzLklzTnVsbChqc29uX29iai50YXNrcykpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxqc29uX29iai50YXNrcy5sZW5ndGg7aSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXN0IEpTT04gb2JqZWN0IHRvIFRhc2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2s6VGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suU2V0RnJvbUpTT05PYmooanNvbl9vYmoudGFza3NbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50YXNrc1t0YXNrLmlkXSA9IHRhc2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuQWRkVGFzayh0YXNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi51aS5TaG93RmVlZEJhY2soanNvbl9vYmoubWVzc2FnZSwgVUkuTUVTU0FHRV9FUlJPUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLkFqYXhDYWxsKHN1Y2Nlc3MsIGVycm9yLCBkYXRhX3RvX3NlbmRfb2JqKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbnZhciBNYWluOk1haW5PYmogPSBuZXcgTWFpbk9iaigpO1xyXG5cclxuXHJcbi8vY2FzdCB3aW5kb3cgYXMgYW55IHRvIHRyaWNrIHR5cGVzY3JpcHQgaW50byBub3QgdGhyb3dpbmcgYW4gZXJyb3IgYmVjYXVzZSB3aW5kb3cgZG9lc24ndCBoYXZlIHByb3BlcnR5IG1haW5cclxuKHdpbmRvdyBhcyBhbnkpLk1haW49TWFpbjtcclxuKHdpbmRvdyBhcyBhbnkpLlRvb2xzPVRvb2xzOy8vanVzdCBmb3IgdGVzdGluZyBvdXQgdG9vbHMgc3RhdGljIGZ1bmN0aW9uc1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvTWFpbi50cyIsIi8vIHZhciBQaWthZGF5OmFueTtcclxuLy8gaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHtEYXRlVGltZX0gZnJvbSBcIi4vRGF0ZVRpbWVcIjtcclxuaW1wb3J0IHtUb29sc30gZnJvbSBcIi4vVG9vbHNcIjtcclxuZGVjbGFyZSB2YXIgUGlrYWRheTphbnk7IC8vIHdheSBvZiBnZXR0aW5nIEpTIGxvYWRlZCBsaWJyYXJpZXMgd29ya2luZyBwcm9wZXJseVxyXG5kZWNsYXJlIHZhciBtb21lbnQ6YW55O1xyXG4vLyBkZWNsYXJlIHZhciBtb21lbnQ6YW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIFVJXHJcbntcclxuICAgIHByaXZhdGUgdGltZV9vdXRfZmVlZGJhY2tfYXJlYTphbnk7Ly9mb3Igc3RvcmluZyBzZXQgdGltZSBvdXRzLCBzbyB3ZSBjYW4gY2xlYXIgdGhlbVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTUVTU0FHRV9FUlJPUjpudW1iZXI9MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTUVTU0FHRV9TVUNDRVNTOm51bWJlcj0xO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dBZGRUYXNrRm9ybSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy9oaWRlIEFkZFRhc2tCdXR0b25cclxuICAgICAgICAkKFwiI2J0bi1hZGQtdGFza1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAvL3Nob3cgZm9ybVxyXG4gICAgICAgICQoXCIjYWRkLXRhc2stYXJlYVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgICAgIC8vYWxzbyB1cGRhdGUgdGhlIGRhdGUgKyB0aW1lIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzaG91bGQgYmUgc2V0dGluZyBkYXRlIHZhbHVlIHRvOiBcIituZXcgRGF0ZSgpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIixkYXRlIHBpY2tlcjogXCIrJChcIiN0YXNrX3N0YXJ0X2RhdGVcIikuZGF0YShcImRhdGVfcGlja2VyXCIpKTtcclxuICAgICAgICAkKFwiI3Rhc2tfc3RhcnRfZGF0ZVwiKS5kYXRhKFwiZGF0ZV9waWNrZXJcIikuc2V0RGF0ZShuZXcgRGF0ZSgpKTtcclxuXHJcbiAgICAgICAgLy9hbmQgd2lyZSB1cCB0aGUgdGltZSB0byBzZXQgdGhlIGN1cnJlbnQgdGltZVxyXG5cclxuICAgICAgICAvLyAkKFwiI3Rhc2tfc3RhcnRfZGF0ZVwiKTtcclxuICAgICAgICAvLyAkKFwiI3Rhc2tfc3RhcnRfdGltZVwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTaG93QWRkVGFza0J0bigpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zaG93IEFkZFRhc2tCdXR0b25cclxuICAgICAgICAkKFwiI2J0bi1hZGQtdGFza1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgLy9oaWRlIGZvcm1cclxuICAgICAgICAkKFwiI2FkZC10YXNrLWFyZWFcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEZvciBnZXR0aW5nIHRoZSBVSSBsaWJyYXJpZXMgZm9yIGRhdGUgYW5kIHRpbWUgYm94ZXMgd2lyZWQgdXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIFdpcmVVcERhdGUoZWxlbWVudDpKUXVlcnksIGZpbGxfaW5fY3Vycl9kYXRlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGVfZm9ybWF0X2Rpc3BsYXkgPSAnTU1NIEREIFlZWVknO1xyXG5cclxuICAgICAgICAvL3Byb2JhYmx5IGFsc28gbWFrZSBpdCB2aXNpYmxlLCB0aGVuIGludmlzaWJsZSByZWFsIHF1aWNrIHNpbmNlIGl0IGRvZXNuJ3QgYWx3YXlzXHJcbiAgICAgICAgLy8gZWxlbWVudC5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgICAgIC8vIGxldCBkYXRlX2RlZmF1bHQ6c3RyaW5nID0gbW9tZW50KCkuZm9ybWF0KGRhdGVfZm9ybWF0X2Rpc3BsYXkpO1xyXG4gICAgICAgIC8vIGlmKCFmaWxsX2luX2N1cnJfZGF0ZSlcclxuICAgICAgICAvLyAgICAgZGF0ZV9kZWZhdWx0PSA8c3RyaW5nPmVsZW1lbnQudmFsKCk7XHJcbiAgICAgICAgLy8gICAgIC8vIGVsZW1lbnQudmFsKFwiXCIrbW9tZW50KCkuZm9ybWF0KGRhdGVfZm9ybWF0X2Rpc3BsYXkpKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwaWNrZXIgPSBuZXcgUGlrYWRheShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZmllbGQ6ICQoJyN0YXNrX3N0YXJ0X2RhdGUnKVswXSxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBlbGVtZW50WzBdLC8vaGF2ZSB0byB1c2UgWzBdLCBvciBpdCBkb2Vzbid0IHdvcmtcclxuICAgICAgICAgICAgICAgIGZpcnN0RGF5OiAxLCAvL2ZpcnN0IGRheSBvZiB0aGUgd2VlayAoMDogU3VuZGF5LCAxOiBNb25kYXksIGV0YylcclxuICAgICAgICAgICAgICAgIG1pbkRhdGU6IG1vbWVudCgpLnN1YnRyYWN0KDcsICdkYXlzJykuZm9ybWF0KGRhdGVfZm9ybWF0X2Rpc3BsYXkpLCAvL2VhcmxpZXN0IGRhdGUgdGhhdCBjYW4gYmUgc2VsZWN0ZWRcclxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHREYXRlOmRhdGVfZGVmYXVsdCxcclxuICAgICAgICAgICAgICAgIG1heERhdGU6IG1vbWVudCgpLmFkZCggNywnZGF5cycpLmZvcm1hdChkYXRlX2Zvcm1hdF9kaXNwbGF5KSxcclxuICAgICAgICAgICAgICAgIC8veWVhclJhbmdlOiBbMjAwMCwyMDIwXSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogZGF0ZV9mb3JtYXRfZGlzcGxheSxcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihkYXRlOmFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUGlrYWRheSwgb25zZWxlY3QgY2FsbGVkIVwiK3BpY2tlci50b1N0cmluZygpK1wiLCBkYXRlOiBcIitkYXRlLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgbW9tZW50IEpTIHRvIGNoYW5nZSBpdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLnNldChkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBtb21lbnRzanNfbmV3ID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8gbW9tZW50c2pzX25ldy5mb3JtYXQoXCInWVlZWS9NTS9ERFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb21lbnRzanNfbmV3LmZvcm1hdChcIidMTExMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9tZW50SlMgZm9ybWF0dGVkIGRhdGU6IFwiK21vbWVudHNqc19uZXcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGlmKGZpbGxfaW5fY3Vycl9kYXRlfHxlbGVtZW50LnZhbCgpPT1udWxsfHwoPHN0cmluZz5lbGVtZW50LnZhbCgpKS5sZW5ndGg9PTApLy9mb3IgaWYgbm8gZW5kIGRhdGVcclxuICAgICAgICAgICAgcGlja2VyLnNldERhdGUobmV3IERhdGUoKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBwaWNrZXIuc2V0RGF0ZShuZXcgRGF0ZSg8c3RyaW5nPmVsZW1lbnQudmFsKCkpKTtcclxuXHJcbiAgICAgICAgLy9sZXRzIGFsc28gc2F2ZSB0aGUgcGlja2VyIGVsZW1lbnQgaW50byB0aGUgaHRtbCBlbGVtZW50LCBzbyB3ZSBjYW4gdXBkYXRlIHRoZSBwaWNrZXIgbGF0ZXJcclxuICAgICAgICBlbGVtZW50LmRhdGEoXCJkYXRlX3BpY2tlclwiLCBwaWNrZXIpO1xyXG5cclxuICAgICAgICAvLyBlbGVtZW50LmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBXaXJlVXBUaW1lKGVsZW1lbnQ6SlF1ZXJ5LCBmaWxsX2luX2N1cnJfZGF0ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGVsZW1lbnQuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG5cclxuICAgICAgICBsZXQgcHJldl92YWx1ZTpzdHJpbmd8bnVsbCA9PHN0cmluZz5lbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgICAvL2ZvciBpZiBubyBlbmQgZGF0ZSwganVzdCBmZWVsIGl0IGluIHdpdGggY3VycmVudCB0aW1lXHJcbiAgICAgICAgaWYocHJldl92YWx1ZSE9bnVsbClcclxuICAgICAgICAgICAgaWYocHJldl92YWx1ZS5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgICAgICBwcmV2X3ZhbHVlPW51bGw7XHJcblxyXG4gICAgICAgIGxldCBub3c6c3RyaW5nfG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICBpZighZmlsbF9pbl9jdXJyX2RhdGUmJnByZXZfdmFsdWUhPW51bGwpXHJcbiAgICAgICAgICAgIG5vdyA9IERhdGVUaW1lLkdldDI0aHJGb3JtYXRGcm9tUmVhZGFibGUocHJldl92YWx1ZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBub3cgPSBwcmV2X3ZhbHVlO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIldpcmVVcFRpbWU6IG5vdzogXCIrbm93K1wiLCBlbGVtZW50IHZhbHVlOiBcIitlbGVtZW50LnZhbCgpK1wiLCBwcmV2X3ZhbHVlOiBcIitwcmV2X3ZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyIG9wdGlvbnM6YW55ID0ge1xyXG4gICAgICAgICAgICAvL25vdzogXCIxMjozNVwiLCAvL2hoOm1tIDI0IGhvdXIgZm9ybWF0IG9ubHksIGRlZmF1bHRzIHRvIGN1cnJlbnQgdGltZVxyXG5cclxuICAgICAgICAgICAgdHdlbnR5Rm91cjogZmFsc2UsICAvL0Rpc3BsYXkgMjQgaG91ciBmb3JtYXQsIGRlZmF1bHRzIHRvIGZhbHNlXHJcbiAgICAgICAgICAgIC8vdXBBcnJvdzogJ3dpY2tlZHBpY2tlcl9fY29udHJvbHNfX2NvbnRyb2wtdXAnLCAgLy9UaGUgdXAgYXJyb3cgY2xhc3Mgc2VsZWN0b3IgdG8gdXNlLCBmb3IgY3VzdG9tIENTU1xyXG4gICAgICAgICAgICAvL2Rvd25BcnJvdzogJ3dpY2tlZHBpY2tlcl9fY29udHJvbHNfX2NvbnRyb2wtZG93bicsIC8vVGhlIGRvd24gYXJyb3cgY2xhc3Mgc2VsZWN0b3IgdG8gdXNlLCBmb3IgY3VzdG9tIENTU1xyXG4gICAgICAgICAgICAvL2Nsb3NlOiAnd2lja2VkcGlja2VyX19jbG9zZScsIC8vVGhlIGNsb3NlIGNsYXNzIHNlbGVjdG9yIHRvIHVzZSwgZm9yIGN1c3RvbSBDU1NcclxuICAgICAgICAgICAgLy9ob3ZlclN0YXRlOiAnaG92ZXItc3RhdGUnLCAvL1RoZSBob3ZlciBzdGF0ZSBjbGFzcyB0byB1c2UsIGZvciBjdXN0b20gQ1NTXHJcbiAgICAgICAgICAgIHRpdGxlOiAnU3RhcnQgVGltZScsIC8vVGhlIFdpY2tlZHBpY2tlcidzIHRpdGxlLFxyXG4gICAgICAgICAgICBzaG93U2Vjb25kczogZmFsc2UsIC8vV2hldGhlciBvciBub3QgdG8gc2hvdyBzZWNvbmRzLFxyXG4gICAgICAgICAgICB0aW1lU2VwYXJhdG9yOiAnIDogJywgLy8gVGhlIHN0cmluZyB0byBwdXQgaW4gYmV0d2VlbiBob3VycyBhbmQgbWludXRlcyAoYW5kIHNlY29uZHMpXHJcbiAgICAgICAgICAgIHNlY29uZHNJbnRlcnZhbDogMSwgLy9DaGFuZ2UgaW50ZXJ2YWwgZm9yIHNlY29uZHMsIGRlZmF1bHRzIHRvIDEsXHJcbiAgICAgICAgICAgIG1pbnV0ZXNJbnRlcnZhbDogMSwgLy9DaGFuZ2UgaW50ZXJ2YWwgZm9yIG1pbnV0ZXMsIGRlZmF1bHRzIHRvIDFcclxuICAgICAgICAgICAgLy9iZWZvcmVTaG93OiBudWxsLCAvL0EgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGJlZm9yZSB0aGUgV2lja2VkcGlja2VyIGlzIHNob3duXHJcbiAgICAgICAgICAgIC8vYWZ0ZXJTaG93OiBudWxsLCAvL0EgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGFmdGVyIHRoZSBXaWNrZWRwaWNrZXIgaXMgY2xvc2VkL2hpZGRlblxyXG4gICAgICAgICAgICAvL3Nob3c6IG51bGwsIC8vQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgV2lja2VkcGlja2VyIGlzIHNob3duXHJcbiAgICAgICAgICAgIGNsZWFyYWJsZTogZmFsc2UsIC8vTWFrZSB0aGUgcGlja2VyJ3MgaW5wdXQgY2xlYXJhYmxlIChoYXMgY2xpY2thYmxlIFwieFwiKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYobm93IT09bnVsbClcclxuICAgICAgICAgICAgb3B0aW9ucy5ub3c9bm93O1xyXG5cclxuICAgICAgICBsZXQgZWxlbWVudF9hbnk9IDxhbnk+ZWxlbWVudDtcclxuICAgICAgICBlbGVtZW50X2FueS53aWNrZWRwaWNrZXIob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vbGV0cyBhbHNvIHNhdmUgdGhlIHBpY2tlciBlbGVtZW50IGludG8gdGhlIGh0bWwgZWxlbWVudCwgc28gd2UgY2FuIHVwZGF0ZSB0aGUgcGlja2VyIGxhdGVyXHJcbiAgICAgICAgLy8gZWxlbWVudC5kYXRhKFwid2lja2VkcGlja2VyXCIsIHdpY2tlZHBpY2tlcik7XHJcblxyXG4gICAgICAgIC8vIGlmKCFmaWxsX2luX2N1cnJfZGF0ZSlcclxuICAgICAgICAvLyAgICAgZWxlbWVudC52YWwocHJldl92YWx1ZSk7XHJcblxyXG4gICAgICAgIC8vIGVsZW1lbnQuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgUG9wVXAodGV4dDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGV4dCk7XHJcbiAgICB9XHJcbiAgICBMb2FkZXJWaXNpYmxlKHZpc2libGU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZih2aXNpYmxlKVxyXG4gICAgICAgICAgICAkKFwiLmxvYWRlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkKFwiLmxvYWRlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIFNob3dSZWdpc3RlcigpXHJcbiAgICB7XHJcbiAgICAgICAgJChcIiNyZWdpc3RlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgJCAoXCIjbG9naW5cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgJChcIiNUYXNrVHJhY2tlck1haW5cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgICQoXCIjd2VsY29tZV9oZWFkZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBTaG93TG9naW4oKVxyXG4gICAge1xyXG4gICAgICAgICQoXCIjcmVnaXN0ZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgJCAoXCIjbG9naW5cIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICQoXCIjVGFza1RyYWNrZXJNYWluXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cclxuICAgICAgICAkKFwiI3dlbGNvbWVfaGVhZGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgIH1cclxuICAgIFNob3dUYXNrVHJhY2tlcigpXHJcbiAgICB7XHJcbiAgICAgICAgJChcIiNsb2dpblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAkKFwiI3JlZ2lzdGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICQoXCIjVGFza1RyYWNrZXJNYWluXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgICAgICAgJChcIiN3ZWxjb21lX2hlYWRlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICB0aGlzLkhpZGVGZWVkQmFjaygpO1xyXG4gICAgfVxyXG4gICAgSGlkZUZlZWRCYWNrKClcclxuICAgIHtcclxuICAgICAgICAkKFwiI2ZlZWRiYWNrXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpLmh0bWwoKTtcclxuICAgIH1cclxuICAgIFNob3dGZWVkQmFjayhtZXNzYWdlOnN0cmluZywgZmVlZGJhY2tfdHlwZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZmVlZGJhY2tfdHlwZT09PVVJLk1FU1NBR0VfRVJST1IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkKFwiI2ZlZWRiYWNrXCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgJChcIiNmZWVkYmFja1wiKS5hZGRDbGFzcyhcImFsZXJ0LWRhbmdlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmZWVkYmFja190eXBlPT09VUkuTUVTU0FHRV9TVUNDRVNTKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJChcIiNmZWVkYmFja1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKTtcclxuICAgICAgICAgICAgJChcIiNmZWVkYmFja1wiKS5hZGRDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3Nob3cgdGhlIGVycm9yIGJveCwgYW5kIGZpbGwgaW4gdGhlIG1lc3NhZ2VcclxuICAgICAgICAkKFwiI2ZlZWRiYWNrXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKS5odG1sKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvL3Nob3VsZCBjaGFuZ2Ugb3V0IGNsYXNzIHRvIGJlIGVycm9yIG9yIHN1Y2Nlc3MgYm9vdHN0cmFwIHR5cGVcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9oaWRlIGFmdGVyIDVzXHJcbiAgICAgICAgLy9maXJzdCBjbGVhciBhbnkgcHJldmlvdXMgdGltZW91dHMgd2FpdGluZ1xyXG4gICAgICAgIC8vIGNsZWFyVGltZW91dCh0aGlzLnRpbWVfb3V0X2ZlZWRiYWNrX2FyZWEpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gdGhpcy50aW1lX291dF9mZWVkYmFja19hcmVhID1zZXRUaW1lb3V0KGZ1bmN0aW9uKClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgICQoXCIjZmVlZGJhY2tcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgLy8gfSwgNTAwMCk7XHJcblxyXG5cclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvVUkudHMiLCIvKlxyXG5KdXN0IHN0cnVjdHVyZSBmb3IgYSB0YXNrXHJcbiAqL1xyXG5pbXBvcnQge0RhdGVUaW1lfSBmcm9tIFwiLi9EYXRlVGltZVwiXHJcbmltcG9ydCB7VG9vbHN9IGZyb20gXCIuL1Rvb2xzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFza1xyXG57XHJcbiAgICBwdWJsaWMgaWQ6bnVtYmVyO1xyXG4gICAgcHVibGljIHVzZXJfaWQ6bnVtYmVyO1xyXG4gICAgcHVibGljIHRhc2s6c3RyaW5nO1xyXG4gICAgcHVibGljIGNhdGVnb3J5OnN0cmluZztcclxuXHJcbiAgICAvLyBwdWJsaWMgc3RhcnRfZGF0ZTpEYXRlO1xyXG4gICAgLy8gcHVibGljIGVuZF9kYXRlOkRhdGU7XHJcbiAgICAvL1xyXG4gICAgLy8gcHVibGljIHN0YXJ0X3RpbWU6c3RyaW5nO1xyXG4gICAgLy8gcHVibGljIGVuZF90aW1lOnN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgcGFyZW50X2lkOm51bWJlcjtcclxuXHJcbiAgICAvL2ZvciBsb2FkaW5nIGZyb20gbXlzcWwgYXV0b21hdGljYWxseS0ganVzdCBhIHN0cmluZywgbm90IHRoZSBhY3R1YWwgZGF0ZSBvYmplY3RcclxuICAgIHB1YmxpYyBzdGFydF9kYXRlX3RpbWVfc3RyOnN0cmluZztcclxuICAgIHB1YmxpYyBlbmRfZGF0ZV90aW1lX3N0cjpzdHJpbmc7XHJcblxyXG4gICAgLy9kYXRlIHRpbWUgb2JqZWN0c1xyXG4gICAgcHVibGljIHN0YXJ0X2RhdGVfdGltZTpEYXRlVGltZTtcclxuICAgIHB1YmxpYyBlbmRfZGF0ZV90aW1lOkRhdGVUaW1lfG51bGw7XHJcblxyXG4gICAgLy90aGUgZGF0ZS10aW1lIGFzIGEgc3RyaW5nIHRvIGJlIGRpc3BsYXllZCBpbiBicm93c2VyIGluIHJlYWRhYmxlIGZvcm1hdCAoSmFuIDI4IDIwMTYsIDY6MjJwbSlcclxuICAgIC8vIHB1YmxpYyBzdGFydF9kYXRlX2Rpc3BsYXlfc3RyOnN0cmluZztcclxuICAgIC8vIHB1YmxpYyBlbmRfZGF0ZV9kaXNwbGF5X3N0cjpzdHJpbmc7XHJcbiAgICAvLyBwdWJsaWMgc3RhcnRfdGltZV9kaXNwbGF5X3N0cjpzdHJpbmc7XHJcbiAgICAvLyBwdWJsaWMgZW5kX3RpbWVfZGlzcGxheV9zdHI6c3RyaW5nO1xyXG4gICAgLy9cclxuICAgIC8vIHB1YmxpYyBtb250aF9uYW1lczpzdHJpbmdbXSA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXTtcclxuICAgIC8vXHJcbiAgICAvLyBwdWJsaWMgdGltZV9kaWZmZXJlbmNlX3M6bnVtYmVyOy8vdGhlIHRpbWUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSB0d28gZGF0ZXMgYW5kIHRoZSB0aW1lXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICBXZSBzaG91bGQgc2V0dXAgYWxsIHRoZSBwcm9wZXJ0aWVzIGZyb20gbXlzcWwgaGVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0RnJvbUpTT05PYmoob2JqOk9iamVjdClcclxuICAgIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9iaik7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICAgICAgLypmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBJbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0X2RhdGVfdGltZSA9IG5ldyBEYXRlVGltZSh0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHIpO1xyXG5cclxuICAgICAgICBpZighVG9vbHMuSXNOdWxsKHRoaXMuZW5kX2RhdGVfdGltZV9zdHIpKS8vc2luY2UgdGhlIHRhc2sgY291bGQgYmUgdW5maW5pc2hlZC8gbm8gZW5kIGRhdGUgeWV0XHJcbiAgICAgICAgICAgIHRoaXMuZW5kX2RhdGVfdGltZSA9IG5ldyBEYXRlVGltZSh0aGlzLmVuZF9kYXRlX3RpbWVfc3RyKTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBmb3IgdXBkYXRpbmcgdGhlIHN0YXJ0L2VuZCBkYXRlcyB3aGVuIGNoYW5naW5nIHRoZW0gZnJvbSB0aGUgVUksIGFmdGVyIHNlbmRpbmcgdGhlbSB0byBteXNxbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0U3RhcnRBbmRFbmREYXRlVGltZUZyb21NeVNRTChzdGFydF9kYXRlX3RpbWVfbXlzcWxfc3RyOnN0cmluZywgZW5kX2RhdGVfdGltZV9teXNxbF9zdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnRfZGF0ZV90aW1lX3N0cj1zdGFydF9kYXRlX3RpbWVfbXlzcWxfc3RyO1xyXG4gICAgICAgIHRoaXMuZW5kX2RhdGVfdGltZV9zdHI9ZW5kX2RhdGVfdGltZV9teXNxbF9zdHI7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRfZGF0ZV90aW1lLlNldERhdGVUaW1lRnJvbU15U1FMKHRoaXMuc3RhcnRfZGF0ZV90aW1lX3N0cik7XHJcblxyXG4gICAgICAgIGlmKFRvb2xzLklzTnVsbCh0aGlzLmVuZF9kYXRlX3RpbWVfc3RyKSkvL3NpbmNlIHRoZSB0YXNrIGNvdWxkIGJlIHVuZmluaXNoZWQvIG5vIGVuZCBkYXRlIHlldFxyXG4gICAgICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWU9bnVsbDtcclxuICAgICAgICBlbHNlIGlmKFRvb2xzLklzTnVsbCh0aGlzLmVuZF9kYXRlX3RpbWUpfHx0aGlzLmVuZF9kYXRlX3RpbWU9PT1udWxsKVxyXG4gICAgICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWUgPSBuZXcgRGF0ZVRpbWUodGhpcy5lbmRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWUuU2V0RGF0ZVRpbWVGcm9tTXlTUUwodGhpcy5lbmRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2V0RW5kRGF0ZVRpbWVGcm9tTXlTUUwoZW5kX2RhdGVfdGltZV9teXNxbF9zdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZW5kX2RhdGVfdGltZV9zdHI9ZW5kX2RhdGVfdGltZV9teXNxbF9zdHI7XHJcbiAgICAgICAgaWYoIVRvb2xzLklzTnVsbChlbmRfZGF0ZV90aW1lX215c3FsX3N0cikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihUb29scy5Jc051bGwodGhpcy5lbmRfZGF0ZV90aW1lKXx8dGhpcy5lbmRfZGF0ZV90aW1lPT09bnVsbCkvL2hhdmUgdG8gYWRkIDJuZCBjaGVjayBmb3IgVFMgY29tcGlsZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kX2RhdGVfdGltZSA9IG5ldyBEYXRlVGltZSh0aGlzLmVuZF9kYXRlX3RpbWVfc3RyKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRfZGF0ZV90aW1lLlNldERhdGVUaW1lRnJvbU15U1FMKHRoaXMuZW5kX2RhdGVfdGltZV9zdHIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXRTdGFydERhdGVUaW1lRnJvbU15U1FMKHN0YXJ0X2RhdGVfdGltZV9teXNxbF9zdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnRfZGF0ZV90aW1lX3N0cj1zdGFydF9kYXRlX3RpbWVfbXlzcWxfc3RyO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldFN0YXJ0RGF0ZVRpbWVGcm9tTXlTUUw6IFwiK3N0YXJ0X2RhdGVfdGltZV9teXNxbF9zdHIrXCIgdGhpcy5zdGFydF9kYXRlX3RpbWU6IFwiK3RoaXMuc3RhcnRfZGF0ZV90aW1lK1wiLCBzdHI6IFwiK3RoaXMuc3RhcnRfZGF0ZV90aW1lX3N0citcIiwgPT1udWxsPyA6XCIrKHRoaXMuc3RhcnRfZGF0ZV90aW1lPT1udWxsKSk7XHJcblxyXG4gICAgICAgIGlmKFRvb2xzLklzTnVsbCh0aGlzLnN0YXJ0X2RhdGVfdGltZSkpXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRfZGF0ZV90aW1lID0gbmV3IERhdGVUaW1lKHRoaXMuc3RhcnRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0X2RhdGVfdGltZS5TZXREYXRlVGltZUZyb21NeVNRTCh0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBmb3IgZ2V0dGluZyB0aGUgZGF0ZSBhbmQgdGltZSBzdHJpbmdzIGZyb20gdGhlIG15c3FsIHN0cmluZ3NcclxuICAgICAqL1xyXG4gICAgLypwdWJsaWMgR2V0RGF0ZUFuZFRpbWVGcm9tTXlTUUwoKVxyXG4gICAge1xyXG4gICAgICAgIC8vY2hhbmdlIGZyb20gbXlTUUwgZGF0ZXRpbWUgc3RyaW5nIHRvIGh1bWFuIHJlYWRhYmxlXHJcbiAgICAgICAgLy9mcm9tOiAyMDEyLTA2LTIyIDA1OjQwOjA2XHJcbiAgICAgICAgLy90bzogKEphbiAyOCAyMDE2LCA2OjIycG0pXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS1mb3Igc3RhcnQgZGF0ZVxyXG4gICAgICAgIGxldCBkYXRlX3RpbWVfc3RhcnRfYXJyOnN0cmluZ1tdID0gdGhpcy5Db252ZXJ0TXlTUUxEYXRlVGltZVRvRGlzcGxheURhdGVUaW1lKHRoaXMuc3RhcnRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICAgICAgdGhpcy5zdGFydF9kYXRlX2Rpc3BsYXlfc3RyID0gZGF0ZV90aW1lX3N0YXJ0X2FyclswXTtcclxuICAgICAgICB0aGlzLnN0YXJ0X3RpbWVfZGlzcGxheV9zdHIgPSBkYXRlX3RpbWVfc3RhcnRfYXJyWzFdO1xyXG5cclxuXHJcbiAgICAgICAgaWYodGhpcy5lbmRfZGF0ZV90aW1lX3N0ciE9bnVsbCAmJnRoaXMuZW5kX2RhdGVfdGltZV9zdHIubGVuZ3RoPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZV90aW1lX2VuZF9hcnI6c3RyaW5nW10gPSB0aGlzLkNvbnZlcnRNeVNRTERhdGVUaW1lVG9EaXNwbGF5RGF0ZVRpbWUodGhpcy5lbmRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kX2RhdGVfZGlzcGxheV9zdHIgPSBkYXRlX3RpbWVfZW5kX2FyclswXTtcclxuICAgICAgICAgICAgdGhpcy5lbmRfdGltZV9kaXNwbGF5X3N0ciA9IGRhdGVfdGltZV9lbmRfYXJyWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdldERhdGVBbmRUaW1lRnJvbU15U1FMIGZvcm1hdHRlZCBzdHJpbmdzOiBcXG5TdGFydCBkYXRlLXRpbWU6IFwiK3RoaXMuc3RhcnRfZGF0ZV9kaXNwbGF5X3N0citcIiBcIit0aGlzLnN0YXJ0X3RpbWVfZGlzcGxheV9zdHIrXCJcXG5FbmQgZGF0ZS10aW1lOiBcIit0aGlzLmVuZF9kYXRlX2Rpc3BsYXlfc3RyK1wiIFwiK3RoaXMuZW5kX3RpbWVfZGlzcGxheV9zdHIpO1xyXG4gICAgfSovXHJcbiAgICAvKlxyXG4gICAgc2V0cyB0aGUgdGltZV9kaWZmZXJlbmNlX3MgdmFyaWFibGUgZnJvbSB0aGUgZGF0ZSByYW5nZXNcclxuICAgICAqL1xyXG4gICAgLypwdWJsaWMgR2V0RGF0ZVRpbWVEaWZmZXJlbmNlRnJvbU15U1FMKClcclxuICAgIHtcclxuICAgICAgICAvL2dvaW5nIHRvIHVzZSB0aGUgbXlzcWwgc3RyaW5ncyB0byBnZXQgdGhlIGRhdGUvIHRpbWUgZGlmZmVyZW5jZVxyXG4gICAgICAgIC8vanVzdCBnb2luZyB0byB1c2UgdGhlIGRhdGUgb2JqZWN0IHRvIGdldCB0aGUgcyBpbiBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIDIgZGF0ZXNcclxuXHJcbiAgICB9Ki9cclxuICAgIC8qcHVibGljIENvbnZlcnRNeVNRTERhdGVUaW1lVG9EaXNwbGF5RGF0ZVRpbWUoZGF0ZV90aW1lX215c3FsX3N0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRhdGVfdGltZV9hcnI6c3RyaW5nW10gPSBkYXRlX3RpbWVfbXlzcWxfc3RyLnNwbGl0KFwiIFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGVfbXlzcWw6c3RyaW5nID0gZGF0ZV90aW1lX2FyclswXTtcclxuICAgICAgICBsZXQgdGltZV9teXNxbDpzdHJpbmcgPSBkYXRlX3RpbWVfYXJyWzFdO1xyXG5cclxuICAgICAgICAvL2ZpcnN0IGRvIGRhdGVcclxuICAgICAgICBsZXQgZGF0ZV9hcnI6c3RyaW5nW10gPSBkYXRlX215c3FsLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICBsZXQgeWVhcjpzdHJpbmcgPSBkYXRlX2FyclswXTtcclxuICAgICAgICBsZXQgbW9udGg6c3RyaW5nID0gZGF0ZV9hcnJbMV07XHJcbiAgICAgICAgbGV0IGRheTpzdHJpbmcgPSBkYXRlX2FyclsyXTtcclxuXHJcbiAgICAgICAgLy9jaGFuZ2UgbW9udGggZnJvbSBudW1iZXIgMS0xMiB0byBhYnIgZGF0ZSBuYW1lXHJcbiAgICAgICAgbW9udGg9IHRoaXMubW9udGhfbmFtZXNbcGFyc2VJbnQobW9udGgpLTFdO1xyXG4gICAgICAgIGRheSA9IHBhcnNlSW50KGRheSkudG9TdHJpbmcoKTsvL2ZvciBnZXR0aW5nIHJpZCBvZiB0aGUgbGVhZGluZyAwXHJcblxyXG4gICAgICAgIGxldCBkYXRlX2Rpc3BsYXkgPSAgbW9udGgrXCIgXCIrIGRheSsgXCIgXCIreWVhcjtcclxuXHJcbiAgICAgICAgLy9uZXh0IGRvIHRpbWUgMDU6NDA6MDYgKHN0YXJ0aW5nIGF0IDAsIGVuZGluZyBhdCAyMzo1OTo1OSB0byBzdGFydGluZyBhdCAxLCBlbmRpbmcgYXQgMTJcclxuICAgICAgICBsZXQgdGltZV9hcnI6c3RyaW5nW10gPSB0aW1lX215c3FsLnNwbGl0KFwiOlwiKTtcclxuICAgICAgICBsZXQgaG91cjpzdHJpbmcgPSBkYXRlX2FyclswXTtcclxuICAgICAgICBsZXQgbWludXRlOnN0cmluZyA9IHBhcnNlSW50KGRhdGVfYXJyWzFdKS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBsZXQgaHJfbnVtOm51bWJlciA9IHBhcnNlSW50KGhvdXIpKzE7Ly90byBnbyBmcm9tIDAgbyBjbG9jayB0byAxIG8gY2xvY2tcclxuICAgICAgICBsZXQgdGltZV9leHRyYTpzdHJpbmcgPSBcIkFNXCI7XHJcbiAgICAgICAgaWYoaHJfbnVtPjExKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGltZV9leHRyYSA9IFwiUE1cIjtcclxuICAgICAgICAgICAgaHJfbnVtLT0xMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaG91ciA9IGhyX251bS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBsZXQgdGltZV9kaXNwbGF5OnN0cmluZyA9IGhyX251bStcIiBcIittaW51dGUrXCIgXCIrdGltZV9leHRyYTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtkYXRlX2Rpc3BsYXksIHRpbWVfZGlzcGxheV07XHJcbiAgICB9Ki9cclxufVxyXG4vKlxyXG5UaGUgYWN0dWFsIGNsYXNzIHRvIGhhbmRsZSBFdmVyeXRoaW5nIGludm9sdmVkIHdpdGggdGFza3MtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFza0hhbmRsZXJcclxue1xyXG4gICAgLypcclxuICAgIEZvciB3aGVuIHRoZSBcImNyZWF0ZSB0YXNrXCIgYnV0dG9uIGhhcyBiZWVuIGNsaWNrZWQuXHJcbiAgICBTaG91bGQgdmVyaWZ5IGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBvdXQgY29ycmVjdGx5LCB0aGVuIGdyYWIgdmFsdWVzIGFuZCBzdWJtaXQgaXQgdG8gZnVuY3Rpb24gYmVsb3dcclxuICAgICAqL1xyXG4gICAgQ3JlYXRlVGFza0Zyb21VSSgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG4gICAgQ3JlYXRlVGFzaygpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEdldEFsbFRhc2tzKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBHZXRUYXNrcyhzdGFydF9kYXRlX3RpbWU6RGF0ZSwgZW5kX2RhdGVfdGltZTpEYXRlKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvVGFza3MudHMiLCJcclxuLypcclxuRm9yIHN0b3JpbmcgY29uc3RhbnRzIGZvciBjaGFuZ2luZyBvdXQgYmFja2VuZHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdcclxue1xyXG4gICAgLy9ubyBzdGF0aWMgY29uc3QgaW4gSlMsIHNvIGp1c3QgdXNpbmcgYSBnZXR0ZXIgbWFrZXMgaXQgc28gaXQgY2FuJ3QgYmUgY2hhbmdlZFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQkFDS0VORF9VUkwoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJodHRwOi8vYWNrbWkuY29tL3Byb2plY3RzL1Rhc2tUcmFja2VyL215c3FsX2Nvbm5lY3QucGhwXCI7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL0NvbmZpZy50cyIsImV4cG9ydCBjbGFzcyBUb29sc1xyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIElzTnVsbChvYmo6YW55KTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG9iaj09PW51bGx8fG9iaj09PXVuZGVmaW5lZHx8b2JqLmxlbmd0aD09PTB8fG9iaj09PVwiTlVMTFwiOy8vZm9yIGJsYW5rIHN0cmluZ3NcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNhbml0aXplSW5wdXQoc3RyOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgLy9sZXRzIHJlcGxhY2Ugc2luZ2xlIHF1b3RlcyBhbmQgZG91YmxlIHF1b3RlcyB3aXRoIGVzY2FwZWQgcXVvdGVzXHJcbiAgICAgICAgLy9maXJzdCwgbGV0cyBlc2NhcGUgdGhlIGNoYXJhY3RlcnNcclxuICAgICAgICAvL3N0ciA9ICBzdHIucmVwbGFjZSgvW15dL2csZnVuY3Rpb24odyl7cmV0dXJuICclJyt3LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpfSlcclxuICAgICAgICBzdHIgPSBlbmNvZGVVUkkoc3RyKTtcclxuXHJcbiAgICAgICAgLy9hbHNvIGVuY29kZSBzaW5nbGUgcXVvdGVzXHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLycvZywgXCIlMjdcIik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXNjYXBlZCBzdHJpbmc6IFxcblwiK3N0citcIlxcbnVuZXNjYXBlZCBzdHI6XFxuXCIrVG9vbHMuVW5TYW5pdGl6ZUlucHV0KHN0cikpO1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIGZvciBwdXR0aW5nIGl0IGJhY2sgdG8gaHVtYW4gcmVhZGFibGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVblNhbml0aXplSW5wdXQoc3RyOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgc3RyPSBkZWNvZGVVUkkoc3RyKTtcclxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvJTI3L2csIFwiJ1wiKTtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvVG9vbHMudHMiXSwic291cmNlUm9vdCI6IiJ9