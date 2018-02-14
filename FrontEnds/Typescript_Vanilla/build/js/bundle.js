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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
To handle transferring from human readable dates and times to MYSQL compatible ones
 */
var Tools_1 = __webpack_require__(1);
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
/* 1 */
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI_1 = __webpack_require__(3);
var Tasks_1 = __webpack_require__(4);
// import * as Moment from "moment";
var DateTime_1 = __webpack_require__(0);
var Tools_1 = __webpack_require__(1);
var Config_1 = __webpack_require__(5);
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
        //for testing:
        // this.ui.ShowCalenderModal();
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// var Pikaday:any;
// import * as moment from "moment";
var DateTime_1 = __webpack_require__(0);
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.ShowCalenderModal = function () {
        vex.dialog.confirm({
            //message: 'Are you absolutely sure you want to destroy the alien planet?',
            unsafeMessage: '<b>Hello </b>',
            callback: function (value) {
                console.log(value);
            }
        });
    };
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
Just structure for a task
 */
var DateTime_1 = __webpack_require__(0);
var Tools_1 = __webpack_require__(1);
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
/* 5 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjg4MGJmMWFiMWYxYzYzODc1NTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9EYXRlVGltZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1Rvb2xzLnRzIiwid2VicGFjazovLy8uL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvTWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1VJLnRzIiwid2VicGFjazovLy8uL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvVGFza3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7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K0VBQStFO2FBQy9FO1lBRUksTUFBTSxDQUFDLHlEQUF5RCxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBQ0wsYUFBQztBQUFELENBQUM7QUFQWSx3QkFBTSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyODgwYmYxYWIxZjFjNjM4NzU1MSIsIi8qXHJcblRvIGhhbmRsZSB0cmFuc2ZlcnJpbmcgZnJvbSBodW1hbiByZWFkYWJsZSBkYXRlcyBhbmQgdGltZXMgdG8gTVlTUUwgY29tcGF0aWJsZSBvbmVzXHJcbiAqL1xyXG5pbXBvcnQge1Rvb2xzfSBmcm9tIFwiLi9Ub29sc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVUaW1lXHJcbntcclxuICAgIC8vZm9ybWF0cyBhcmUgZnJvbSBteVNRTCBmb3JtYXRcclxuICAgIHB1YmxpYyAgeWVhcjpudW1iZXI7XHJcbiAgICBwdWJsaWMgIG1vbnRoOm51bWJlcjsvLzEtMTJcclxuICAgIHB1YmxpYyAgZGF5Om51bWJlcjsvLzEtMzFcclxuXHJcbiAgICBwdWJsaWMgIGhvdXJzOm51bWJlcjsvLyAwLTIzXHJcbiAgICBwdWJsaWMgIG1pbnM6bnVtYmVyOy8vMC01OVxyXG4gICAgcHVibGljICBzZWNzOm51bWJlcjsvLzAtNTlcclxuXHJcbiAgICBwdWJsaWMgIGhvdXJzXzEyaHI6bnVtYmVyOy8vIDEtMTJcclxuXHJcbiAgICBwdWJsaWMgIGhvdXJzX2Rpc3BsYXllZF8xMmhyOnN0cmluZzsvLyBoYXZlIHRvIGFkZCBsZWFkaW5nIDBzICsgaW4gMTIgaHIgZm9ybWF0IGluc3RlYWQgb2YgMjRcclxuICAgIHB1YmxpYyAgbWluc19kaXNwbGF5ZWQ6c3RyaW5nOy8vIGhhdmUgdG8gYWRkIGxlYWRpbmcgMHNcclxuICAgIHB1YmxpYyAgaG91cnNfQU1fT1JfUE06c3RyaW5nOyAvL3doZXRoZXIgQU0gb3IgUE0gZm9yIDI0IGhyIGRpc3BsYXlcclxuXHJcbiAgICBwdWJsaWMgbW9udGhfbmFtZXM6c3RyaW5nW10gPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XHJcblxyXG4gICAgcHVibGljIGRhdGVfZGlzcGxheTpzdHJpbmc7Ly9kaXNwbGF5cyBkYXRlIGluIGZvcm1hdDogSmFuIDI4IDIwMThcclxuICAgIHB1YmxpYyB0aW1lX2Rpc3BsYXk6c3RyaW5nOy8vZGlzcGxheXMgdGltZSBpbiBmb3JtYXQ6IDEwIDogMDkgUE1cclxuXHJcbiAgICBwdWJsaWMgbW9udGhfZGlzcGxheTpzdHJpbmc7IC8vSmFuXHJcbiAgICAvL3B1YmxpYyBkYXlfZGlzcGxheTpzdHJpbmc7IC8vMDEtMzFcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkYXRlX3RpbWVfbXlzcWxfc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNldERhdGVUaW1lRnJvbU15U1FMKGRhdGVfdGltZV9teXNxbF9zdHIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERhdGVUaW1lRnJvbU15U1FMKGRhdGVfdGltZV9teXNxbF9zdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkYXRlX3RpbWVfYXJyOnN0cmluZ1tdID0gZGF0ZV90aW1lX215c3FsX3N0ci5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgICAgIGxldCBkYXRlX215c3FsOnN0cmluZyA9IGRhdGVfdGltZV9hcnJbMF07XHJcbiAgICAgICAgbGV0IHRpbWVfbXlzcWw6c3RyaW5nID0gZGF0ZV90aW1lX2FyclsxXTtcclxuXHJcbiAgICAgICAgLy9maXJzdCBkbyBkYXRlXHJcbiAgICAgICAgbGV0IGRhdGVfYXJyOnN0cmluZ1tdID0gZGF0ZV9teXNxbC5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgbGV0IHllYXJfc3RyOnN0cmluZyA9IGRhdGVfYXJyWzBdO1xyXG4gICAgICAgIHRoaXMubW9udGhfZGlzcGxheSA9IGRhdGVfYXJyWzFdO1xyXG4gICAgICAgIGxldCBkYXlfc3RyOnN0cmluZyA9IGRhdGVfYXJyWzJdO1xyXG5cclxuICAgICAgICB0aGlzLmRheT0gcGFyc2VJbnQoZGF5X3N0cik7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhfZGlzcGxheSk7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gcGFyc2VJbnQoeWVhcl9zdHIpO1xyXG4gICAgICAgIC8vY2hhbmdlIG1vbnRoIGZyb20gbnVtYmVyIDEtMTIgdG8gYWJyIGRhdGUgbmFtZVxyXG4gICAgICAgIHRoaXMubW9udGhfZGlzcGxheT0gdGhpcy5tb250aF9uYW1lc1t0aGlzLm1vbnRoIC0xXTtcclxuICAgICAgICBkYXlfc3RyID0gdGhpcy5kYXkudG9TdHJpbmcoKTsvL2ZvciBnZXR0aW5nIHJpZCBvZiB0aGUgbGVhZGluZyAwXHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZV9kaXNwbGF5ID0gIHRoaXMubW9udGhfZGlzcGxheStcIiBcIisgZGF5X3N0cisgXCIgXCIreWVhcl9zdHI7XHJcblxyXG5cclxuICAgICAgICAvL25leHQgZG8gdGltZSAwNTo0MDowNiAoc3RhcnRpbmcgYXQgMCwgZW5kaW5nIGF0IDIzOjU5OjU5IHRvIHN0YXJ0aW5nIGF0IDEsIGVuZGluZyBhdCAxMlxyXG4gICAgICAgIGxldCB0aW1lX2FycjpzdHJpbmdbXSA9IHRpbWVfbXlzcWwuc3BsaXQoXCI6XCIpO1xyXG4gICAgICAgIGxldCBob3VyX3N0cjpzdHJpbmcgPSB0aW1lX2FyclswXTtcclxuICAgICAgICBsZXQgbWludXRlX3N0cjpzdHJpbmcgPSBwYXJzZUludCh0aW1lX2FyclsxXSkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ob3Vycz0gcGFyc2VJbnQoaG91cl9zdHIpO1xyXG4gICAgICAgIHRoaXMubWlucz0gcGFyc2VJbnQobWludXRlX3N0cik7XHJcblxyXG4gICAgICAgIC8vaGF2ZSB0byBhZGQgbGVhZGluZyAwIHRvIG1pbnNcclxuICAgICAgICB0aGlzLm1pbnNfZGlzcGxheWVkPSB0aGlzLm1pbnMudG9TdHJpbmcoKTtcclxuICAgICAgICBpZih0aGlzLm1pbnNfZGlzcGxheWVkLmxlbmd0aDwyKVxyXG4gICAgICAgICAgICB0aGlzLm1pbnNfZGlzcGxheWVkPSBcIjBcIit0aGlzLm1pbnNfZGlzcGxheWVkO1xyXG5cclxuICAgICAgICAvL2xldCBocl9udW06bnVtYmVyID0gdGhpcy5ob3VyczsvL3RvIGdvIGZyb20gMCBvIGNsb2NrIHRvIDEgbyBjbG9jayBBTVxyXG4gICAgICAgIHRoaXMuaG91cnNfMTJociA9IHRoaXMuaG91cnM7XHJcblxyXG4gICAgICAgIHRoaXMuaG91cnNfQU1fT1JfUE0gPSBcIkFNXCI7XHJcbiAgICAgICAgaWYodGhpcy5ob3Vyc18xMmhyPjExKS8vQU0gaXMgMS0xMSBpcyBBTSwgMTItMTEgaXMgUE1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaG91cnNfQU1fT1JfUE0gPSBcIlBNXCI7XHJcbiAgICAgICAgICAgIHRoaXMuaG91cnNfMTJoci09MTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZm9yIGhhdmluZyAwPTEyIEFNXHJcbiAgICAgICAgaWYodGhpcy5ob3Vyc18xMmhyPT0wKVxyXG4gICAgICAgICAgICB0aGlzLmhvdXJzXzEyaHI9MTI7XHJcblxyXG4gICAgICAgIHRoaXMuaG91cnNfZGlzcGxheWVkXzEyaHIgPSB0aGlzLmhvdXJzXzEyaHIudG9TdHJpbmcoKTtcclxuICAgICAgICBpZih0aGlzLmhvdXJzX2Rpc3BsYXllZF8xMmhyLmxlbmd0aDwyKVxyXG4gICAgICAgICAgICB0aGlzLmhvdXJzX2Rpc3BsYXllZF8xMmhyPSBcIjBcIit0aGlzLmhvdXJzX2Rpc3BsYXllZF8xMmhyO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVfZGlzcGxheSA9IHRoaXMuaG91cnNfZGlzcGxheWVkXzEyaHIrXCIgOiBcIit0aGlzLm1pbnNfZGlzcGxheWVkK1wiIFwiK3RoaXMuaG91cnNfQU1fT1JfUE07XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2V0RGF0ZVRpbWVGcm9tTXlTUUw6IGZyb20gZGF0ZSB0aW1lOiBcIitkYXRlX3RpbWVfbXlzcWxfc3RyK1wiLCB0byBkYXRlIHRpbWU6IFwiK3RoaXMuZGF0ZV9kaXNwbGF5K1wiIFwiK3RoaXMudGltZV9kaXNwbGF5KTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBuZWVkZWQgZm9yIHdpY2tlZHBpY2tlciBmb3Igc2V0dGluZyBkZWZhdWx0IHZhbHVlXHJcbiAgICAvL3Nob3VsZCBjaGFuZ2U6XHJcbiAgICAgICAgMyA6IDAwIFBNIHRvXHJcbiAgICAgICAgMTU6MDBcclxuICAgICAgICAxMiBBTSBzaG91bGQgYmUgMDowMFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldDI0aHJGb3JtYXRGcm9tUmVhZGFibGUodGltZV9yZWFkYWJsZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFycjpzdHJpbmdbXSA9IHRpbWVfcmVhZGFibGUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIC8vMD1ociwgMT06LCAyPW1pbiwgMz1QTVxyXG4gICAgICAgIGxldCBocjpudW1iZXIgPSBwYXJzZUludChhcnJbMF0pO1xyXG4gICAgICAgIGxldCBBTTpib29sZWFuID0gYXJyWzNdPT09XCJBTVwiO1xyXG5cclxuICAgICAgICBpZihocj09PTEyJiZBTSlcclxuICAgICAgICAgICAgaHItPTEyO1xyXG5cclxuICAgICAgICBpZighQU0mJmhyPjEyKVxyXG4gICAgICAgICAgICBocis9MTI7XHJcbiAgICAgICAgcmV0dXJuIGhyK1wiOlwiK2FyclsyXTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGZpbmQgdGhlIGRpZmZlcmVuY2UgaW4gbWlucyBiZXR3ZWVuIDIgZGF0ZSB0aW1lc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIERpZmZlcmVuY2VJbk1pbnMoZGF0ZV90aW1lMTpEYXRlVGltZSwgZGF0ZV90aW1lMjpEYXRlVGltZSlcclxuICAgIHtcclxuICAgICAgICAvL2hhdmUgdG8gY29udmVydCBib3RoIGRhdGUgdGltZXMgdG8gRGF0ZXMsIGFuZCBmaW5kIHRoZSBkaWZmZXJlbmNlIGluIG1zXHJcbiAgICAgICAgLy9odHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTY4MTY3L2RpZmZlcmVuY2UtYmV0d2Vlbi1kYXRlcy1pbi1qYXZhc2NyaXB0XHJcblxyXG4gICAgICAgIC8vbmV3IERhdGUoeWVhciwgbW9udGggWywgZGF5IFssIGhvdXJzIFssIG1pbnV0ZXMgWywgc2Vjb25kcyBbLCBtaWxsaXNlY29uZHNdXV1dXSk7XHJcbiAgICAgICAgLy9tb250aCBuZWVkcyB0byBiZSBmcm9tIDAtMTFcclxuXHJcbiAgICAgICAgbGV0IGRhdGUxOkRhdGUgPSBuZXcgRGF0ZShkYXRlX3RpbWUxLnllYXIsIGRhdGVfdGltZTEubW9udGgsIGRhdGVfdGltZTEuZGF5LCBkYXRlX3RpbWUxLmhvdXJzLCBkYXRlX3RpbWUxLm1pbnMsIDAsMCk7XHJcbiAgICAgICAgbGV0IGRhdGUyOkRhdGUgPSBuZXcgRGF0ZShkYXRlX3RpbWUyLnllYXIsIGRhdGVfdGltZTIubW9udGgsIGRhdGVfdGltZTIuZGF5LCBkYXRlX3RpbWUyLmhvdXJzLCBkYXRlX3RpbWUyLm1pbnMsIDAsMCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ29pbmcgdG8gZmluZCB0aGUgZGlmZmVybmNlIGJldHdlZW4gZGF0ZTI6IFwiK2RhdGUyK1wiLCBhbmQgZGF0ZTE6IFwiK2RhdGUxKTtcclxuICAgICAgICAvL25vdyBkaWZmZXJlbmNlOlxyXG4gICAgICAgIC8vaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk2ODE2Ny9kaWZmZXJlbmNlLWJldHdlZW4tZGF0ZXMtaW4tamF2YXNjcmlwdFxyXG4gICAgICAgIGxldCBkaWZmX2luX21zOm51bWJlciA9IChkYXRlMi5nZXRUaW1lKCktZGF0ZTEuZ2V0VGltZSgpKTtcclxuXHJcbiAgICAgICAgLy9jb252ZXJ0IHRvIHMsIG1pbnMsIGVjdFxyXG4gICAgICAgIGxldCBkaWZmX2luX3M6bnVtYmVyID0gZGlmZl9pbl9tcy8xMDAwO1xyXG5cclxuICAgICAgICBsZXQgZGlmZl9pbl9taW5zOm51bWJlciA9IGRpZmZfaW5fcy82MDtcclxuICAgICAgICBsZXQgZGlmZl9pbl9ocnM6bnVtYmVyID0gZGlmZl9pbl9taW5zLzYwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGlmZmVyZW5jZSBpbiBocnM6IFwiK2RpZmZfaW5faHJzKTtcclxuXHJcbiAgICAgICAgbGV0IGRpZmZfbWluc19maW5hbDpudW1iZXIgPSBNYXRoLmZsb29yKChkaWZmX2luX2hycyUxKSo2MCk7XHJcbiAgICAgICAgbGV0IGRpZmZfaHJzX2ZpbmFsOm51bWJlciA9IE1hdGguZmxvb3IoZGlmZl9pbl9ocnMpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRpZmZlcmVuY2VJbk1pbnM6IFRvdGFsIHRpbWUgZGlmZmVyZW5jZTogXCIrZGlmZl9ocnNfZmluYWwrXCI6IFwiK2RpZmZfbWluc19maW5hbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBkaWZmX2hyc19maW5hbCtcIiBocnMgXCIrZGlmZl9taW5zX2ZpbmFsK1wiIG1pbnNcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgY2hhbmdlcyBkYXRlIGZvcm1hdCBmcm9tOlxyXG4gICAgSmFuIDI0IDIwMThcclxuICAgIHRvIChNWVNRTCBmb3JtYXQpXHJcbiAgICAyMDEyLTA2LTIyIDA1OjQwOjA2XHJcblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERhdGVGb3JNeVNRTEZyb21SZWFkYWJsZShkYXRlOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBsZXQgZGF0ZV9zcGxpdDpzdHJpbmdbXSA9IGRhdGUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIGxldCBtb250aF9uYW1lOnN0cmluZyA9IGRhdGVfc3BsaXRbMF07XHJcbiAgICAgICAgbGV0IGRheTpzdHJpbmcgPSBkYXRlX3NwbGl0WzFdO1xyXG4gICAgICAgIGxldCB5ZWFyOnN0cmluZyA9IGRhdGVfc3BsaXRbMl07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9odHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzU2NjU1Mi9lYXNpZXN0LXdheS10by1jb252ZXJ0LW1vbnRoLW5hbWUtdG8tbW9udGgtbnVtYmVyLWluLWpzLWphbi0wMVxyXG4gICAgICAgIGxldCBtb250aF9udW1iZXI6c3RyaW5nID0obmV3IERhdGUoRGF0ZS5wYXJzZShtb250aF9uYW1lICtcIiAxLCAyMDEyXCIpKS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmIChtb250aF9udW1iZXIubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICAgIG1vbnRoX251bWJlciA9IFwiMFwiK21vbnRoX251bWJlcjtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtb250aDogXCIrbW9udGhfbmFtZStcIiwgZGF5OlwiK2RheStcIiwgeWVhcjogXCIreWVhcitcIiwgbW9udGggbmFtZTogXCIrXCIsIG1vbnRoIG51bTogXCIrbW9udGhfbnVtYmVyKTtcclxuXHJcbiAgICAgICAgbGV0IG15c3FsX2Zvcm1hdDpzdHJpbmcgPSB5ZWFyK1wiLVwiK21vbnRoX251bWJlcitcIi1cIitkYXk7XHJcbiAgICAgICAgcmV0dXJuIG15c3FsX2Zvcm1hdDtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBjaGFuZ2VzIHRpbWUgZm9ybWF0IGZyb206XHJcbiAgICA5IDogMTEgUE1cclxuICAgIHRvIChNWVNRTCBmb3JtYXQpXHJcbiAgICAwODowNzoxNCAoSEggTU0gU1MpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0VGltZUZvck15U1FMRnJvbVJlYWRhYmxlKHRpbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRpbWUgPSB0aW1lLnJlcGxhY2UoXCI6IFwiLCBcIlwiKTtcclxuICAgICAgICBsZXQgdGltZV9zcGxpdDpzdHJpbmdbXSA9IHRpbWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInRpbWUgOiBcIit0aW1lKTtcclxuXHJcbiAgICAgICAgLy8gdGltZV9zcGxpdFswXSA9KHBhcnNlSW50KHRpbWVfc3BsaXRbMF0pKS50b1N0cmluZygpOyAvL3NpbmNlIHRoZSB0aW1lIHBpY2tlciBpcyAxYW0gLTEycG0sIGJ1dCBteXNxbCBpcyAwIC0yNFxyXG4gICAgICAgIGxldCBob3VyOm51bWJlciA9IHBhcnNlSW50KHRpbWVfc3BsaXRbMF0pO1xyXG5cclxuICAgICAgICAvL2ZvciAxMiBBTSwgaXQgYmVjb21lcyAwIG8gY2xvY2tcclxuICAgICAgICBpZih0aW1lX3NwbGl0WzJdPT09XCJBTVwiJiZob3VyPT0xMilcclxuICAgICAgICAgICAgaG91ci09MTI7XHJcblxyXG4gICAgICAgIC8vZm9yIGFueSBQTSdzLCBleGNlcHQgMTIsIGFkZCAxMmhycyB0byB0aGVtXHJcbiAgICAgICAgaWYodGltZV9zcGxpdFsyXT09PVwiUE1cIiYmaG91ciE9MTIpXHJcbiAgICAgICAgICAgIGhvdXIrPTEyO1xyXG5cclxuICAgICAgICBsZXQgaG91cl9zdHI6c3RyaW5nID0gaG91ci50b1N0cmluZygpO1xyXG4gICAgICAgIGlmKGhvdXI8MTApLy9hZGQgbGVhZGluZyAwIG9udG8gaG91clxyXG4gICAgICAgICAgICBob3VyX3N0cj1cIjBcIitob3VyO1xyXG5cclxuICAgICAgICBpZih0aW1lX3NwbGl0WzFdLmxlbmd0aD09MSkvL2FkZCBsZWFkaW5nIDAgdG8gbWludXRlXHJcbiAgICAgICAgICAgIHRpbWVfc3BsaXRbMV09XCIwXCIrdGltZV9zcGxpdFsxXTtcclxuXHJcbiAgICAgICAgbGV0IG15c3FsX3RpbWUgPSBob3VyX3N0citcIjpcIit0aW1lX3NwbGl0WzFdK1wiOjAwXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaW1lIGZvciBNWVNRTDogXCIrbXlzcWxfdGltZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBteXNxbF90aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0RGF0ZVRpbWVGb3JNeVNRTEZyb21SZWFkYWJsZShkYXRlOnN0cmluZywgdGltZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZXREYXRlVGltZUZvck15U1FMRnJvbVJlYWRhYmxlOiBcIitkYXRlK1wiLCBcIit0aW1lKTtcclxuICAgICAgICBpZihUb29scy5Jc051bGwoZGF0ZSl8fFRvb2xzLklzTnVsbCh0aW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGxldCBkYXRlX215c3FsOnN0cmluZyA9IHRoaXMuR2V0RGF0ZUZvck15U1FMRnJvbVJlYWRhYmxlKGRhdGUpO1xyXG4gICAgICAgIGxldCB0aW1lX215c3FsOnN0cmluZyA9IHRoaXMuR2V0VGltZUZvck15U1FMRnJvbVJlYWRhYmxlKHRpbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0ZV9teXNxbCtcIiBcIit0aW1lX215c3FsO1xyXG4gICAgfVxyXG4gICAgLy8gbXlzcWwgZm9ybWF0OiAyMDEyLTA2LTIyIDA1OjQwOjA2XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERhdGVUaW1lTXlTUUxGcm9tRGF0ZShkYXRlOkRhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1vbnRoOnN0cmluZyA9IChkYXRlLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKTsvL25vcm1hbGx5IDAtMTFcclxuICAgICAgICBpZihtb250aC5sZW5ndGg9PTEpLy9hZGQgbGVhZGluZyAwIHRvIG1pbnV0ZVxyXG4gICAgICAgICAgICBtb250aD1cIjBcIittb250aDtcclxuXHJcbiAgICAgICAgbGV0IGRheTpzdHJpbmcgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGlmKGRheS5sZW5ndGg9PTEpLy9hZGQgbGVhZGluZyAwXHJcbiAgICAgICAgICAgIGRheT1cIjBcIitkYXk7XHJcblxyXG4gICAgICAgIGxldCBob3VyOnN0cmluZz1kYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihob3VyLmxlbmd0aD09MSkvL2FkZCBsZWFkaW5nIDBcclxuICAgICAgICAgICAgaG91cj1cIjBcIitob3VyO1xyXG5cclxuICAgICAgICBsZXQgbWluczpzdHJpbmc9ZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihtaW5zLmxlbmd0aD09MSkvL2FkZCBsZWFkaW5nIDBcclxuICAgICAgICAgICAgbWlucz1cIjBcIittaW5zO1xyXG5cclxuICAgICAgICBsZXQgc2VjczpzdHJpbmc9ZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihzZWNzLmxlbmd0aD09MSkvL2FkZCBsZWFkaW5nIDBcclxuICAgICAgICAgICAgc2Vjcz1cIjBcIitzZWNzO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHN0cl9kYXRlX3RpbWVfbXlzcWw6c3RyaW5nID0gZGF0ZS5nZXRGdWxsWWVhcigpK1wiLVwiK21vbnRoK1wiLVwiK2RheStcIiBcIitob3VyK1wiOlwiK21pbnMrXCI6XCIrc2VjcztcclxuICAgICAgICByZXR1cm4gc3RyX2RhdGVfdGltZV9teXNxbDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgRm9yIGdldHRpZ24gdGhlIGN1cnJlbnQgZGF0ZS8gdGltZSBmb3Igc2VuZGluZyB0byBteXNxbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEN1cnJlbnREYXRlVGltZU15U1FMKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZGF0ZTpEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXREYXRlVGltZU15U1FMRnJvbURhdGUoZGF0ZSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL0RhdGVUaW1lLnRzIiwiZXhwb3J0IGNsYXNzIFRvb2xzXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgSXNOdWxsKG9iajphbnkpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gb2JqPT09bnVsbHx8b2JqPT09dW5kZWZpbmVkfHxvYmoubGVuZ3RoPT09MHx8b2JqPT09XCJOVUxMXCI7Ly9mb3IgYmxhbmsgc3RyaW5nc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU2FuaXRpemVJbnB1dChzdHI6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICAvL2xldHMgcmVwbGFjZSBzaW5nbGUgcXVvdGVzIGFuZCBkb3VibGUgcXVvdGVzIHdpdGggZXNjYXBlZCBxdW90ZXNcclxuICAgICAgICAvL2ZpcnN0LCBsZXRzIGVzY2FwZSB0aGUgY2hhcmFjdGVyc1xyXG4gICAgICAgIC8vc3RyID0gIHN0ci5yZXBsYWNlKC9bXl0vZyxmdW5jdGlvbih3KXtyZXR1cm4gJyUnK3cuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNil9KVxyXG4gICAgICAgIHN0ciA9IGVuY29kZVVSSShzdHIpO1xyXG5cclxuICAgICAgICAvL2Fsc28gZW5jb2RlIHNpbmdsZSBxdW90ZXNcclxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgvJy9nLCBcIiUyN1wiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlc2NhcGVkIHN0cmluZzogXFxuXCIrc3RyK1wiXFxudW5lc2NhcGVkIHN0cjpcXG5cIitUb29scy5VblNhbml0aXplSW5wdXQoc3RyKSk7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgZm9yIHB1dHRpbmcgaXQgYmFjayB0byBodW1hbiByZWFkYWJsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVuU2FuaXRpemVJbnB1dChzdHI6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBzdHI9IGRlY29kZVVSSShzdHIpO1xyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8lMjcvZywgXCInXCIpO1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9Ub29scy50cyIsImltcG9ydCB7VUl9IGZyb20gXCIuL1VJXCI7XHJcbmltcG9ydCB7VGFzaywgVGFza0hhbmRsZXJ9IGZyb20gXCIuL1Rhc2tzXCI7XHJcblxyXG4vLyBpbXBvcnQgKiBhcyBNb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQge0RhdGVUaW1lfSBmcm9tIFwiLi9EYXRlVGltZVwiO1xyXG5pbXBvcnQge1Rvb2xzfSBmcm9tIFwiLi9Ub29sc1wiO1xyXG5pbXBvcnQge0NvbmZpZ30gZnJvbSBcIi4vQ29uZmlnXCI7O1xyXG5cclxuLy9mb3IgdmV4IG1vZGFsIGRpYWxvZ1xyXG5kZWNsYXJlIHZhciB2ZXg6YW55OyAvLyB3YXkgb2YgZ2V0dGluZyBKUyBsb2FkZWQgbGlicmFyaWVzIHdvcmtpbmcgcHJvcGVybHlcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1haW5PYmpcclxue1xyXG4gICAgcHVibGljICB1aTpVSSA9IG5ldyBVSSgpO1xyXG4gICAgcHVibGljIHRhc2tfaGFuZGxlcjpUYXNrSGFuZGxlciA9IG5ldyBUYXNrSGFuZGxlcigpO1xyXG5cclxuICAgIC8vZm9yIHN0YXlpbmcgbG9nZ2VkIGluLSBoYXZlIHRvIHNheSBvciBudWxsLCBzaW5jZSB0aGV5IGFyZSBudWxsIGluaXRpYWxseSwgb3IgaWYgeW91IGNhbid0IGdldCB0aGVtIGZyb20gbG9jYWwgc3RvcmFnZVxyXG4gICAgcHVibGljIGlkOnN0cmluZ3xudWxsO1xyXG4gICAgcHVibGljIGF1dGhfa2V5OnN0cmluZ3xudWxsO1xyXG4gICAgcHVibGljIGxvZ2dlZF9pbjpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyB0YXNrczpUYXNrW107XHJcblxyXG4gICAgLy8gcHVibGljIHRvb2xzOlRvb2xzPSBuZXcgVG9vbHMoKTsvL2p1c3QgZm9yIGFjZXNzaW5nIGZyb20gSlNcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgLy9oYXZlIHRvIGNhc3QgdG8gc3RyaW5nLCBiZWNhdXNlIGxvY2Fsc3RvcmFnZSBjb3VsZCByZXR1cm4gYSBzdHJpbmcgb3IgbnVsbCwgd2hpY2ggdGhyb3dzIGFuIGVycm9yXHJcbiAgICAgICAgdGhpcy5pZCA9IDxzdHJpbmc+bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZFwiKTtcclxuICAgICAgICB0aGlzLmF1dGhfa2V5ID0gPHN0cmluZz5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhfa2V5XCIpO1xyXG4gICAgICAgIGlmKHRoaXMuaWQ9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvdWxkIG5vdCBsb2FkIHByZXZpb3VzIHNlc3Npb25cIik7XHJcbiAgICAgICAgICAgIHRoaXMudWkuU2hvd0xvZ2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIHByZXZpb3VzIHNlc3Npb24hXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2dlZEluKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2V0dXBFbnRlckhhbmRsaW5nKCk7XHJcblxyXG4gICAgICAgIC8vZm9yIHRlc3Rpbmc6XHJcbiAgICAgICAgLy8gdGhpcy51aS5TaG93Q2FsZW5kZXJNb2RhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBGb3IgZG9pbmcgQWpheCBjYWxscyB0byB0aGUgc2VydmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQWpheENhbGwoc3VjY2Vzc190b19jYWxsOkZ1bmN0aW9uLCBlcnJvcl90b19jYWxsOkZ1bmN0aW9uLCBkYXRhX3RvX3NlbmRfb2JqOk9iamVjdClcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuICAgICAgICB0aGlzLnVpLkxvYWRlclZpc2libGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWpheENhbGw6IGdvaW5nIHRvIHNlbmQ6IG9iajpcIitKU09OLnN0cmluZ2lmeShkYXRhX3RvX3NlbmRfb2JqKStcIiwgdG8gcGFnZTogXCIrQ29uZmlnLkJBQ0tFTkRfVVJMKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogQ29uZmlnLkJBQ0tFTkRfVVJMLFxyXG4gICAgICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgICAgICAgICAgZGF0YTogZGF0YV90b19zZW5kX29iaixcclxuICAgICAgICAgICAgLy8gZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgLy9qc29ucDogZmFsc2UsIC8vSSBhZGRlZCBqc29ucC0gYnkgZGVmYXVsdCByZXR1cm5zIGNyb3NzIG9yaWdpbiByZXF1ZXN0cyBhcyBqc29ucCBpc3RlYWQgb2YganNvblxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZURhdGEsIHRleHRTdGF0dXMsIGpxWEhSKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnVpLkxvYWRlclZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBSkFYQ0FMTDogcmVzcG9uc2VEYXRhOiBcIityZXNwb25zZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25fb2JqOmFueSA9IEpTT04ucGFyc2UocmVzcG9uc2VEYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihqc29uX29iai50eXBlPT09XCJlcnJvclwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX3RvX2NhbGwoanNvbl9vYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihqc29uX29iai50eXBlPT09XCJzdWNjZXNzXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc190b19jYWxsKGpzb25fb2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZURhdGEsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnUE9TVCBmYWlsZWQuJyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnVpLkxvYWRlclZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIHNvIHRoZXkgY2FuIGhpdCBlbnRlciBpbiB0aGUgcHdkIGZpZWxkIHRvIGxvZ2luL3JlZ2lzdGVyXHJcbiAgICAgKi9cclxuICAgIFNldHVwRW50ZXJIYW5kbGluZygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHNlbGY6TWFpbk9iaiA9IHRoaXM7XHJcbiAgICAgICAgLy9oYXZlIHRvIGFkZCBbMF0gdG8gYWNjZXNzIHRoZSBET00gZWxlbWVudC0gd2l0aG91dCBpdCBpdCBhY2Nlc3NlcyBqdXN0IHRoZSBqcXVlcnkgd3JhcHBlciBvYmplY3RcclxuICAgICAgICAkKFwiI2xvZ2luX3B3ZFwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgeyAgLy9jaGVja3Mgd2hldGhlciB0aGUgcHJlc3NlZCBrZXkgaXMgXCJFbnRlclwiXHJcbiAgICAgICAgICAgICAgICBzZWxmLkxvZ2luKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNyZWdpc3Rlcl9wd2RcIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHsgIC8vY2hlY2tzIHdoZXRoZXIgdGhlIHByZXNzZWQga2V5IGlzIFwiRW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgc2VsZi5SZWdpc3RlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEZvciByZWdpc3RlcmluZyBhIG5ldyB1c2VyLSBnZXQgdGhlIGVtYWlsIGFkZHJlc3MsIHBhc3N3b3JkLCBhbmQgYXR0ZW1wdCB0byByZWdpc3RlclxyXG4gICAgICovXHJcbiAgICBSZWdpc3RlcigpXHJcbiAgICB7XHJcbiAgICAgICAgLy9oYXZlIHRvIGNhc3QgYXMgYW55IHRvIGdldCB0eXBlc2NyaXB0IHRvIGlnbm9yZSB0aGF0IGpxdWVyeS52YWwgbWF5IHJldHVybiB1bmRlZmluZWQsIGFuZCBlcnJvcnMgb3V0XHJcbiAgICAgICAgbGV0IGVtYWlsOnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPGFueT4kKFwiI3JlZ2lzdGVyX2VtYWlsXCIpLnZhbCgpKTtcclxuICAgICAgICBsZXQgcHdkOnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPGFueT4kKFwiI3JlZ2lzdGVyX3B3ZFwiKS52YWwoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcjogZW1haWwgYW5kIHB3ZCBlbnRlcmVkOiBcIitlbWFpbCtcIiwgXCIrcHdkKTtcclxuXHJcbiAgICAgICAgLy9zbyBsZXRzIGNoZWNrIHRoZSBpbnB1dCBmaXJzdCwgYW5kIHByb3ZpZGUgYW4gZXJyb3IgaWYgc29tZXRoaW5nIHdhcyB3cm9uZy8gdGhleSBkaWRuJ3QgZW50ZXIgYm90aCBpbnB1dHNcclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyB0cnkgdG8gc3VibWl0IHRoZXNlIHRvIHRoZSBwaHAgcGFnZSwgYW5kIGdldCB3aGV0aGVyIHRoZXkgd2VyZSByZWdpc3RlcmVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgIGxldCBkYXRhX3RvX3NlbmRfb2JqOmFueSA9IG5ldyBPYmplY3QoKTtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cInJlZ2lzdGVyXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5lbWFpbD1lbWFpbDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnBhc3N3b3JkPXB3ZDtcclxuXHJcbiAgICAgICAgLy9OT1RFOiBpZiB5b3UgdHJ5IHRvIHNlbmQgIEpTT04gb2JqZWN0LCBpdCBqdXN0IHNlbmRzIHRoZSBzdHJpbmcgYXMgYSBrZXksIGFuZCBubyB2YWx1ZSwgc28gaGF2ZSB0byBzZW5kIHRoZSBhY3R1YWwgb2JqZWN0LCB3aGljaCBpdCBhc3N1bWFibHkgc3RyaW5naWZpZXMgYWdhaW5cclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyBzdWJtaXQgdGhlbSB0byB0aGUgcGhwIHBhZ2VcclxuXHJcbiAgICAgICAgbGV0IHNlbGY6TWFpbk9iaiA9IHRoaXM7Ly8gVGhlIGFqYXggZnVuY3Rpb25zIGFyZSBpbnNpZGUgYSBkaWZmZXJlbnQgb2JqZWN0LCBzbyB0aGlzIHdvbid0IHJlZmVyIHRvIHRoaXMgb2JqZWN0IGFueW1vcmUsIHNvIGhhdmUgdG8gbWFrZSBhbiBhbGlhcyB1cCBoZXJlIGZvciBpdCB0byBzdGlsbCBoYXZlIGFjY2VzcyB0byB0aGUgb2JqZWN0IHdlJ3JlIGluXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi51aS5TaG93RmVlZEJhY2soanNvbl9vYmoubWVzc2FnZSwgVUkuTUVTU0FHRV9TVUNDRVNTKTtcclxuICAgICAgICAgICAgc2VsZi51aS5TaG93TG9naW4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vc2hvdWxkIGFsc28gZmlsbCBpbiB0aGUgZW1haWwgYWRkcmVzcyBhbmQgY2xlYXIgdGhlIHBhc3N3b3JkIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAkKFwiI2xvZ2luX2VtYWlsXCIpLnZhbChlbWFpbCk7XHJcbiAgICAgICAgICAgICQoXCIjbG9naW5fcHdkXCIpLnZhbChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vYW5kIGNsZWFyIHRoZSByZWdpc3RlciBib3hlc1xyXG4gICAgICAgICAgICAkKFwiI3JlZ2lzdGVyX2VtYWlsXCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIiNyZWdpc3Rlcl9wd2RcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dGZWVkQmFjayhqc29uX29iai5tZXNzYWdlLCBVSS5NRVNTQUdFX0VSUk9SKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuQWpheENhbGwoc3VjY2VzcywgZXJyb3IsIGRhdGFfdG9fc2VuZF9vYmopO1xyXG4gICAgfVxyXG5cclxuICAgIExvZ2luKClcclxuICAgIHtcclxuXHJcbiAgICAgICAgbGV0IGVtYWlsOnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPGFueT4kKFwiI2xvZ2luX2VtYWlsXCIpLnZhbCgpKTtcclxuICAgICAgICBsZXQgcHdkOnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPGFueT4kKFwiI2xvZ2luX3B3ZFwiKS52YWwoKSk7XHJcblxyXG4gICAgICAgIC8vY2xlYXIgcGFzc3dvcmRcclxuICAgICAgICAkKFwiI2xvZ2luX3B3ZFwiKS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgIGxldCBkYXRhX3RvX3NlbmRfb2JqOmFueSA9IG5ldyBPYmplY3QoKTtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cImxvZ2luXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5lbWFpbD1lbWFpbDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnBhc3N3b3JkPXB3ZDtcclxuXHJcbiAgICAgICAgLy9OT1RFOiBpZiB5b3UgdHJ5IHRvIHNlbmQgIEpTT04gb2JqZWN0LCBpdCBqdXN0IHNlbmRzIHRoZSBzdHJpbmcgYXMgYSBrZXksIGFuZCBubyB2YWx1ZSwgc28gaGF2ZSB0byBzZW5kIHRoZSBhY3R1YWwgb2JqZWN0LCB3aGljaCBpdCBhc3N1bWFibHkgc3RyaW5naWZpZXMgYWdhaW5cclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyBzdWJtaXQgdGhlbSB0byB0aGUgcGhwIHBhZ2VcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2NsZWFyIHRoZSBlbWFpbCBpbnB1dCB0b286XHJcbiAgICAgICAgICAgICQoXCIjbG9naW5fZW1haWxcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAvL3NvIHN0b3JlIHRoZSBpZCBhbmQgYXV0aCBrZXksIGFuZCBicmluZyB1cCB0aGUgbG9nZ2VkIGluIGludGVyZmFjZVxyXG4gICAgICAgICAgICBzZWxmLlN0b3JlTG9naW4oanNvbl9vYmouaWQsIGpzb25fb2JqLnRva2VuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi51aS5TaG93RmVlZEJhY2soanNvbl9vYmoubWVzc2FnZSwgVUkuTUVTU0FHRV9FUlJPUik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLkFqYXhDYWxsKHN1Y2Nlc3MsIGVycm9yLCBkYXRhX3RvX3NlbmRfb2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTG9nT3V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkPW51bGw7XHJcbiAgICAgICAgdGhpcy5hdXRoX2tleT1udWxsO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiaWRcIik7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJhdXRoX2tleVwiKTtcclxuICAgICAgICB0aGlzLnVpLlNob3dMb2dpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIFN0b3JlTG9naW4oaWQ6c3RyaW5nLCBhdXRoX2tleTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pZD1pZDtcclxuICAgICAgICB0aGlzLmF1dGhfa2V5PWF1dGhfa2V5O1xyXG5cclxuICAgICAgICAvL3NhdmUgdG8gbG9jYWxzdG9yYWdlLCBzbyB3ZSBjYW4gc3RheSBsb2dnZWQgaW4gb24gYnJvd3NlciByZWZyZXNoXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpZFwiLCBpZCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhdXRoX2tleVwiLCBhdXRoX2tleSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU3RvcmVMb2dpbiBSYW4sIHRoaXMgaXM6IFwiK3RoaXMuY29uc3RydWN0b3IubmFtZSk7XHJcbiAgICAgICAgdGhpcy5Mb2dnZWRJbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9nZ2VkSW4oKVxyXG4gICAge1xyXG4gICAgICAgIC8vc28gaGlkZSBsb2dpbi8gcmVnaXN0ZXIgZGF0YSwgYW5kIHNob3cgdGhlIHRhc2sgdHJhY2tlciBpbnRlcmZhY2VcclxuICAgICAgICB0aGlzLnVpLlNob3dUYXNrVHJhY2tlcigpO1xyXG4gICAgICAgIHRoaXMuR2V0VGFza3NNeVNRTERhdGVzKG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdWJtaXRUYXNrKClcclxuICAgIHtcclxuICAgICAgICAvL2hpZGUgdGhlIEFkZFRhc2tGb3JtIGFuZCBTaG93IHRoZSBBZGRUYXNrQnV0dG9uIGFnYWluXHJcbiAgICAgICAgdGhpcy51aS5TaG93QWRkVGFza0J0bigpO1xyXG5cclxuICAgICAgICAvL2ZpcnN0IGdldCBhbGwgdGhlIGZpZWxkc1xyXG4gICAgICAgIGxldCB0YXNrOnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPHN0cmluZz4kKFwiI25ld190YXNrX25hbWVcIikudmFsKCkpO1xyXG4gICAgICAgIGxldCBjYXRlZ29yeTpzdHJpbmcgPSBUb29scy5TYW5pdGl6ZUlucHV0KDxzdHJpbmc+JChcIiNuZXdfdGFza19jYXRlZ29yeVwiKS52YWwoKSk7XHJcbiAgICAgICAgbGV0IHN0YXJ0X2RhdGU6c3RyaW5nID0gPHN0cmluZz4kKFwiI3Rhc2tfc3RhcnRfZGF0ZVwiKS52YWwoKTsgLy9KYW4gMjQgMjAxOFxyXG4gICAgICAgIGxldCBzdGFydF90aW1lOnN0cmluZyA9IDxzdHJpbmc+JChcIiN0YXNrX3N0YXJ0X3RpbWVcIikudmFsKCk7IC8vOCA6IDI1IFBNXHJcbiAgICAgICAgbGV0IGRhdGVfbXlzcWw6c3RyaW5nID0gRGF0ZVRpbWUuR2V0RGF0ZUZvck15U1FMRnJvbVJlYWRhYmxlKHN0YXJ0X2RhdGUpO1xyXG4gICAgICAgIGxldCB0aW1lX215c3FsOnN0cmluZyA9IERhdGVUaW1lLkdldFRpbWVGb3JNeVNRTEZyb21SZWFkYWJsZShzdGFydF90aW1lKTtcclxuICAgICAgICBsZXQgZGF0ZV90aW1lX215c3FsOnN0cmluZyA9IGRhdGVfbXlzcWwrIFwiIFwiKyB0aW1lX215c3FsO1xyXG5cclxuICAgICAgICAvL25vdyBzZW5kIGl0IHRvIHBocFxyXG4gICAgICAgIGxldCBkYXRhX3RvX3NlbmRfb2JqOmFueSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hY3Rpb249XCJBZGRUYXNrXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai51c2VyX2lkPXRoaXMuaWQ7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hdXRoX2tleT10aGlzLmF1dGhfa2V5O1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnRhc2s9dGFzaztcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmNhdGVnb3J5PWNhdGVnb3J5O1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lPWRhdGVfdGltZV9teXNxbDtcclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyBzdWJtaXQgdGhlbSB0byB0aGUgcGhwIHBhZ2VcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dGZWVkQmFjayhqc29uX29iai5tZXNzYWdlLCBVSS5NRVNTQUdFX1NVQ0NFU1MpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRhc2tfaWQ6bnVtYmVyID0gcGFyc2VJbnQoanNvbl9vYmouaWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdvdCBiYWNrIG5ldyB0YXNrIGlkOiBcIit0YXNrX2lkKTtcclxuXHJcbiAgICAgICAgICAgIC8vY2xlYXIgdGhlIGZvcm1cclxuICAgICAgICAgICAgJChcIiNuZXdfdGFza19uYW1lXCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJChcIiNuZXdfdGFza19jYXRlZ29yeVwiKS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgICAgICAvL2FkZCB0aGUgdGFzayB0byBvdXIgdGFza3MgYXJyYXlcclxuICAgICAgICAgICAgbGV0IHRhc2s6VGFzayA9IG5ldyBUYXNrKCk7XHJcblxyXG4gICAgICAgICAgICB0YXNrLmlkPXRhc2tfaWQ7XHJcbiAgICAgICAgICAgIHRhc2sudGFzaz1kYXRhX3RvX3NlbmRfb2JqLnRhc2s7XHJcbiAgICAgICAgICAgIHRhc2suY2F0ZWdvcnk9ZGF0YV90b19zZW5kX29iai5jYXRlZ29yeTtcclxuICAgICAgICAgICAgdGFzay5TZXRTdGFydERhdGVUaW1lRnJvbU15U1FMKGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudGFza3NbdGFza19pZF09dGFzaztcclxuXHJcbiAgICAgICAgICAgIC8vYWRkIHRoZSB0YXNrIHRvIG91ciBVSVxyXG4gICAgICAgICAgICBzZWxmLkFkZFRhc2sodGFzayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfRVJST1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5BamF4Q2FsbChzdWNjZXNzLCBlcnJvciwgZGF0YV90b19zZW5kX29iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEVkaXRUYXNrKGVkaXRfYnRuOkhUTUxFbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWRpdCB0YXNrIGNhbGxlZCBmcm9tIGVsZW1lbnQ6IFwiK2VkaXRfYnRuK1wiLCBcXG5qc29uOlwiK0pTT04uc3RyaW5naWZ5KGVkaXRfYnRuKStcIlxcbmNsYXNzOiBcIitlZGl0X2J0bi5jbGFzc0xpc3QpO1xyXG4gICAgICAgIC8vc2hvdWxkIGJlIGFibGUgdG8gZ2V0IHRoZSBhdHRyaWJ1dGUgdGhpcyB3YXk6XHJcbiAgICAgICAgbGV0IHRhc2tfaWQ6bnVtYmVyID0gcGFyc2VJbnQoPHN0cmluZz5lZGl0X2J0bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2staWRcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFzayBpZDogXCIrdGFza19pZCk7XHJcblxyXG4gICAgICAgIC8vZmlyc3Qgc2hvdWxkIG1ha2Ugc3VyZSB0YXNrIGVkaXQgaXMgbm90IGFscmVhZHkgZGlzcGxheWVkIHVuZGVybmVhdGggdGhpcy0gb3RoZXJ3aXNlIHdlIHNob3VsZCByZW1vdmUgaXQvIGhpZGUgaXQgKHJlbW92aW5nIGl0IG1pZ2h0IGJlIGJldHRlcilcclxuICAgICAgICBsZXQgZXhpc3RpbmdfdGFza19lZGl0OkpRdWVyeT0gJChcIiN0YXNrLVwiK3Rhc2tfaWQpLmZpbmQoXCIudGFza3NfZWRpdFwiKTtcclxuICAgICAgICBpZihleGlzdGluZ190YXNrX2VkaXQubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9yZW1vdmUgaXQgYW5kIHJldHVybjtcclxuICAgICAgICAgICAgZXhpc3RpbmdfdGFza19lZGl0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NvIG5vdyBsZXRzIHVuaGlkZSB0aGUgZWRpdCB0YXNrIGFyZWEgKHB1dCBpdCB1bmRlciB0aGlzIHRhc2spLCBhbmQgcG9wdWxhdGUgdGhlIHZhbHVlc1xyXG4gICAgICAgIGxldCB0YXNrX2VkaXQ6SlF1ZXJ5ID0gJChcIiN0YXNrc19lZGl0XCIpLmNsb25lKHRydWUpO1xyXG5cclxuICAgICAgICAvLyB0YXNrX2VkaXQucmVtb3ZlQXR0cihcImlkXCIpOy8vcmVtb3ZlIGlkIGZyb20gaXRcclxuICAgICAgICB0YXNrX2VkaXQuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHRhc2tfZWRpdC5hdHRyKFwiaWRcIiwgXCJ0YXNrLWVkaXQtXCIrdGFza19pZCk7XHJcblxyXG4gICAgICAgIHRhc2tfZWRpdC5hcHBlbmRUbyhcIiN0YXNrLVwiK3Rhc2tfaWQpO1xyXG5cclxuICAgICAgICAvL2FkZCB0YXNrIGlkIHRvIGNsb3NlIGJ0biB0byBiZSBhYmxlIHRvIGNsb3NlIHRoaXNcclxuICAgICAgICB0YXNrX2VkaXQuZmluZChcIi5idG4tY2xvc2UtdGFza1wiKS5hdHRyKFwiZGF0YS10YXNrLWlkXCIsIHRhc2tfaWQpO1xyXG4gICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLmJ0bi1kZWxldGUtdGFza1wiKS5hdHRyKFwiZGF0YS10YXNrLWlkXCIsIHRhc2tfaWQpO1xyXG4gICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLmJ0bi11cGRhdGUtdGFza1wiKS5hdHRyKFwiZGF0YS10YXNrLWlkXCIsIHRhc2tfaWQpO1xyXG5cclxuICAgICAgICAvL25vdyBwb3B1bGF0ZSBpbiBhbGwgdGhlIHRhc2sgaW5mbzpcclxuICAgICAgICAvL2hhdmUgdG8gZ3JhYiB0aGUgdGFzayBvYmplY3RcclxuICAgICAgICBsZXQgdGFzazpUYXNrID0gdGhpcy50YXNrc1t0YXNrX2lkXTtcclxuICAgICAgICB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LW5hbWVcIikudmFsKFRvb2xzLlVuU2FuaXRpemVJbnB1dCh0YXNrLnRhc2spKTtcclxuICAgICAgICB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LWNhdGVnb3J5XCIpLnZhbChUb29scy5VblNhbml0aXplSW5wdXQodGFzay5jYXRlZ29yeSkpO1xyXG5cclxuXHJcbiAgICAgICAgdGFza19lZGl0LmZpbmQoXCIudGFzay1pbnB1dC1zdGFydC1kYXRlXCIpLnZhbCh0YXNrLnN0YXJ0X2RhdGVfdGltZS5kYXRlX2Rpc3BsYXkpO1xyXG4gICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtc3RhcnQtdGltZVwiKS52YWwodGFzay5zdGFydF9kYXRlX3RpbWUudGltZV9kaXNwbGF5KTtcclxuXHJcblxyXG4gICAgICAgIGlmKHRhc2suZW5kX2RhdGVfdGltZSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtZW5kLWRhdGVcIikudmFsKHRhc2suZW5kX2RhdGVfdGltZS5kYXRlX2Rpc3BsYXkpO1xyXG4gICAgICAgICAgICB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LWVuZC10aW1lXCIpLnZhbCh0YXNrLmVuZF9kYXRlX3RpbWUudGltZV9kaXNwbGF5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWxzbyBoYXZlIHRvIHNldCB0aGUgdGltZSBhbmQgZGF0ZSBmaWVsZHMgdG8gYmUgYWJsZSB0byB1c2UgdGhlIGRhdGUgYW5kIHRpbWUgamF2YXNjcmlwdCBsaWJyYXJpZXMgZm9yIG5pY2UgVUlcclxuICAgICAgICAvL05PVEU6IHRoaXMgd2lsbCByZXNldCB0aGUgdGltZS8gZGF0ZSB0byB0aGUgY3VycmVudCB2YWx1ZVxyXG4gICAgICAgIHRoaXMudWkuV2lyZVVwRGF0ZSggdGFza19lZGl0LmZpbmQoXCIudGFzay1pbnB1dC1zdGFydC1kYXRlXCIpLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy51aS5XaXJlVXBUaW1lKCB0YXNrX2VkaXQuZmluZChcIi50YXNrLWlucHV0LXN0YXJ0LXRpbWVcIiksZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLnVpLldpcmVVcERhdGUoIHRhc2tfZWRpdC5maW5kKFwiLnRhc2staW5wdXQtZW5kLWRhdGVcIiksZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudWkuV2lyZVVwVGltZSggdGFza19lZGl0LmZpbmQoXCIudGFzay1pbnB1dC1lbmQtdGltZVwiKSxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsb3NlRWRpdFRhc2soYnRuX2Nsb3NlOkhUTUxFbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0YXNrX2lkOm51bWJlciA9IHBhcnNlSW50KDxzdHJpbmc+YnRuX2Nsb3NlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFzay1pZFwiKSk7XHJcbiAgICAgICAgbGV0IGV4aXN0aW5nX3Rhc2tfZWRpdDpKUXVlcnk9ICQoXCIjdGFzay1cIit0YXNrX2lkKS5maW5kKFwiLnRhc2tzX2VkaXRcIik7XHJcbiAgICAgICAgaWYoZXhpc3RpbmdfdGFza19lZGl0Lmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vcmVtb3ZlIGl0IGFuZCByZXR1cm47XHJcbiAgICAgICAgICAgIGV4aXN0aW5nX3Rhc2tfZWRpdC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEZvciBmaW5pc2hpbmcgdGhlIHRhc2sganVzdCBjbGlja2luZyBvbiB0aGUgYnV0dG9uLSB0byBmaW5pc2ggaXQgcXVpY2sgd2l0aHQgaGUgY3VycmVudCBkYXRlLyB0aW1lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGaW5pc2hUYXNrKGJ0bl9jbGlja2VkOkhUTUxFbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIC8vZmlyc3QgZ2V0IHdoaWNoIHRhc2sgaXQgd2FzXHJcbiAgICAgICAgbGV0IHRhc2tfaWQ6bnVtYmVyID0gcGFyc2VJbnQoPHN0cmluZz5idG5fY2xpY2tlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2staWRcIikpO1xyXG5cclxuICAgICAgICAvL25vdyBjb252ZXJ0IHJlYWRhYmxlIGRhdGVzIGFuZCB0aW1lcyB0byBteXNxbCBjb21wYXRpYmxlIG9uZXNcclxuICAgICAgICBsZXQgZGF0ZV90aW1lX215c3FsX2VuZDpzdHJpbmcgPSBEYXRlVGltZS5HZXRDdXJyZW50RGF0ZVRpbWVNeVNRTCgpO1xyXG5cclxuICAgICAgICAvL25vdyBzZW5kIGl0IHRvIHBocFxyXG4gICAgICAgIGxldCBkYXRhX3RvX3NlbmRfb2JqOmFueSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hY3Rpb249XCJGaW5pc2hUYXNrXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai51c2VyX2lkPXRoaXMuaWQ7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hdXRoX2tleT10aGlzLmF1dGhfa2V5O1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnRhc2tfaWQ9dGFza19pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmRhdGVfdGltZV9lbmQ9ZGF0ZV90aW1lX215c3FsX2VuZDtcclxuXHJcblxyXG4gICAgICAgIC8vbm93IGxldHMgc3VibWl0IHRoZW0gdG8gdGhlIHBocCBwYWdlXHJcbiAgICAgICAgbGV0IHNlbGY6TWFpbk9iaiA9IHRoaXM7Ly8gVGhlIGFqYXggZnVuY3Rpb25zIGFyZSBpbnNpZGUgYSBkaWZmZXJlbnQgb2JqZWN0LCBzbyB0aGlzIHdvbid0IHJlZmVyIHRvIHRoaXMgb2JqZWN0IGFueW1vcmUsIHNvIGhhdmUgdG8gbWFrZSBhbiBhbGlhcyB1cCBoZXJlIGZvciBpdCB0byBzdGlsbCBoYXZlIGFjY2VzcyB0byB0aGUgb2JqZWN0IHdlJ3JlIGluXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3MoanNvbl9vYmo6YW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9zbyBub3cgdXBkYXRlIHRoZSB0YXNrIG9iamVjdCBpbiB0aGUgYXJyYXkgd2UgYWxyZWFkeSBoYXZlIHdpdGggdGhlIHVwZGF0ZSwgdGhlbiB0ZWxsIHRoZSBVSSB0byB1cGRhdGUgdGhhdCB0YXNrXHJcbiAgICAgICAgICAgIHNlbGYudGFza3NbdGFza19pZF0udGFzaz0gZGF0YV90b19zZW5kX29iai50YXNrX25hbWU7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnRhc2tzW3Rhc2tfaWRdLlNldEVuZERhdGVUaW1lRnJvbU15U1FMKGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX2VuZCk7XHJcblxyXG4gICAgICAgICAgICAvL3RoZW4gdGVsbCBtYWluIHRoaXMgdGFzayBuZWVkcyB0byBiZSB1cGRhdGVkIGluIHRoZSBVSVxyXG4gICAgICAgICAgICBzZWxmLlNldFRhc2tVSUZyb21UYXNrKCQoXCIjdGFzay1cIit0YXNrX2lkKSwgc2VsZi50YXNrc1t0YXNrX2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfRVJST1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5BamF4Q2FsbChzdWNjZXNzLCBlcnJvciwgZGF0YV90b19zZW5kX29iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVRhc2soYnRuX3VwZGF0ZV90YXNrOkhUTUxFbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIC8vZmlyc3QgZ2V0IHdoaWNoIHRhc2sgaXQgd2FzXHJcbiAgICAgICAgbGV0IHRhc2tfaWQ6bnVtYmVyID0gcGFyc2VJbnQoPHN0cmluZz5idG5fdXBkYXRlX3Rhc2suZ2V0QXR0cmlidXRlKFwiZGF0YS10YXNrLWlkXCIpKTtcclxuXHJcbiAgICAgICAgLy90aGVuIGdldCBhbGwgdGhlIHZhbHVlcyBmcm9tIHRoZSBpbnB1dHNcclxuICAgICAgICAvL2dyYWIgdGhlIGVkaXQgd2luZG93XHJcbiAgICAgICAgbGV0IHRhc2tfZWRpdF93aW5kb3c6SlF1ZXJ5ID0gICQoXCIjdGFzay1lZGl0LVwiK3Rhc2tfaWQpO1xyXG5cclxuICAgICAgICAvL2xldHMgY2hlY2sgaWYgd2UgYWN0dWFsbHkgZm91ZG4gdGhlIHdpbmRvdzpcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlwiKVxyXG5cclxuICAgICAgICBsZXQgdGFza19uYW1lOnN0cmluZyA9IFRvb2xzLlNhbml0aXplSW5wdXQoPHN0cmluZz50YXNrX2VkaXRfd2luZG93LmZpbmQoXCIudGFzay1pbnB1dC1uYW1lXCIpLnZhbCgpKTtcclxuICAgICAgICBsZXQgdGFza19jYXRlZ29yeTpzdHJpbmcgPSBUb29scy5TYW5pdGl6ZUlucHV0KDxzdHJpbmc+dGFza19lZGl0X3dpbmRvdy5maW5kKFwiLnRhc2staW5wdXQtY2F0ZWdvcnlcIikudmFsKCkpO1xyXG4gICAgICAgIGxldCB0YXNrX2RhdGVfc3RhcnRfc3RyOnN0cmluZyA9IDxzdHJpbmc+dGFza19lZGl0X3dpbmRvdy5maW5kKFwiLnRhc2staW5wdXQtc3RhcnQtZGF0ZVwiKS52YWwoKTtcclxuICAgICAgICBsZXQgdGFza190aW1lX3N0YXJ0X3N0cjpzdHJpbmcgPSA8c3RyaW5nPnRhc2tfZWRpdF93aW5kb3cuZmluZChcIi50YXNrLWlucHV0LXN0YXJ0LXRpbWVcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHRhc2tfZGF0ZV9lbmRfc3RyOnN0cmluZyA9IDxzdHJpbmc+dGFza19lZGl0X3dpbmRvdy5maW5kKFwiLnRhc2staW5wdXQtZW5kLWRhdGVcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHRhc2tfdGltZV9lbmRfc3RyOnN0cmluZyA9IDxzdHJpbmc+dGFza19lZGl0X3dpbmRvdy5maW5kKFwiLnRhc2staW5wdXQtZW5kLXRpbWVcIikudmFsKCk7XHJcblxyXG4gICAgICAgIC8vbm90IHdvcmtpbmcgY29ycnJlY3RseVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ29pbmcgdG8gc3VibWl0IHVwZGF0ZSB0YXNrIHdpdGggdmFsdWVzOiBcXG5cIit0YXNrX25hbWUrXCJcXG5cIit0YXNrX2NhdGVnb3J5K1wiXFxuXCIrdGFza19kYXRlX3N0YXJ0X3N0citcIlxcblwiK3Rhc2tfdGltZV9zdGFydF9zdHIrXCJcXG5cIit0YXNrX2RhdGVfZW5kX3N0citcIlxcblwiK3Rhc2tfdGltZV9lbmRfc3RyKTtcclxuXHJcbiAgICAgICAgLy9ub3cgY29udmVydCByZWFkYWJsZSBkYXRlcyBhbmQgdGltZXMgdG8gbXlzcWwgY29tcGF0aWJsZSBvbmVzXHJcbiAgICAgICAgbGV0IGRhdGVfdGltZV9teXNxbF9zdGFydDpzdHJpbmd8bnVsbCA9IERhdGVUaW1lLkdldERhdGVUaW1lRm9yTXlTUUxGcm9tUmVhZGFibGUodGFza19kYXRlX3N0YXJ0X3N0ciwgdGFza190aW1lX3N0YXJ0X3N0cik7XHJcbiAgICAgICAgbGV0IGRhdGVfdGltZV9teXNxbF9lbmQ6c3RyaW5nfG51bGwgPSBEYXRlVGltZS5HZXREYXRlVGltZUZvck15U1FMRnJvbVJlYWRhYmxlKHRhc2tfZGF0ZV9lbmRfc3RyLCB0YXNrX3RpbWVfZW5kX3N0cik7XHJcbiAgICAgICAgaWYoVG9vbHMuSXNOdWxsKGRhdGVfdGltZV9teXNxbF9lbmQpKVxyXG4gICAgICAgICAgICBkYXRlX3RpbWVfbXlzcWxfZW5kPVwiTlVMTFwiO1xyXG5cclxuICAgICAgICAvL25vdyBzZW5kIGl0IHRvIHBocFxyXG4gICAgICAgIGxldCBkYXRhX3RvX3NlbmRfb2JqOmFueSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hY3Rpb249XCJVcGRhdGVUYXNrXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai51c2VyX2lkPXRoaXMuaWQ7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hdXRoX2tleT10aGlzLmF1dGhfa2V5O1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnRhc2tfaWQ9dGFza19pZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnRhc2tfbmFtZT10YXNrX25hbWU7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5jYXRlZ29yeT10YXNrX2NhdGVnb3J5O1xyXG4gICAgICAgIGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX3N0YXJ0PWRhdGVfdGltZV9teXNxbF9zdGFydDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmRhdGVfdGltZV9lbmQ9ZGF0ZV90aW1lX215c3FsX2VuZDtcclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnBhcmVudF9pZD1udWxsO1xyXG5cclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyBzdWJtaXQgdGhlbSB0byB0aGUgcGhwIHBhZ2VcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3NvIG5vdyB1cGRhdGUgdGhlIHRhc2sgb2JqZWN0IGluIHRoZSBhcnJheSB3ZSBhbHJlYWR5IGhhdmUgd2l0aCB0aGUgdXBkYXRlLCB0aGVuIHRlbGwgdGhlIFVJIHRvIHVwZGF0ZSB0aGF0IHRhc2tcclxuICAgICAgICAgICAgc2VsZi50YXNrc1t0YXNrX2lkXS50YXNrPSBkYXRhX3RvX3NlbmRfb2JqLnRhc2tfbmFtZTtcclxuICAgICAgICAgICAgc2VsZi50YXNrc1t0YXNrX2lkXS5jYXRlZ29yeT0gZGF0YV90b19zZW5kX29iai5jYXRlZ29yeTtcclxuICAgICAgICAgICAgc2VsZi50YXNrc1t0YXNrX2lkXS5TZXRTdGFydEFuZEVuZERhdGVUaW1lRnJvbU15U1FMKGRhdGFfdG9fc2VuZF9vYmouZGF0ZV90aW1lX3N0YXJ0LCBkYXRhX3RvX3NlbmRfb2JqLmRhdGVfdGltZV9lbmQpO1xyXG5cclxuICAgICAgICAgICAgLy9yZW1vdmUgdGhlIGVkaXQgYXJlYVxyXG4gICAgICAgICAgICB0YXNrX2VkaXRfd2luZG93LnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy90aGVuIHRlbGwgbWFpbiB0aGlzIHRhc2sgbmVlZHMgdG8gYmUgdXBkYXRlZCBpbiB0aGUgVUlcclxuICAgICAgICAgICAgc2VsZi5TZXRUYXNrVUlGcm9tVGFzaygkKFwiI3Rhc2stXCIrdGFza19pZCksIHNlbGYudGFza3NbdGFza19pZF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dGZWVkQmFjayhqc29uX29iai5tZXNzYWdlLCBVSS5NRVNTQUdFX0VSUk9SKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuQWpheENhbGwoc3VjY2VzcywgZXJyb3IsIGRhdGFfdG9fc2VuZF9vYmopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBGb3IgYWRkaW5nIGEgbmV3IHRhc2sgaW4gdGhlIFVJIGZyb20gYmVpbmcgc2VudCBhIHRhc2sgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQWRkVGFzayh0YXNrOlRhc2spXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRhc2tfcHJvdG90eXBlOkpRdWVyeSA9ICQoXCIjdGFza19kaXNwbGF5ZWRfcHJvdG9UeXBlXCIpLmNsb25lKHRydWUpO1xyXG4gICAgICAgIHRhc2tfcHJvdG90eXBlLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICB0YXNrX3Byb3RvdHlwZS5yZW1vdmVBdHRyKFwiaWRcIik7XHJcblxyXG4gICAgICAgIC8vc2hvdWxkIHNvcnQgdGhlbSBpbnRvIHVuZmluaXNoZWQgdGFza3MgdnMuIGZpbmlzaGVkIHRhc2tzXHJcbiAgICAgICAgaWYodGFzay5lbmRfZGF0ZV90aW1lIT1udWxsKVxyXG4gICAgICAgICAgICAvL3Rhc2tfcHJvdG90eXBlLnByZXBlbmRUbyhcIiN0YXNrc19jb250YWluZXJfZGF0ZV9yYW5nZVwiKTsvL3ByZXBlbmQtIHNvIHRoZXkgYXJlIG9yZ2FuaXplZCBieSBkYXRlLyBtb3N0IHJlY2VudFxyXG4gICAgICAgICAgIHRhc2tfcHJvdG90eXBlLmFwcGVuZFRvKFwiI3Rhc2tzX2NvbnRhaW5lcl9kYXRlX3JhbmdlXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgLy8gdGFza19wcm90b3R5cGUucHJlcGVuZFRvKFwiI3Rhc2tzX2NvbnRhaW5lcl91bmZpbmlzaGVkXCIpO1xyXG4gICAgICAgICAgICB0YXNrX3Byb3RvdHlwZS5hcHBlbmRUbyhcIiN0YXNrc19jb250YWluZXJfdW5maW5pc2hlZFwiKTtcclxuXHJcbiAgICAgICAgLy9hZGQgdGhlIGlkIHRvIGl0LCBzbyB3ZSBjYW4gZmV0Y2ggaXQgZWFzaWx5XHJcbiAgICAgICAgdGFza19wcm90b3R5cGUuYXR0cihcImlkXCIsIFwidGFzay1cIit0YXNrLmlkKTtcclxuICAgICAgICB0aGlzLlNldFRhc2tVSUZyb21UYXNrKHRhc2tfcHJvdG90eXBlLCB0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgVW5pdmVyc2FsIGZvciBzZXR0aW5nIGEgdGFzayBVSSBmcm9tIGEgdGFzayBvYmplY3QtIGJvdGggZm9yIHVwZGF0aW5nIGFuZCBmb3IgbmV3IG9uZXNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBTZXRUYXNrVUlGcm9tVGFzayh0YXNrX3VpOkpRdWVyeSwgdGFzazpUYXNrKVxyXG4gICAge1xyXG4gICAgICAgIC8vbm93IGNoYW5nZSBvdXQgdGhlIHRhZyB2YWx1ZXNcclxuICAgICAgICB0YXNrX3VpLmZpbmQoXCIudGFza19kaXNwbGF5ZWRfbmFtZVwiKS5odG1sKFRvb2xzLlVuU2FuaXRpemVJbnB1dCh0YXNrLnRhc2spKTtcclxuICAgICAgICB0YXNrX3VpLmZpbmQoXCIudGFza19kaXNwbGF5ZWRfY2F0ZWdvcnlcIikuaHRtbChcIihcIitUb29scy5VblNhbml0aXplSW5wdXQodGFzay5jYXRlZ29yeSkrXCIpXCIpO1xyXG4gICAgICAgIHRhc2tfdWkuZmluZChcIi50YXNrX2Rpc3BsYXllZF9zdGFydFwiKS5odG1sKFwiU3RhcnQ6IFwiK3Rhc2suc3RhcnRfZGF0ZV90aW1lLmRhdGVfZGlzcGxheSsgXCIsICBcIit0YXNrLnN0YXJ0X2RhdGVfdGltZS50aW1lX2Rpc3BsYXkpO1xyXG5cclxuICAgICAgICBpZighVG9vbHMuSXNOdWxsKHRhc2suZW5kX2RhdGVfdGltZV9zdHIpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFza191aS5maW5kKFwiLnRhc2tfZGlzcGxheWVkX2VuZFwiKS5odG1sKChcIjxici8+RW5kOiBcIiArICg8RGF0ZVRpbWU+dGFzay5lbmRfZGF0ZV90aW1lKS5kYXRlX2Rpc3BsYXkgKyBcIiwgIFwiICsgKDxEYXRlVGltZT50YXNrLmVuZF9kYXRlX3RpbWUpLnRpbWVfZGlzcGxheSkpO1xyXG4gICAgICAgICAgICB0YXNrX3VpLmZpbmQoXCIuYnRuLWZpbmlzaC10YXNrXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpOy8vaGlkZSBlbmQgdGFzayBidXR0b25cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFza191aS5maW5kKFwiLmJ0bi1maW5pc2gtdGFza1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7Ly9oaWRlIGVuZCB0YXNrIGJ1dHRvblxyXG4gICAgICAgICAgICB0YXNrX3VpLmZpbmQoXCIudGFza19kaXNwbGF5ZWRfZW5kXCIpLmh0bWwoXCIoVGFzayBub3QgZmluaXNoZWQpIFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWxzbyBzdG9yZSB0aGUgdGFzayBpZCBvbiB0aGUgZWRpdCBidG46XHJcbiAgICAgICAgdGFza191aS5maW5kKFwiLmJ0bi1lZGl0LXRhc2tcIikuYXR0cihcImRhdGEtdGFzay1pZFwiLCB0YXNrLmlkKTtcclxuICAgICAgICB0YXNrX3VpLmZpbmQoXCIuYnRuLWZpbmlzaC10YXNrXCIpLmF0dHIoXCJkYXRhLXRhc2staWRcIiwgdGFzay5pZCk7XHJcblxyXG5cclxuICAgICAgICBpZighVG9vbHMuSXNOdWxsKHRhc2suZW5kX2RhdGVfdGltZV9zdHIpIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lX2RpZmY6c3RyaW5nID0gRGF0ZVRpbWUuRGlmZmVyZW5jZUluTWlucyh0YXNrLnN0YXJ0X2RhdGVfdGltZSwgPERhdGVUaW1lPnRhc2suZW5kX2RhdGVfdGltZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9yIHRhc2s6IFwiK3Rhc2sudGFzaytcIiwgdGltZSBkaWZmZXJlbmNlOiBcIit0aW1lX2RpZmYpO1xyXG4gICAgICAgICAgICAvL3B1dCBpbiB0aGUgdG90YWwgdGltZVxyXG4gICAgICAgICAgICB0YXNrX3VpLmZpbmQoXCIudGFza19kaXNwbGF5ZWRfdG90YWxcIikuaHRtbChcIjxici8+VG90YWwgdGltZTogXCIrdGltZV9kaWZmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGFza191aS5maW5kKFwiLnRhc2tfZGlzcGxheWVkX3RvdGFsXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vc2hvdWxkIGJlIGNhbGxlZCBmcm9tIGNsYXNzICdidG4tZGVsZXRlLXRhc2snXHJcbiAgICBwdWJsaWMgRGVsZXRlVGFzayhidG5fY2xpY2tlZDpIVE1MRWxlbWVudClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2VsZjpNYWluT2JqID0gdGhpcztcclxuICAgICAgICBsZXQgdGFza19pZDpudW1iZXIgPSBwYXJzZUludCg8c3RyaW5nPmJ0bl9jbGlja2VkLmdldEF0dHJpYnV0ZShcImRhdGEtdGFzay1pZFwiKSk7XHJcbiAgICAgICAgLy9zaG91bGQgc2hvdyBwb3B1cCBjb25maXJtYXRpb25cclxuICAgICAgICB2ZXguZGlhbG9nLmNvbmZpcm0oe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgdGFzayAnK3NlbGYudGFza3NbdGFza19pZF0udGFzayxcclxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh2YWx1ZTpib29sZWFuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5EZWxldGVUYXNrQWZ0ZXJDb25mKGJ0bl9jbGlja2VkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIERlbGV0ZVRhc2tBZnRlckNvbmYoYnRuX2NsaWNrZWQ6SFRNTEVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgLy9maXJzdCBnZXQgd2hpY2ggdGFzayBpdCB3YXNcclxuICAgICAgICBsZXQgdGFza19pZDpudW1iZXIgPSBwYXJzZUludCg8c3RyaW5nPmJ0bl9jbGlja2VkLmdldEF0dHJpYnV0ZShcImRhdGEtdGFzay1pZFwiKSk7XHJcblxyXG4gICAgICAgIC8vdGhlbiBnZXQgYWxsIHRoZSB2YWx1ZXMgZnJvbSB0aGUgaW5wdXRzXHJcbiAgICAgICAgLy9ncmFiIHRoZSBlZGl0IHdpbmRvd1xyXG4gICAgICAgIGxldCB0YXNrX2VkaXRfd2luZG93OkpRdWVyeSA9ICAkKFwiI3Rhc2stZWRpdC1cIit0YXNrX2lkKTtcclxuXHJcblxyXG4gICAgICAgIC8vbm90IHdvcmtpbmcgY29ycnJlY3RseVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ29pbmcgdG8gZGVsZXRlIHRhc2sgaWQ6IFwiK3Rhc2tfaWQpO1xyXG5cclxuICAgICAgICAvL25vdyBzZW5kIGl0IHRvIHBocFxyXG4gICAgICAgIGxldCBkYXRhX3RvX3NlbmRfb2JqOmFueSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hY3Rpb249XCJEZWxldGVUYXNrXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai51c2VyX2lkPXRoaXMuaWQ7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hdXRoX2tleT10aGlzLmF1dGhfa2V5O1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLnRhc2tfaWQ9dGFza19pZDtcclxuXHJcbiAgICAgICAgLy9ub3cgbGV0cyBzdWJtaXQgdGhlbSB0byB0aGUgcGhwIHBhZ2VcclxuICAgICAgICBsZXQgc2VsZjpNYWluT2JqID0gdGhpczsvLyBUaGUgYWpheCBmdW5jdGlvbnMgYXJlIGluc2lkZSBhIGRpZmZlcmVudCBvYmplY3QsIHNvIHRoaXMgd29uJ3QgcmVmZXIgdG8gdGhpcyBvYmplY3QgYW55bW9yZSwgc28gaGF2ZSB0byBtYWtlIGFuIGFsaWFzIHVwIGhlcmUgZm9yIGl0IHRvIHN0aWxsIGhhdmUgYWNjZXNzIHRvIHRoZSBvYmplY3Qgd2UncmUgaW5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnRhc2tzLmZvckVhY2goZnVuY3Rpb24oaXRlbTpUYXNrKXtjb25zb2xlLmxvZyhpdGVtLmlkK1wiOiBcIitpdGVtLnRhc2spfSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzZWxmLnRhc2tzW3Rhc2tfaWRdO1xyXG4gICAgICAgICAgICBzZWxmLnRhc2tzLmZvckVhY2goZnVuY3Rpb24oaXRlbTpUYXNrKXtjb25zb2xlLmxvZyhpdGVtLmlkK1wiOiBcIitpdGVtLnRhc2spfSk7XHJcblxyXG4gICAgICAgICAgICAvL2Fsc28gcmVtb3ZlIHRoZSB0YXNrIChhbmQgZWRpdCBhcmVhKSBmcm9tIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgLy9zbyBmaW5kIHRhc2sgaWQgb2YgSFRNTCBlbGVtZW50IGFuZCByZW1vdmUgaXRcclxuICAgICAgICAgICAgJChcIiN0YXNrLVwiK3Rhc2tfaWQpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcihqc29uX29iajphbnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLnVpLlNob3dGZWVkQmFjayhqc29uX29iai5tZXNzYWdlLCBVSS5NRVNTQUdFX0VSUk9SKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuQWpheENhbGwoc3VjY2VzcywgZXJyb3IsIGRhdGFfdG9fc2VuZF9vYmopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBOZWVkcyB0byBiZSBpbiBteXNxbCBkYXRlIHRpbWUgZm9ybWF0IGxpa2U6XHJcbiAgICAyMDEyLTA2LTIyIDA1OjQwOjA2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRUYXNrc015U1FMRGF0ZXMoZGF0ZV90aW1lX3N0YXJ0OnN0cmluZ3xudWxsLCBkYXRlX3RpbWVfZW5kOnN0cmluZ3xudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2V0VGFza3NNeVNRTERhdGVzIGNsaWNrZWQhXCIpO1xyXG5cclxuICAgICAgICAvL2lmIHdlIHBhc3MgMiBudWxscywgd2UnbGwganVzdCB1c2UgdGhlIGRlZmF1bHQgZGF0ZSByYW5nZVxyXG4gICAgICAgIGlmKGRhdGVfdGltZV9zdGFydD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vbGV0cyBkbyB1cCB0byAzMCBkYXlzIGFnbyBieSBkZWZhdWx0IHJpZ2h0IG5vdz9cclxuICAgICAgICAgICAgbGV0IGRhdGVfdGltZV9hZ286RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGRhdGVfdGltZV9hZ28uc2V0RGF0ZShkYXRlX3RpbWVfYWdvLmdldERhdGUoKSAtIDMwKTtcclxuXHJcbiAgICAgICAgICAgIC8vZm9yIGFkZGluZyBsZWFkaW5nIHplcm9lcyBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNjA1MjE0L2phdmFzY3JpcHQtYWRkLWxlYWRpbmctemVyb2VzLXRvLWRhdGVcclxuICAgICAgICAgICAgLy8tMiBnaXZlcyBqdXN0IHRoZSBsYXN0IDIgZGlnaXRzXHJcbiAgICAgICAgICAgIGxldCBkYXlfbnVtMTpzdHJpbmcgPSAoXCIwXCIrZGF0ZV90aW1lX2Fnby5nZXREYXRlKCkpLnNsaWNlKC0yKTtcclxuICAgICAgICAgICAgbGV0IG1vbnRoX251bTE6c3RyaW5nID0gKFwiMFwiK2RhdGVfdGltZV9hZ28uZ2V0TW9udGgoKSsxKS5zbGljZSgtMik7XHJcblxyXG4gICAgICAgICAgICAvL2hhdmUgdG8gYWRkIDEgdG8gbW9udGggdG8gY2hhbmdlIGZyb20gMC0xMSB0byAxLTEyXHJcbiAgICAgICAgICAgIGRhdGVfdGltZV9zdGFydD1kYXRlX3RpbWVfYWdvLmdldEZ1bGxZZWFyKCkrXCItXCIrbW9udGhfbnVtMStcIi1cIitkYXlfbnVtMTtcclxuICAgICAgICAgICAgLy9ub3cgYWRkIHRpbWUgdG8gaXRcclxuICAgICAgICAgICAgZGF0ZV90aW1lX3N0YXJ0PSBkYXRlX3RpbWVfc3RhcnQrXCIgXCIrXCIwMDowMDowMFwiO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdGFydCBvZiB0aGUgZGF5IHllc3RlcmRheTogXCIrZGF0ZV90aW1lX3N0YXJ0KTtcclxuXHJcbiAgICAgICAgICAgIC8vbm93IGxldHMgZG8gdGhlIHNhbWUgZm9yIHRoZSBlbmQgb2YgdGhlIGRheVxyXG4gICAgICAgICAgICBsZXQgZGF0ZV9lbmRfb2ZfZGF5OkRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLy9hZGRpbmcgbGVhZGluZyB6ZXJvZXMgdG8gZGF5IGFnYWluOlxyXG4gICAgICAgICAgICBsZXQgZGF5X251bTI6c3RyaW5nID0gKFwiMFwiK2RhdGVfZW5kX29mX2RheS5nZXREYXRlKCkpLnNsaWNlKC0yKTtcclxuICAgICAgICAgICAgbGV0IG1vbnRoX251bTI6c3RyaW5nID0gKFwiMFwiK2RhdGVfZW5kX29mX2RheS5nZXRNb250aCgpKzEpLnNsaWNlKC0yKTtcclxuXHJcbiAgICAgICAgICAgIC8vaGF2ZSB0byBhZGQgMSB0byBtb250aCB0byBjaGFuZ2UgZnJvbSAwLTExIHRvIDEtMTJcclxuICAgICAgICAgICAgZGF0ZV90aW1lX2VuZD1kYXRlX2VuZF9vZl9kYXkuZ2V0RnVsbFllYXIoKStcIi1cIittb250aF9udW0yK1wiLVwiK2RheV9udW0yO1xyXG4gICAgICAgICAgICAvL25vdyBhZGQgdGltZSB0byBpdFxyXG4gICAgICAgICAgICBkYXRlX3RpbWVfZW5kPSBkYXRlX3RpbWVfZW5kK1wiIFwiK1wiMjM6NTk6NTlcIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW5kIG9mIHRoZSBkYXkgdG9kYXk6IFwiK2RhdGVfdGltZV9lbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRhdGFfdG9fc2VuZF9vYmo6YW55ID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmFjdGlvbj1cIkdldFRhc2tzXCI7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai51c2VyX2lkPXRoaXMuaWQ7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5hdXRoX2tleT10aGlzLmF1dGhfa2V5O1xyXG5cclxuICAgICAgICBkYXRhX3RvX3NlbmRfb2JqLmRhdGVfdGltZV9zdGFydD1kYXRlX3RpbWVfc3RhcnQ7XHJcbiAgICAgICAgZGF0YV90b19zZW5kX29iai5kYXRlX3RpbWVfZW5kPWRhdGVfdGltZV9lbmQ7XHJcblxyXG5cclxuICAgICAgICAvL25vdyBsZXRzIHN1Ym1pdCB0aGVtIHRvIHRoZSBwaHAgcGFnZVxyXG4gICAgICAgIGxldCBzZWxmOk1haW5PYmogPSB0aGlzOy8vIFRoZSBhamF4IGZ1bmN0aW9ucyBhcmUgaW5zaWRlIGEgZGlmZmVyZW50IG9iamVjdCwgc28gdGhpcyB3b24ndCByZWZlciB0byB0aGlzIG9iamVjdCBhbnltb3JlLCBzbyBoYXZlIHRvIG1ha2UgYW4gYWxpYXMgdXAgaGVyZSBmb3IgaXQgdG8gc3RpbGwgaGF2ZSBhY2Nlc3MgdG8gdGhlIG9iamVjdCB3ZSdyZSBpblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGpzb25fb2JqLm1lc3NhZ2U9PVwiTm9SZXN1bHRzXCIpLy9jb3VsZCBjb21lIGJhY2sgd2l0aCBubyByZXN1bHRzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR290IG5vIHRhc2tzIGJhY2ssIGVtcHR5IGZvciB3aGF0IHdlIHNlYXJjaGVkIGZvclxcbnNxbDogXCIranNvbl9vYmouc3FsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vZ28gdGhyb3VnaCB0aGUgdGFza3MsIGNyZWF0aW5nIG5ldyBIVE1MIGZvciBlYWNoIG9uZSB0byBzaG93XHJcbiAgICAgICAgICAgICAgICAvL3Nob3VsZCBoYXZlIHR3byB0eXBlcy0gdGFza3MgdGhhdCBhcmVuJ3QgY29tcGxldGUsIGFuZCB0YXNrcyB0aGF0IGFyZSBjb21wbGV0ZSBmcm9tIGJlZm9yZVxyXG4gICAgICAgICAgICAgICAgLy9idXQgYWxzbyBuZWVkIGhpZXJhcmNoeSBmb3Igb25lcyB0aGF0IGhhdmUgcGFyZW50c1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYudGFza3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vc2hvdWxkIGNsZWFyIGFueSBwcmV2aW91cyB0YXNrcyBmcm9tIHRoZSBIVE1MIERPTSB0b29cclxuICAgICAgICAgICAgICAgICQoXCIjdGFza3NfY29udGFpbmVyX2RhdGVfcmFuZ2VcIikuaHRtbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vc28gbGV0cyBmaXJzdCBqdXN0IHRha2UgZnJvbSB0aGUgSlNPTiBpbnRvIGFjdHVhbCBUYXNrIG9iamVjdHNcclxuICAgICAgICAgICAgICAgIGlmKCFUb29scy5Jc051bGwoanNvbl9vYmoudGFza3MpKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8anNvbl9vYmoudGFza3MubGVuZ3RoO2krKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FzdCBKU09OIG9iamVjdCB0byBUYXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrOlRhc2sgPSBuZXcgVGFzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLlNldEZyb21KU09OT2JqKGpzb25fb2JqLnRhc2tzW2ldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGFza3NbdGFzay5pZF0gPSB0YXNrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLkFkZFRhc2sodGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGpzb25fb2JqOmFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYudWkuU2hvd0ZlZWRCYWNrKGpzb25fb2JqLm1lc3NhZ2UsIFVJLk1FU1NBR0VfRVJST1IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5BamF4Q2FsbChzdWNjZXNzLCBlcnJvciwgZGF0YV90b19zZW5kX29iaik7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG52YXIgTWFpbjpNYWluT2JqID0gbmV3IE1haW5PYmooKTtcclxuXHJcblxyXG4vL2Nhc3Qgd2luZG93IGFzIGFueSB0byB0cmljayB0eXBlc2NyaXB0IGludG8gbm90IHRocm93aW5nIGFuIGVycm9yIGJlY2F1c2Ugd2luZG93IGRvZXNuJ3QgaGF2ZSBwcm9wZXJ0eSBtYWluXHJcbih3aW5kb3cgYXMgYW55KS5NYWluPU1haW47XHJcbih3aW5kb3cgYXMgYW55KS5Ub29scz1Ub29sczsvL2p1c3QgZm9yIHRlc3Rpbmcgb3V0IHRvb2xzIHN0YXRpYyBmdW5jdGlvbnNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL01haW4udHMiLCIvLyB2YXIgUGlrYWRheTphbnk7XHJcbi8vIGltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcbmltcG9ydCB7RGF0ZVRpbWV9IGZyb20gXCIuL0RhdGVUaW1lXCI7XHJcbmltcG9ydCB7VG9vbHN9IGZyb20gXCIuL1Rvb2xzXCI7XHJcbmltcG9ydCB7dmV4fSBmcm9tIFwiLi9NYWluXCI7XHJcbmRlY2xhcmUgdmFyIFBpa2FkYXk6YW55OyAvLyB3YXkgb2YgZ2V0dGluZyBKUyBsb2FkZWQgbGlicmFyaWVzIHdvcmtpbmcgcHJvcGVybHlcclxuZGVjbGFyZSB2YXIgbW9tZW50OmFueTtcclxuLy8gZGVjbGFyZSB2YXIgbW9tZW50OmFueTtcclxuLy9mb3IgdmV4IG1vZGFsIGRpYWxvZ1xyXG5kZWNsYXJlIHZhciB2ZXg6YW55OyAvLyB3YXkgb2YgZ2V0dGluZyBKUyBsb2FkZWQgbGlicmFyaWVzIHdvcmtpbmcgcHJvcGVybHlcclxuXHJcbmV4cG9ydCBjbGFzcyBVSVxyXG57XHJcbiAgICBwcml2YXRlIHRpbWVfb3V0X2ZlZWRiYWNrX2FyZWE6YW55Oy8vZm9yIHN0b3Jpbmcgc2V0IHRpbWUgb3V0cywgc28gd2UgY2FuIGNsZWFyIHRoZW1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE1FU1NBR0VfRVJST1I6bnVtYmVyPTA7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1FU1NBR0VfU1VDQ0VTUzpudW1iZXI9MTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIFNob3dDYWxlbmRlck1vZGFsKClcclxuICAgIHtcclxuICAgICAgICB2ZXguZGlhbG9nLmNvbmZpcm0oe1xyXG4gICAgICAgICAgICAvL21lc3NhZ2U6ICdBcmUgeW91IGFic29sdXRlbHkgc3VyZSB5b3Ugd2FudCB0byBkZXN0cm95IHRoZSBhbGllbiBwbGFuZXQ/JyxcclxuICAgICAgICAgICAgdW5zYWZlTWVzc2FnZTogJzxiPkhlbGxvIDwvYj4nLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHZhbHVlOmFueSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93QWRkVGFza0Zvcm0oKVxyXG4gICAge1xyXG4gICAgICAgIC8vaGlkZSBBZGRUYXNrQnV0dG9uXHJcbiAgICAgICAgJChcIiNidG4tYWRkLXRhc2tcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgLy9zaG93IGZvcm1cclxuICAgICAgICAkKFwiI2FkZC10YXNrLWFyZWFcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG5cclxuICAgICAgICAvL2Fsc28gdXBkYXRlIHRoZSBkYXRlICsgdGltZSB3aXRoIHRoZSBjdXJyZW50IHZhbHVlc1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2hvdWxkIGJlIHNldHRpbmcgZGF0ZSB2YWx1ZSB0bzogXCIrbmV3IERhdGUoKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIsZGF0ZSBwaWNrZXI6IFwiKyQoXCIjdGFza19zdGFydF9kYXRlXCIpLmRhdGEoXCJkYXRlX3BpY2tlclwiKSk7XHJcbiAgICAgICAgJChcIiN0YXNrX3N0YXJ0X2RhdGVcIikuZGF0YShcImRhdGVfcGlja2VyXCIpLnNldERhdGUobmV3IERhdGUoKSk7XHJcblxyXG4gICAgICAgIC8vYW5kIHdpcmUgdXAgdGhlIHRpbWUgdG8gc2V0IHRoZSBjdXJyZW50IHRpbWVcclxuXHJcbiAgICAgICAgLy8gJChcIiN0YXNrX3N0YXJ0X2RhdGVcIik7XHJcbiAgICAgICAgLy8gJChcIiN0YXNrX3N0YXJ0X3RpbWVcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2hvd0FkZFRhc2tCdG4oKVxyXG4gICAge1xyXG4gICAgICAgIC8vc2hvdyBBZGRUYXNrQnV0dG9uXHJcbiAgICAgICAgJChcIiNidG4tYWRkLXRhc2tcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIC8vaGlkZSBmb3JtXHJcbiAgICAgICAgJChcIiNhZGQtdGFzay1hcmVhXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBGb3IgZ2V0dGluZyB0aGUgVUkgbGlicmFyaWVzIGZvciBkYXRlIGFuZCB0aW1lIGJveGVzIHdpcmVkIHVwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBXaXJlVXBEYXRlKGVsZW1lbnQ6SlF1ZXJ5LCBmaWxsX2luX2N1cnJfZGF0ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRlX2Zvcm1hdF9kaXNwbGF5ID0gJ01NTSBERCBZWVlZJztcclxuXHJcbiAgICAgICAgLy9wcm9iYWJseSBhbHNvIG1ha2UgaXQgdmlzaWJsZSwgdGhlbiBpbnZpc2libGUgcmVhbCBxdWljayBzaW5jZSBpdCBkb2Vzbid0IGFsd2F5c1xyXG4gICAgICAgIC8vIGVsZW1lbnQuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgZGF0ZV9kZWZhdWx0OnN0cmluZyA9IG1vbWVudCgpLmZvcm1hdChkYXRlX2Zvcm1hdF9kaXNwbGF5KTtcclxuICAgICAgICAvLyBpZighZmlsbF9pbl9jdXJyX2RhdGUpXHJcbiAgICAgICAgLy8gICAgIGRhdGVfZGVmYXVsdD0gPHN0cmluZz5lbGVtZW50LnZhbCgpO1xyXG4gICAgICAgIC8vICAgICAvLyBlbGVtZW50LnZhbChcIlwiK21vbWVudCgpLmZvcm1hdChkYXRlX2Zvcm1hdF9kaXNwbGF5KSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgcGlja2VyID0gbmV3IFBpa2FkYXkoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpZWxkOiAkKCcjdGFza19zdGFydF9kYXRlJylbMF0sXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogZWxlbWVudFswXSwvL2hhdmUgdG8gdXNlIFswXSwgb3IgaXQgZG9lc24ndCB3b3JrXHJcbiAgICAgICAgICAgICAgICBmaXJzdERheTogMSwgLy9maXJzdCBkYXkgb2YgdGhlIHdlZWsgKDA6IFN1bmRheSwgMTogTW9uZGF5LCBldGMpXHJcbiAgICAgICAgICAgICAgICBtaW5EYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCg3LCAnZGF5cycpLmZvcm1hdChkYXRlX2Zvcm1hdF9kaXNwbGF5KSwgLy9lYXJsaWVzdCBkYXRlIHRoYXQgY2FuIGJlIHNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0RGF0ZTpkYXRlX2RlZmF1bHQsXHJcbiAgICAgICAgICAgICAgICBtYXhEYXRlOiBtb21lbnQoKS5hZGQoIDcsJ2RheXMnKS5mb3JtYXQoZGF0ZV9mb3JtYXRfZGlzcGxheSksXHJcbiAgICAgICAgICAgICAgICAvL3llYXJSYW5nZTogWzIwMDAsMjAyMF0sXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGRhdGVfZm9ybWF0X2Rpc3BsYXksXHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZGF0ZTphbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBpa2FkYXksIG9uc2VsZWN0IGNhbGxlZCFcIitwaWNrZXIudG9TdHJpbmcoKStcIiwgZGF0ZTogXCIrZGF0ZS5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3VzaW5nIG1vbWVudCBKUyB0byBjaGFuZ2UgaXRcclxuICAgICAgICAgICAgICAgICAgICAvLy5zZXQoZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgbW9tZW50c2pzX25ldyA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vIG1vbWVudHNqc19uZXcuZm9ybWF0KFwiJ1lZWVkvTU0vRERcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9tZW50c2pzX25ldy5mb3JtYXQoXCInTExMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1vbWVudEpTIGZvcm1hdHRlZCBkYXRlOiBcIittb21lbnRzanNfbmV3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBpZihmaWxsX2luX2N1cnJfZGF0ZXx8ZWxlbWVudC52YWwoKT09bnVsbHx8KDxzdHJpbmc+ZWxlbWVudC52YWwoKSkubGVuZ3RoPT0wKS8vZm9yIGlmIG5vIGVuZCBkYXRlXHJcbiAgICAgICAgICAgIHBpY2tlci5zZXREYXRlKG5ldyBEYXRlKCkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcGlja2VyLnNldERhdGUobmV3IERhdGUoPHN0cmluZz5lbGVtZW50LnZhbCgpKSk7XHJcblxyXG4gICAgICAgIC8vbGV0cyBhbHNvIHNhdmUgdGhlIHBpY2tlciBlbGVtZW50IGludG8gdGhlIGh0bWwgZWxlbWVudCwgc28gd2UgY2FuIHVwZGF0ZSB0aGUgcGlja2VyIGxhdGVyXHJcbiAgICAgICAgZWxlbWVudC5kYXRhKFwiZGF0ZV9waWNrZXJcIiwgcGlja2VyKTtcclxuXHJcbiAgICAgICAgLy8gZWxlbWVudC5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgV2lyZVVwVGltZShlbGVtZW50OkpRdWVyeSwgZmlsbF9pbl9jdXJyX2RhdGU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICAvLyBlbGVtZW50LmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgICAgICAgbGV0IHByZXZfdmFsdWU6c3RyaW5nfG51bGwgPTxzdHJpbmc+ZWxlbWVudC52YWwoKTtcclxuXHJcbiAgICAgICAgLy9mb3IgaWYgbm8gZW5kIGRhdGUsIGp1c3QgZmVlbCBpdCBpbiB3aXRoIGN1cnJlbnQgdGltZVxyXG4gICAgICAgIGlmKHByZXZfdmFsdWUhPW51bGwpXHJcbiAgICAgICAgICAgIGlmKHByZXZfdmFsdWUubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICAgICAgcHJldl92YWx1ZT1udWxsO1xyXG5cclxuICAgICAgICBsZXQgbm93OnN0cmluZ3xudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYoIWZpbGxfaW5fY3Vycl9kYXRlJiZwcmV2X3ZhbHVlIT1udWxsKVxyXG4gICAgICAgICAgICBub3cgPSBEYXRlVGltZS5HZXQyNGhyRm9ybWF0RnJvbVJlYWRhYmxlKHByZXZfdmFsdWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbm93ID0gcHJldl92YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXaXJlVXBUaW1lOiBub3c6IFwiK25vdytcIiwgZWxlbWVudCB2YWx1ZTogXCIrZWxlbWVudC52YWwoKStcIiwgcHJldl92YWx1ZTogXCIrcHJldl92YWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciBvcHRpb25zOmFueSA9IHtcclxuICAgICAgICAgICAgLy9ub3c6IFwiMTI6MzVcIiwgLy9oaDptbSAyNCBob3VyIGZvcm1hdCBvbmx5LCBkZWZhdWx0cyB0byBjdXJyZW50IHRpbWVcclxuXHJcbiAgICAgICAgICAgIHR3ZW50eUZvdXI6IGZhbHNlLCAgLy9EaXNwbGF5IDI0IGhvdXIgZm9ybWF0LCBkZWZhdWx0cyB0byBmYWxzZVxyXG4gICAgICAgICAgICAvL3VwQXJyb3c6ICd3aWNrZWRwaWNrZXJfX2NvbnRyb2xzX19jb250cm9sLXVwJywgIC8vVGhlIHVwIGFycm93IGNsYXNzIHNlbGVjdG9yIHRvIHVzZSwgZm9yIGN1c3RvbSBDU1NcclxuICAgICAgICAgICAgLy9kb3duQXJyb3c6ICd3aWNrZWRwaWNrZXJfX2NvbnRyb2xzX19jb250cm9sLWRvd24nLCAvL1RoZSBkb3duIGFycm93IGNsYXNzIHNlbGVjdG9yIHRvIHVzZSwgZm9yIGN1c3RvbSBDU1NcclxuICAgICAgICAgICAgLy9jbG9zZTogJ3dpY2tlZHBpY2tlcl9fY2xvc2UnLCAvL1RoZSBjbG9zZSBjbGFzcyBzZWxlY3RvciB0byB1c2UsIGZvciBjdXN0b20gQ1NTXHJcbiAgICAgICAgICAgIC8vaG92ZXJTdGF0ZTogJ2hvdmVyLXN0YXRlJywgLy9UaGUgaG92ZXIgc3RhdGUgY2xhc3MgdG8gdXNlLCBmb3IgY3VzdG9tIENTU1xyXG4gICAgICAgICAgICB0aXRsZTogJ1N0YXJ0IFRpbWUnLCAvL1RoZSBXaWNrZWRwaWNrZXIncyB0aXRsZSxcclxuICAgICAgICAgICAgc2hvd1NlY29uZHM6IGZhbHNlLCAvL1doZXRoZXIgb3Igbm90IHRvIHNob3cgc2Vjb25kcyxcclxuICAgICAgICAgICAgdGltZVNlcGFyYXRvcjogJyA6ICcsIC8vIFRoZSBzdHJpbmcgdG8gcHV0IGluIGJldHdlZW4gaG91cnMgYW5kIG1pbnV0ZXMgKGFuZCBzZWNvbmRzKVxyXG4gICAgICAgICAgICBzZWNvbmRzSW50ZXJ2YWw6IDEsIC8vQ2hhbmdlIGludGVydmFsIGZvciBzZWNvbmRzLCBkZWZhdWx0cyB0byAxLFxyXG4gICAgICAgICAgICBtaW51dGVzSW50ZXJ2YWw6IDEsIC8vQ2hhbmdlIGludGVydmFsIGZvciBtaW51dGVzLCBkZWZhdWx0cyB0byAxXHJcbiAgICAgICAgICAgIC8vYmVmb3JlU2hvdzogbnVsbCwgLy9BIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIFdpY2tlZHBpY2tlciBpcyBzaG93blxyXG4gICAgICAgICAgICAvL2FmdGVyU2hvdzogbnVsbCwgLy9BIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhZnRlciB0aGUgV2lja2VkcGlja2VyIGlzIGNsb3NlZC9oaWRkZW5cclxuICAgICAgICAgICAgLy9zaG93OiBudWxsLCAvL0EgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIFdpY2tlZHBpY2tlciBpcyBzaG93blxyXG4gICAgICAgICAgICBjbGVhcmFibGU6IGZhbHNlLCAvL01ha2UgdGhlIHBpY2tlcidzIGlucHV0IGNsZWFyYWJsZSAoaGFzIGNsaWNrYWJsZSBcInhcIilcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKG5vdyE9PW51bGwpXHJcbiAgICAgICAgICAgIG9wdGlvbnMubm93PW5vdztcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnRfYW55PSA8YW55PmVsZW1lbnQ7XHJcbiAgICAgICAgZWxlbWVudF9hbnkud2lja2VkcGlja2VyKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvL2xldHMgYWxzbyBzYXZlIHRoZSBwaWNrZXIgZWxlbWVudCBpbnRvIHRoZSBodG1sIGVsZW1lbnQsIHNvIHdlIGNhbiB1cGRhdGUgdGhlIHBpY2tlciBsYXRlclxyXG4gICAgICAgIC8vIGVsZW1lbnQuZGF0YShcIndpY2tlZHBpY2tlclwiLCB3aWNrZWRwaWNrZXIpO1xyXG5cclxuICAgICAgICAvLyBpZighZmlsbF9pbl9jdXJyX2RhdGUpXHJcbiAgICAgICAgLy8gICAgIGVsZW1lbnQudmFsKHByZXZfdmFsdWUpO1xyXG5cclxuICAgICAgICAvLyBlbGVtZW50LmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFBvcFVwKHRleHQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4gICAgfVxyXG4gICAgTG9hZGVyVmlzaWJsZSh2aXNpYmxlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYodmlzaWJsZSlcclxuICAgICAgICAgICAgJChcIi5sb2FkZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJChcIi5sb2FkZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBTaG93UmVnaXN0ZXIoKVxyXG4gICAge1xyXG4gICAgICAgICQoXCIjcmVnaXN0ZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICQgKFwiI2xvZ2luXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICQoXCIjVGFza1RyYWNrZXJNYWluXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cclxuICAgICAgICAkKFwiI3dlbGNvbWVfaGVhZGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0xvZ2luKClcclxuICAgIHtcclxuICAgICAgICAkKFwiI3JlZ2lzdGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgICQgKFwiI2xvZ2luXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICAkKFwiI1Rhc2tUcmFja2VyTWFpblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICAgICAgJChcIiN3ZWxjb21lX2hlYWRlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICB9XHJcbiAgICBTaG93VGFza1RyYWNrZXIoKVxyXG4gICAge1xyXG4gICAgICAgICQoXCIjbG9naW5cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgJChcIiNyZWdpc3RlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAkKFwiI1Rhc2tUcmFja2VyTWFpblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgICAgICQoXCIjd2VsY29tZV9oZWFkZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgdGhpcy5IaWRlRmVlZEJhY2soKTtcclxuICAgIH1cclxuICAgIEhpZGVGZWVkQmFjaygpXHJcbiAgICB7XHJcbiAgICAgICAgJChcIiNmZWVkYmFja1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKS5odG1sKCk7XHJcbiAgICB9XHJcbiAgICBTaG93RmVlZEJhY2sobWVzc2FnZTpzdHJpbmcsIGZlZWRiYWNrX3R5cGU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGZlZWRiYWNrX3R5cGU9PT1VSS5NRVNTQUdFX0VSUk9SKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJChcIiNmZWVkYmFja1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICQoXCIjZmVlZGJhY2tcIikuYWRkQ2xhc3MoXCJhbGVydC1kYW5nZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZmVlZGJhY2tfdHlwZT09PVVJLk1FU1NBR0VfU1VDQ0VTUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICQoXCIjZmVlZGJhY2tcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIik7XHJcbiAgICAgICAgICAgICQoXCIjZmVlZGJhY2tcIikuYWRkQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zaG93IHRoZSBlcnJvciBib3gsIGFuZCBmaWxsIGluIHRoZSBtZXNzYWdlXHJcbiAgICAgICAgJChcIiNmZWVkYmFja1wiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIikuaHRtbChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgLy9zaG91bGQgY2hhbmdlIG91dCBjbGFzcyB0byBiZSBlcnJvciBvciBzdWNjZXNzIGJvb3RzdHJhcCB0eXBlXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vaGlkZSBhZnRlciA1c1xyXG4gICAgICAgIC8vZmlyc3QgY2xlYXIgYW55IHByZXZpb3VzIHRpbWVvdXRzIHdhaXRpbmdcclxuICAgICAgICAvLyBjbGVhclRpbWVvdXQodGhpcy50aW1lX291dF9mZWVkYmFja19hcmVhKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHRoaXMudGltZV9vdXRfZmVlZGJhY2tfYXJlYSA9c2V0VGltZW91dChmdW5jdGlvbigpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICAkKFwiI2ZlZWRiYWNrXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIC8vIH0sIDUwMDApO1xyXG5cclxuXHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1VJLnRzIiwiLypcclxuSnVzdCBzdHJ1Y3R1cmUgZm9yIGEgdGFza1xyXG4gKi9cclxuaW1wb3J0IHtEYXRlVGltZX0gZnJvbSBcIi4vRGF0ZVRpbWVcIlxyXG5pbXBvcnQge1Rvb2xzfSBmcm9tIFwiLi9Ub29sc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhc2tcclxue1xyXG4gICAgcHVibGljIGlkOm51bWJlcjtcclxuICAgIHB1YmxpYyB1c2VyX2lkOm51bWJlcjtcclxuICAgIHB1YmxpYyB0YXNrOnN0cmluZztcclxuICAgIHB1YmxpYyBjYXRlZ29yeTpzdHJpbmc7XHJcblxyXG4gICAgLy8gcHVibGljIHN0YXJ0X2RhdGU6RGF0ZTtcclxuICAgIC8vIHB1YmxpYyBlbmRfZGF0ZTpEYXRlO1xyXG4gICAgLy9cclxuICAgIC8vIHB1YmxpYyBzdGFydF90aW1lOnN0cmluZztcclxuICAgIC8vIHB1YmxpYyBlbmRfdGltZTpzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHBhcmVudF9pZDpudW1iZXI7XHJcblxyXG4gICAgLy9mb3IgbG9hZGluZyBmcm9tIG15c3FsIGF1dG9tYXRpY2FsbHktIGp1c3QgYSBzdHJpbmcsIG5vdCB0aGUgYWN0dWFsIGRhdGUgb2JqZWN0XHJcbiAgICBwdWJsaWMgc3RhcnRfZGF0ZV90aW1lX3N0cjpzdHJpbmc7XHJcbiAgICBwdWJsaWMgZW5kX2RhdGVfdGltZV9zdHI6c3RyaW5nO1xyXG5cclxuICAgIC8vZGF0ZSB0aW1lIG9iamVjdHNcclxuICAgIHB1YmxpYyBzdGFydF9kYXRlX3RpbWU6RGF0ZVRpbWU7XHJcbiAgICBwdWJsaWMgZW5kX2RhdGVfdGltZTpEYXRlVGltZXxudWxsO1xyXG5cclxuICAgIC8vdGhlIGRhdGUtdGltZSBhcyBhIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgaW4gYnJvd3NlciBpbiByZWFkYWJsZSBmb3JtYXQgKEphbiAyOCAyMDE2LCA2OjIycG0pXHJcbiAgICAvLyBwdWJsaWMgc3RhcnRfZGF0ZV9kaXNwbGF5X3N0cjpzdHJpbmc7XHJcbiAgICAvLyBwdWJsaWMgZW5kX2RhdGVfZGlzcGxheV9zdHI6c3RyaW5nO1xyXG4gICAgLy8gcHVibGljIHN0YXJ0X3RpbWVfZGlzcGxheV9zdHI6c3RyaW5nO1xyXG4gICAgLy8gcHVibGljIGVuZF90aW1lX2Rpc3BsYXlfc3RyOnN0cmluZztcclxuICAgIC8vXHJcbiAgICAvLyBwdWJsaWMgbW9udGhfbmFtZXM6c3RyaW5nW10gPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XHJcbiAgICAvL1xyXG4gICAgLy8gcHVibGljIHRpbWVfZGlmZmVyZW5jZV9zOm51bWJlcjsvL3RoZSB0aW1lIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgdHdvIGRhdGVzIGFuZCB0aGUgdGltZVxyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgV2Ugc2hvdWxkIHNldHVwIGFsbCB0aGUgcHJvcGVydGllcyBmcm9tIG15c3FsIGhlcmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldEZyb21KU09OT2JqKG9iajpPYmplY3QpXHJcbiAgICB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvYmopO1xyXG4gICAgICAgIHRoaXMuSW5pdCgpO1xyXG4gICAgICAgIC8qZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuICAgIHByaXZhdGUgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydF9kYXRlX3RpbWUgPSBuZXcgRGF0ZVRpbWUodGhpcy5zdGFydF9kYXRlX3RpbWVfc3RyKTtcclxuXHJcbiAgICAgICAgaWYoIVRvb2xzLklzTnVsbCh0aGlzLmVuZF9kYXRlX3RpbWVfc3RyKSkvL3NpbmNlIHRoZSB0YXNrIGNvdWxkIGJlIHVuZmluaXNoZWQvIG5vIGVuZCBkYXRlIHlldFxyXG4gICAgICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWUgPSBuZXcgRGF0ZVRpbWUodGhpcy5lbmRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZm9yIHVwZGF0aW5nIHRoZSBzdGFydC9lbmQgZGF0ZXMgd2hlbiBjaGFuZ2luZyB0aGVtIGZyb20gdGhlIFVJLCBhZnRlciBzZW5kaW5nIHRoZW0gdG8gbXlzcWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIFNldFN0YXJ0QW5kRW5kRGF0ZVRpbWVGcm9tTXlTUUwoc3RhcnRfZGF0ZV90aW1lX215c3FsX3N0cjpzdHJpbmcsIGVuZF9kYXRlX3RpbWVfbXlzcWxfc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHI9c3RhcnRfZGF0ZV90aW1lX215c3FsX3N0cjtcclxuICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWVfc3RyPWVuZF9kYXRlX3RpbWVfbXlzcWxfc3RyO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0X2RhdGVfdGltZS5TZXREYXRlVGltZUZyb21NeVNRTCh0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHIpO1xyXG5cclxuICAgICAgICBpZihUb29scy5Jc051bGwodGhpcy5lbmRfZGF0ZV90aW1lX3N0cikpLy9zaW5jZSB0aGUgdGFzayBjb3VsZCBiZSB1bmZpbmlzaGVkLyBubyBlbmQgZGF0ZSB5ZXRcclxuICAgICAgICAgICAgdGhpcy5lbmRfZGF0ZV90aW1lPW51bGw7XHJcbiAgICAgICAgZWxzZSBpZihUb29scy5Jc051bGwodGhpcy5lbmRfZGF0ZV90aW1lKXx8dGhpcy5lbmRfZGF0ZV90aW1lPT09bnVsbClcclxuICAgICAgICAgICAgdGhpcy5lbmRfZGF0ZV90aW1lID0gbmV3IERhdGVUaW1lKHRoaXMuZW5kX2RhdGVfdGltZV9zdHIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5lbmRfZGF0ZV90aW1lLlNldERhdGVUaW1lRnJvbU15U1FMKHRoaXMuZW5kX2RhdGVfdGltZV9zdHIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldEVuZERhdGVUaW1lRnJvbU15U1FMKGVuZF9kYXRlX3RpbWVfbXlzcWxfc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWVfc3RyPWVuZF9kYXRlX3RpbWVfbXlzcWxfc3RyO1xyXG4gICAgICAgIGlmKCFUb29scy5Jc051bGwoZW5kX2RhdGVfdGltZV9teXNxbF9zdHIpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoVG9vbHMuSXNOdWxsKHRoaXMuZW5kX2RhdGVfdGltZSl8fHRoaXMuZW5kX2RhdGVfdGltZT09PW51bGwpLy9oYXZlIHRvIGFkZCAybmQgY2hlY2sgZm9yIFRTIGNvbXBpbGVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZF9kYXRlX3RpbWUgPSBuZXcgRGF0ZVRpbWUodGhpcy5lbmRfZGF0ZV90aW1lX3N0cik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kX2RhdGVfdGltZS5TZXREYXRlVGltZUZyb21NeVNRTCh0aGlzLmVuZF9kYXRlX3RpbWVfc3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2V0U3RhcnREYXRlVGltZUZyb21NeVNRTChzdGFydF9kYXRlX3RpbWVfbXlzcWxfc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHI9c3RhcnRfZGF0ZV90aW1lX215c3FsX3N0cjtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZXRTdGFydERhdGVUaW1lRnJvbU15U1FMOiBcIitzdGFydF9kYXRlX3RpbWVfbXlzcWxfc3RyK1wiIHRoaXMuc3RhcnRfZGF0ZV90aW1lOiBcIit0aGlzLnN0YXJ0X2RhdGVfdGltZStcIiwgc3RyOiBcIit0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHIrXCIsID09bnVsbD8gOlwiKyh0aGlzLnN0YXJ0X2RhdGVfdGltZT09bnVsbCkpO1xyXG5cclxuICAgICAgICBpZihUb29scy5Jc051bGwodGhpcy5zdGFydF9kYXRlX3RpbWUpKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0X2RhdGVfdGltZSA9IG5ldyBEYXRlVGltZSh0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zdGFydF9kYXRlX3RpbWUuU2V0RGF0ZVRpbWVGcm9tTXlTUUwodGhpcy5zdGFydF9kYXRlX3RpbWVfc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgZm9yIGdldHRpbmcgdGhlIGRhdGUgYW5kIHRpbWUgc3RyaW5ncyBmcm9tIHRoZSBteXNxbCBzdHJpbmdzXHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIEdldERhdGVBbmRUaW1lRnJvbU15U1FMKClcclxuICAgIHtcclxuICAgICAgICAvL2NoYW5nZSBmcm9tIG15U1FMIGRhdGV0aW1lIHN0cmluZyB0byBodW1hbiByZWFkYWJsZVxyXG4gICAgICAgIC8vZnJvbTogMjAxMi0wNi0yMiAwNTo0MDowNlxyXG4gICAgICAgIC8vdG86IChKYW4gMjggMjAxNiwgNjoyMnBtKVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tZm9yIHN0YXJ0IGRhdGVcclxuICAgICAgICBsZXQgZGF0ZV90aW1lX3N0YXJ0X2FycjpzdHJpbmdbXSA9IHRoaXMuQ29udmVydE15U1FMRGF0ZVRpbWVUb0Rpc3BsYXlEYXRlVGltZSh0aGlzLnN0YXJ0X2RhdGVfdGltZV9zdHIpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRfZGF0ZV9kaXNwbGF5X3N0ciA9IGRhdGVfdGltZV9zdGFydF9hcnJbMF07XHJcbiAgICAgICAgdGhpcy5zdGFydF90aW1lX2Rpc3BsYXlfc3RyID0gZGF0ZV90aW1lX3N0YXJ0X2FyclsxXTtcclxuXHJcblxyXG4gICAgICAgIGlmKHRoaXMuZW5kX2RhdGVfdGltZV9zdHIhPW51bGwgJiZ0aGlzLmVuZF9kYXRlX3RpbWVfc3RyLmxlbmd0aD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRhdGVfdGltZV9lbmRfYXJyOnN0cmluZ1tdID0gdGhpcy5Db252ZXJ0TXlTUUxEYXRlVGltZVRvRGlzcGxheURhdGVUaW1lKHRoaXMuZW5kX2RhdGVfdGltZV9zdHIpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZF9kYXRlX2Rpc3BsYXlfc3RyID0gZGF0ZV90aW1lX2VuZF9hcnJbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZW5kX3RpbWVfZGlzcGxheV9zdHIgPSBkYXRlX3RpbWVfZW5kX2FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZXREYXRlQW5kVGltZUZyb21NeVNRTCBmb3JtYXR0ZWQgc3RyaW5nczogXFxuU3RhcnQgZGF0ZS10aW1lOiBcIit0aGlzLnN0YXJ0X2RhdGVfZGlzcGxheV9zdHIrXCIgXCIrdGhpcy5zdGFydF90aW1lX2Rpc3BsYXlfc3RyK1wiXFxuRW5kIGRhdGUtdGltZTogXCIrdGhpcy5lbmRfZGF0ZV9kaXNwbGF5X3N0citcIiBcIit0aGlzLmVuZF90aW1lX2Rpc3BsYXlfc3RyKTtcclxuICAgIH0qL1xyXG4gICAgLypcclxuICAgIHNldHMgdGhlIHRpbWVfZGlmZmVyZW5jZV9zIHZhcmlhYmxlIGZyb20gdGhlIGRhdGUgcmFuZ2VzXHJcbiAgICAgKi9cclxuICAgIC8qcHVibGljIEdldERhdGVUaW1lRGlmZmVyZW5jZUZyb21NeVNRTCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy9nb2luZyB0byB1c2UgdGhlIG15c3FsIHN0cmluZ3MgdG8gZ2V0IHRoZSBkYXRlLyB0aW1lIGRpZmZlcmVuY2VcclxuICAgICAgICAvL2p1c3QgZ29pbmcgdG8gdXNlIHRoZSBkYXRlIG9iamVjdCB0byBnZXQgdGhlIHMgaW4gZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSAyIGRhdGVzXHJcblxyXG4gICAgfSovXHJcbiAgICAvKnB1YmxpYyBDb252ZXJ0TXlTUUxEYXRlVGltZVRvRGlzcGxheURhdGVUaW1lKGRhdGVfdGltZV9teXNxbF9zdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkYXRlX3RpbWVfYXJyOnN0cmluZ1tdID0gZGF0ZV90aW1lX215c3FsX3N0ci5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgICAgIGxldCBkYXRlX215c3FsOnN0cmluZyA9IGRhdGVfdGltZV9hcnJbMF07XHJcbiAgICAgICAgbGV0IHRpbWVfbXlzcWw6c3RyaW5nID0gZGF0ZV90aW1lX2FyclsxXTtcclxuXHJcbiAgICAgICAgLy9maXJzdCBkbyBkYXRlXHJcbiAgICAgICAgbGV0IGRhdGVfYXJyOnN0cmluZ1tdID0gZGF0ZV9teXNxbC5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgbGV0IHllYXI6c3RyaW5nID0gZGF0ZV9hcnJbMF07XHJcbiAgICAgICAgbGV0IG1vbnRoOnN0cmluZyA9IGRhdGVfYXJyWzFdO1xyXG4gICAgICAgIGxldCBkYXk6c3RyaW5nID0gZGF0ZV9hcnJbMl07XHJcblxyXG4gICAgICAgIC8vY2hhbmdlIG1vbnRoIGZyb20gbnVtYmVyIDEtMTIgdG8gYWJyIGRhdGUgbmFtZVxyXG4gICAgICAgIG1vbnRoPSB0aGlzLm1vbnRoX25hbWVzW3BhcnNlSW50KG1vbnRoKS0xXTtcclxuICAgICAgICBkYXkgPSBwYXJzZUludChkYXkpLnRvU3RyaW5nKCk7Ly9mb3IgZ2V0dGluZyByaWQgb2YgdGhlIGxlYWRpbmcgMFxyXG5cclxuICAgICAgICBsZXQgZGF0ZV9kaXNwbGF5ID0gIG1vbnRoK1wiIFwiKyBkYXkrIFwiIFwiK3llYXI7XHJcblxyXG4gICAgICAgIC8vbmV4dCBkbyB0aW1lIDA1OjQwOjA2IChzdGFydGluZyBhdCAwLCBlbmRpbmcgYXQgMjM6NTk6NTkgdG8gc3RhcnRpbmcgYXQgMSwgZW5kaW5nIGF0IDEyXHJcbiAgICAgICAgbGV0IHRpbWVfYXJyOnN0cmluZ1tdID0gdGltZV9teXNxbC5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgbGV0IGhvdXI6c3RyaW5nID0gZGF0ZV9hcnJbMF07XHJcbiAgICAgICAgbGV0IG1pbnV0ZTpzdHJpbmcgPSBwYXJzZUludChkYXRlX2FyclsxXSkudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgbGV0IGhyX251bTpudW1iZXIgPSBwYXJzZUludChob3VyKSsxOy8vdG8gZ28gZnJvbSAwIG8gY2xvY2sgdG8gMSBvIGNsb2NrXHJcbiAgICAgICAgbGV0IHRpbWVfZXh0cmE6c3RyaW5nID0gXCJBTVwiO1xyXG4gICAgICAgIGlmKGhyX251bT4xMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpbWVfZXh0cmEgPSBcIlBNXCI7XHJcbiAgICAgICAgICAgIGhyX251bS09MTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhvdXIgPSBocl9udW0udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVfZGlzcGxheTpzdHJpbmcgPSBocl9udW0rXCIgXCIrbWludXRlK1wiIFwiK3RpbWVfZXh0cmE7XHJcblxyXG4gICAgICAgIHJldHVybiBbZGF0ZV9kaXNwbGF5LCB0aW1lX2Rpc3BsYXldO1xyXG4gICAgfSovXHJcbn1cclxuLypcclxuVGhlIGFjdHVhbCBjbGFzcyB0byBoYW5kbGUgRXZlcnl0aGluZyBpbnZvbHZlZCB3aXRoIHRhc2tzLVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhc2tIYW5kbGVyXHJcbntcclxuICAgIC8qXHJcbiAgICBGb3Igd2hlbiB0aGUgXCJjcmVhdGUgdGFza1wiIGJ1dHRvbiBoYXMgYmVlbiBjbGlja2VkLlxyXG4gICAgU2hvdWxkIHZlcmlmeSBhbGwgZmllbGRzIGFyZSBmaWxsZWQgb3V0IGNvcnJlY3RseSwgdGhlbiBncmFiIHZhbHVlcyBhbmQgc3VibWl0IGl0IHRvIGZ1bmN0aW9uIGJlbG93XHJcbiAgICAgKi9cclxuICAgIENyZWF0ZVRhc2tGcm9tVUkoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIENyZWF0ZVRhc2soKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBHZXRBbGxUYXNrcygpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG4gICAgR2V0VGFza3Moc3RhcnRfZGF0ZV90aW1lOkRhdGUsIGVuZF9kYXRlX3RpbWU6RGF0ZSlcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1Rhc2tzLnRzIiwiXHJcbi8qXHJcbkZvciBzdG9yaW5nIGNvbnN0YW50cyBmb3IgY2hhbmdpbmcgb3V0IGJhY2tlbmRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnXHJcbntcclxuICAgIC8vbm8gc3RhdGljIGNvbnN0IGluIEpTLCBzbyBqdXN0IHVzaW5nIGEgZ2V0dGVyIG1ha2VzIGl0IHNvIGl0IGNhbid0IGJlIGNoYW5nZWRcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEJBQ0tFTkRfVVJMKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2Fja21pLmNvbS9wcm9qZWN0cy9UYXNrVHJhY2tlci9teXNxbF9jb25uZWN0LnBocFwiO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9Db25maWcudHMiXSwic291cmNlUm9vdCI6IiJ9