"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./test");
var UI_1 = require("./UI");
var test = new test_1.Test();
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
    }
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
    };
    MainObj.prototype.Login = function () {
    };
    return MainObj;
}());
exports.MainObj = MainObj;
var Main = new MainObj();
window.Main = Main;
//# sourceMappingURL=main.js.map