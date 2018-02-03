"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./test");
var UI_1 = require("./UI");
var tasks_1 = require("./tasks");
var test = new test_1.Test();
var php_mysql_comm_url = "http://ackmi.com/projects/TaskTracker/mysql_connect.php";
$(document).ready(function () {
    // $("#login").html("Hello MEgan!!!");
    // $("#register").css("display", "block");
    // let hello:Test = new Test();
    // hello.Log("testing log from Jquery");
});
// console.log("this bundled object: "+JSON.stringify(this));
// console.log(this);
// let hello:Test = new Test();
// hello.Log("testing log");
/*
import * as $ from "jquery";

//import * as $ from ‘jquery’;


// import {Test} from 'test';

// import {Test} = require('.test');


$(document).ready(function(){
    $("#login").html("Hello there");
    $("#register").css("display", "block");

    let hello:Test = new Test();
    hello.Log("testing log");


});
*/
var MainObj = /** @class */ (function () {
    function MainObj() {
        this.ui = new UI_1.UI();
        this.task_handler = new tasks_1.TaskHandler();
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
        var email = $("#register_email").val();
        var pwd = $("#register_pwd").val();
        console.log("Register: email and pwd entered: " + email + ", " + pwd);
        //so lets check the input first, and provide an error if something was wrong/ they didn't enter both inputs
        //now lets try to submit these to the php page, and get whether they were registered successfully
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "register";
        data_to_send_obj.email = email;
        data_to_send_obj.password = pwd;
        //NOTE: if you try to send  JSON object, it just sends the string as a key, and no value, so have to send the actual object, which it assumably stringifies again
        //now lets submit them to the php page
        this.ui.LoaderVisible(true);
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        $.ajax({
            type: 'POST',
            url: 'http://ackmi.com/projects/TaskTracker/mysql_connect.php',
            crossDomain: true,
            data: data_to_send_obj,
            // dataType: 'json',
            dataType: 'text',
            //jsonp: false, //I added jsonp- by default returns cross origin requests as jsonp istead of json
            success: function (responseData, textStatus, jqXHR) {
                var json_obj = JSON.parse(responseData);
                console.log("Login Response happened with data: \n" + responseData + ", message: " + json_obj.message);
                if (json_obj.type === "error") {
                    self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
                }
                else if (json_obj.type === "success") {
                    self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_SUCCESS);
                    self.ui.ShowLogin();
                    //should also fill in the email address and clear the password if needed
                    $("#login_email").val(email);
                    $("#login_pwd").val("");
                    //and clear the register boxes
                    $("#register_email").val("");
                    $("#register_pwd").val("");
                }
                self.ui.LoaderVisible(false);
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
                self.ui.LoaderVisible(false);
            }
        });
    };
    MainObj.prototype.Login = function () {
        var email = $("#login_email").val();
        var pwd = $("#login_pwd").val();
        //clear password
        $("#login_pwd").val("");
        //let data_to_send= '{"email":"'+email+'", "password":"'+pwd+'"}';
        //console.log("Going to send json object: "+data_to_send+", as object: "+JSON.parse(data_to_send)['email']+", "+JSON.parse(data_to_send)['password']);
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "login";
        data_to_send_obj.email = email;
        data_to_send_obj.password = pwd;
        //NOTE: if you try to send  JSON object, it just sends the string as a key, and no value, so have to send the actual object, which it assumably stringifies again
        //let data_to_send:string = JSON.stringify(data_to_send_obj);
        // let data_to_send:Object={somevalue:"the value!"};
        console.log("data we are planning on sending!: \n" + JSON.stringify(data_to_send_obj) + "\n" + ", email length: " + data_to_send_obj.email.length);
        // console.log("This before ajax: "+this.constructor.name);
        //now lets submit them to the php page
        this.ui.LoaderVisible(true);
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        $.ajax({
            type: 'POST',
            url: 'http://ackmi.com/projects/TaskTracker/mysql_connect.php',
            crossDomain: true,
            data: data_to_send_obj,
            // dataType: 'json',
            dataType: 'text',
            //jsonp: false, //I added jsonp- by default returns cross origin requests as jsonp istead of json
            success: function (responseData, textStatus, jqXHR) {
                var json_obj = JSON.parse(responseData);
                console.log("Login Response happened with data: \n" + responseData + ", message: " + json_obj.message);
                if (json_obj.type === "error") {
                    self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
                }
                else if (json_obj.type === "success") {
                    //clear the email input too:
                    $("#login_email").val("");
                    // console.log("This after ajax: "+this.constructor.name+", but self: "+self.constructor.name);
                    //so store the id and auth key, and bring up the logged in interface
                    self.StoreLogin(json_obj.id, json_obj.token);
                }
                self.ui.LoaderVisible(false);
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
                self.ui.LoaderVisible(false);
            }
        });
    };
    MainObj.prototype.LogOut = function () {
        this.id = null;
        this.auth_key = null;
        localStorage.removeItem("id");
        localStorage.removeItem("auth_key");
        this.ui.ShowLogin();
    };
    MainObj.prototype.TestFunction = function () {
        console.log("test function can be called");
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
        console.log("Submit Task clicked!");
        //first get all the fields
        var task = $("#new_task_name").val();
        var category = $("#new_task_category").val();
        var start_date = $("#task_start_date").val(); //Jan 24 2018
        // let month =
        var start_time = $("#task_start_time").val(); //8 : 25 PM
        console.log("task: " + task + "\ncategory: " + category + "\nstart_date: " + start_date + "\nstart_time: " + start_time);
        var date_mysql = this.GetDateForMySQL(start_date);
        console.log("date formatted for mySQL: " + date_mysql);
        var time_mysql = this.GetTimeForMySQL(start_time);
        console.log("time formatted for mySQL: " + time_mysql);
        var date_time_mysql = date_mysql + " " + time_mysql;
        console.log("date time form for mySQL: " + date_mysql + " " + time_mysql);
        //now send it to php
        var data_to_send_obj = new Object();
        data_to_send_obj.action = "AddTask";
        data_to_send_obj.user_id = this.id;
        data_to_send_obj.auth_key = this.auth_key;
        data_to_send_obj.task = task;
        data_to_send_obj.category = category;
        data_to_send_obj.date_time = date_time_mysql;
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        $.ajax({
            type: 'POST',
            url: 'http://ackmi.com/projects/TaskTracker/mysql_connect.php',
            crossDomain: true,
            data: data_to_send_obj,
            // dataType: 'json',
            dataType: 'text',
            //jsonp: false, //I added jsonp- by default returns cross origin requests as jsonp istead of json
            success: function (responseData, textStatus, jqXHR) {
                console.log("Login Response happened with data: \n" + responseData);
                var json_obj = JSON.parse(responseData);
                if (json_obj.type === "error") {
                    self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
                }
                else if (json_obj.type === "success") {
                    self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_SUCCESS);
                    //clear the email input too:
                    $("#new_task_name").val("");
                    console.log("Hey, we entered a task!!!!");
                    // console.log("This after ajax: "+this.constructor.name+", but self: "+self.constructor.name);
                    //so store the id and auth key, and bring up the logged in interface
                    // self.StoreLogin(json_obj.id, json_obj.token);
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        });
    };
    /*
    changes date format from:
    Jan 24 2018
    to (MYSQL format)
    2012-06-22 05:40:06

     */
    MainObj.prototype.GetDateForMySQL = function (date) {
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
    MainObj.prototype.GetTimeForMySQL = function (time) {
        time = time.replace(": ", "");
        var time_split = time.split(" ");
        console.log("time : " + time);
        time_split[0] = (parseInt(time_split[0]) - 1).toString(); //since the time picker is 1am -12pm, but mysql is 0 -24
        if (time_split[2] === "PM")
            time_split[0] = (parseInt(time_split[0]) + 12).toString();
        if (time_split[0].length == 1)
            time_split[0] = "0" + time_split[0];
        if (time_split[1].length == 1)
            time_split[1] = "0" + time_split[1];
        var mysql_time = time_split[0] + ":" + time_split[1] + ":00";
        console.log("Time for MYSQL: " + mysql_time);
        return mysql_time;
    };
    MainObj.prototype.EditTask = function (edit_btn) {
        console.log("Edit task called from element: " + edit_btn + ", \njson:" + JSON.stringify(edit_btn) + "\nclass: " + edit_btn.classList);
        //should be able to get the attribute this way:
        var task_id = parseInt(edit_btn.getAttribute("data-task-id"));
        console.log("task id: " + task_id);
        //first should make sure task edit is not already displayed underneath this- otherwise we should remove it/ hide it (removing it might be better)
        var existing_task_edit = $("#task-" + task_id).find(".tasks_edit");
        if (existing_task_edit.length) {
            console.log("found existing edit element on task, so removing it: " + existing_task_edit);
            //remove it and return;
            existing_task_edit.remove();
            return;
        }
        //so now lets unhide the edit task area (put it under this task), and populate the values
        var task_edit = $("#tasks_edit").clone(true);
        task_edit.removeAttr("id"); //remove id from it
        task_edit.css("display", "block");
        task_edit.appendTo("#task-" + task_id);
        //add task id to close btn to be able to close this
        task_edit.find(".btn-close-task").attr("data-task-id", task_id);
        task_edit.find(".btn-delete-task").attr("data-task-id", task_id);
        task_edit.find(".btn-update-task").attr("data-task-id", task_id);
        //now populate in all the task info:
        //have to grab the task object
        var task = this.tasks[task_id];
        task_edit.find(".task-input-name").val(task.task);
        task_edit.find(".task-input-category").val(task.category);
        task_edit.find(".task-input-start-date").val(task.start_date_time.date_display);
        task_edit.find(".task-input-start-time").val(task.start_date_time.time_display);
        task_edit.find(".task-input-end-date").val(task.end_date_time.date_display);
        task_edit.find(".task-input-end-time").val(task.end_date_time.time_display);
        //also have to set the time and date fields to be able to use the date and time javascript libraries for nice UI
    };
    MainObj.prototype.CloseEditTask = function (btn_close) {
        var task_id = parseInt(btn_close.getAttribute("data-task-id"));
        var existing_task_edit = $("#task-" + task_id).find(".tasks_edit");
        if (existing_task_edit.length) {
            //remove it and return;
            existing_task_edit.remove();
        }
    };
    MainObj.prototype.UpdateTask = function (btn_update_task) {
    };
    MainObj.prototype.DeleteTask = function (btn_update_task) {
    };
    MainObj.prototype.GetTasks = function () {
        //have to grab the dates from the drop downs for date and time-
        //then convert to mysql dates, and submit to the below function
    };
    /*
    Needs to be in mysql date time format like:
    2012-06-22 05:40:06
     */
    MainObj.prototype.GetTasksMySQLDates = function (date_time_start, date_time_end) {
        console.log("GetTasksMySQLDates clicked!");
        //if we pass 2 nulls, we'll just use the default date range
        if (date_time_start == null) {
            var date_day_ago = new Date();
            date_day_ago.setDate(date_day_ago.getDate() - 1);
            //for adding leading zeroes from: https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
            //-2 gives just the last 2 digits
            var day_num1 = ("0" + date_day_ago.getDate()).slice(-2);
            var month_num1 = ("0" + date_day_ago.getMonth() + 1).slice(-2);
            //have to add 1 to month to change from 0-11 to 1-12
            date_time_start = date_day_ago.getFullYear() + "-" + month_num1 + "-" + day_num1;
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
        var self = this; // The ajax functions are inside a different object, so this won't refer to this object anymore, so have to make an alias up here for it to still have access to the object we're in
        $.ajax({
            type: 'POST',
            url: 'http://ackmi.com/projects/TaskTracker/mysql_connect.php',
            crossDomain: true,
            data: data_to_send_obj,
            // dataType: 'json',
            dataType: 'text',
            //jsonp: false, //I added jsonp- by default returns cross origin requests as jsonp istead of json
            success: function (responseData, textStatus, jqXHR) {
                console.log("GetTasks response: \n" + responseData);
                var json_obj = JSON.parse(responseData);
                if (json_obj.type === "error") {
                    self.ui.ShowFeedBack(json_obj.message, UI_1.UI.MESSAGE_ERROR);
                }
                else if (json_obj.type === "success") {
                    if (json_obj.message == "NoResults") {
                        console.log("Got no tasks back, empty for what we searched for\nsql: " + json_obj.sql);
                    }
                    else {
                        console.log("Got some tasks back, need to show in UI!");
                        //go through the tasks, creating new HTML for each one to show
                        //should have two types- tasks that aren't complete, and tasks that are complete from before
                        //but also need hierarchy for ones that have parents
                        self.tasks = [];
                        //should clear any previous tasks from the HTML DOM too
                        $("#tasks_container_date_range").html();
                        //so lets first just take from the JSON into actual Task objects
                        for (var i = 0; i < json_obj.tasks.length; i++) {
                            console.log("Going to add task: " + json_obj.tasks[i]);
                            //cast JSON object to Task
                            var task = new tasks_1.Task();
                            task.SetFromJSONObj(json_obj.tasks[i]);
                            self.tasks[task.id] = task;
                            // let task:Task = <Task>json_obj.tasks[i];
                            // console.log("Task constructor: "+task.class.constructor);
                            //task.GetDateAndTimeFromMySQL();
                            //so lets grab the task html prototype
                            //task_displayed_protoType
                            var task_prototype = $("#task_displayed_protoType").clone(true);
                            task_prototype.css("display", "block");
                            task_prototype.removeAttr("id");
                            task_prototype.appendTo("#tasks_container_date_range");
                            //add the id to it, so we can fetch it easily
                            task_prototype.attr("id", "task-" + task.id);
                            //now change out the tag values
                            task_prototype.find(".task_displayed_name").html(task.task);
                            task_prototype.find(".task_displayed_category").html("(" + task.category + ")");
                            task_prototype.find(".task_displayed_start").html(task.start_date_time.date_display + "|  " + task.start_date_time.time_display + " --");
                            if (task.end_date_time_str != null)
                                task_prototype.find(".task_displayed_end").html((task.end_date_time.date_display + " | " + task.end_date_time.time_display));
                            else
                                task_prototype.find(".task_displayed_end").html("(Task not finished) ");
                            //also store the task id on the edit btn:
                            task_prototype.find(".btn_edit_task").attr("data-task-id", task.id);
                            if (task.end_date_time_str != null) {
                                //put in the total time
                                task_prototype.find(".task_displayed_total").html("total time");
                            }
                            else
                                task_prototype.find(".task_displayed_total").html("");
                            //task_prototype.find(".task_displayed_total").html(task.end_date_time);
                        }
                    }
                }
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        });
    };
    return MainObj;
}());
exports.MainObj = MainObj;
var Main = new MainObj();
//cast window as any to trick typescript into not throwing an error because window doesn't have property main
window.Main = Main;
//# sourceMappingURL=main.js.map