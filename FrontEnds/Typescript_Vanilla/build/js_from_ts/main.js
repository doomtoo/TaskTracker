"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UI_1 = require("./UI");
var Tasks_1 = require("./Tasks");
// import * as Moment from "moment";
var DateTime_1 = require("./DateTime");
var Tools_1 = require("./Tools");
var Config_1 = require("./Config");
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
//# sourceMappingURL=Main.js.map