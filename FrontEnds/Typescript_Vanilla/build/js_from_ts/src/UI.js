"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var Pikaday:any;
var moment = require("moment");
var Pikaday = require("../build/js/libraries/pikaday.js");
var UI = /** @class */ (function () {
    function UI() {
    }
    /*
    For getting the UI libraries for date and time boxes wired up
     */
    UI.prototype.WireUpDate = function (element) {
        var date_format_display = 'MMM DD YYYY';
        var picker = new Pikaday({
            // field: $('#task_start_date')[0],
            field: element[0],
            firstDay: 1,
            minDate: moment().subtract(7, 'days').format(date_format_display),
            defaultDate: moment().format(date_format_display),
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
    };
    UI.prototype.WireUpTime = function (element) {
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