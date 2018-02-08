"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var Pikaday:any;
// import * as moment from "moment";
var DateTime_1 = require("./DateTime");
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
//# sourceMappingURL=UI.js.map