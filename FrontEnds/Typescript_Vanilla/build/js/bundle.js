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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = __webpack_require__(1);
var UI_1 = __webpack_require__(2);
var test = new test_1.Test();
$(document).ready(function () {
    // $("#login").html("Hello MEgan!!!");
    // $("#register").css("display", "block");
    var hello = new test_1.Test();
    hello.Log("testing log from Jquery");
});
console.log("this bundled object: " + JSON.stringify(this));
console.log(this);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.Log = function (text) {
        console.log("LOGGING: " + text);
    };
    return Test;
}());
exports.Test = Test;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.PopUp = function (text) {
        console.log(text);
    };
    UI.prototype.ShowRegister = function () {
        $("#register").css("display", "block");
        $("#login").css("display", "none");
    };
    UI.prototype.ShowLogin = function () {
        $("#register").css("display", "none");
        $("#login").css("display", "block");
        console.log("ShowLogin!!!");
    };
    return UI;
}());
exports.UI = UI;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDM2ODAxZTU2YjMyNTgxMWQ0NmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvdGVzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1VJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxvQ0FBOEI7QUFDOUIsa0NBQXdCO0FBRXhCLElBQUksSUFBSSxHQUFRLElBQUksV0FBSSxFQUFFLENBQUM7QUFLM0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLHNDQUFzQztJQUN0QywwQ0FBMEM7SUFHMUMsSUFBSSxLQUFLLEdBQVEsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFHekMsQ0FBQyxDQUFDLENBQUM7QUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR2xCLCtCQUErQjtBQUMvQiw0QkFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0JFO0FBRUY7SUFBQTtRQUVZLE9BQUUsR0FBTSxJQUFJLE9BQUUsRUFBRSxDQUFDO0lBb0I3QixDQUFDO0lBbEJHOztPQUVHO0lBQ0gsMEJBQVEsR0FBUjtRQUVJLElBQUksS0FBSyxHQUFVLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlDLElBQUksR0FBRyxHQUFVLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxHQUFDLEtBQUssR0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEUsMkdBQTJHO1FBRTNHLGlHQUFpRztJQUNyRyxDQUFDO0lBQ0QsdUJBQUssR0FBTDtJQUdBLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQztBQXRCWSwwQkFBTztBQXVCcEIsSUFBSSxJQUFJLEdBQVcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUNqQyxNQUFNLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztBQ3ZFakI7SUFBQTtJQU1BLENBQUM7SUFKRyxrQkFBRyxHQUFILFVBQUksSUFBVztRQUVYLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQztBQU5ZLG9CQUFJOzs7Ozs7Ozs7O0FDQWpCO0lBQUE7SUFvQkEsQ0FBQztJQWxCRyxrQkFBSyxHQUFMLFVBQU0sSUFBVztRQUViLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUdELHlCQUFZLEdBQVo7UUFFSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsc0JBQVMsR0FBVDtRQUVJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNMLFNBQUM7QUFBRCxDQUFDO0FBcEJZLGdCQUFFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQzNjgwMWU1NmIzMjU4MTFkNDZlIiwiaW1wb3J0IHsgVGVzdCB9IGZyb20gXCIuL3Rlc3RcIjtcclxuaW1wb3J0IHtVSX0gZnJvbSBcIi4vVUlcIjtcclxuXHJcbnZhciB0ZXN0OlRlc3QgPSBuZXcgVGVzdCgpO1xyXG5cclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgIC8vICQoXCIjbG9naW5cIikuaHRtbChcIkhlbGxvIE1FZ2FuISEhXCIpO1xyXG4gICAgLy8gJChcIiNyZWdpc3RlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG5cclxuICAgIGxldCBoZWxsbzpUZXN0ID0gbmV3IFRlc3QoKTtcclxuICAgIGhlbGxvLkxvZyhcInRlc3RpbmcgbG9nIGZyb20gSnF1ZXJ5XCIpO1xyXG5cclxuXHJcbn0pO1xyXG5jb25zb2xlLmxvZyhcInRoaXMgYnVuZGxlZCBvYmplY3Q6IFwiK0pTT04uc3RyaW5naWZ5KHRoaXMpKTtcclxuY29uc29sZS5sb2codGhpcyk7XHJcblxyXG5cclxuLy8gbGV0IGhlbGxvOlRlc3QgPSBuZXcgVGVzdCgpO1xyXG4vLyBoZWxsby5Mb2coXCJ0ZXN0aW5nIGxvZ1wiKTtcclxuXHJcbi8qXHJcbmltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xyXG5cclxuLy9pbXBvcnQgKiBhcyAkIGZyb20g4oCYanF1ZXJ54oCZO1xyXG5cclxuXHJcbi8vIGltcG9ydCB7VGVzdH0gZnJvbSAndGVzdCc7XHJcblxyXG4vLyBpbXBvcnQge1Rlc3R9ID0gcmVxdWlyZSgnLnRlc3QnKTtcclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJChcIiNsb2dpblwiKS5odG1sKFwiSGVsbG8gdGhlcmVcIik7XHJcbiAgICAkKFwiI3JlZ2lzdGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgICBsZXQgaGVsbG86VGVzdCA9IG5ldyBUZXN0KCk7XHJcbiAgICBoZWxsby5Mb2coXCJ0ZXN0aW5nIGxvZ1wiKTtcclxuXHJcblxyXG59KTtcclxuKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluT2JqXHJcbntcclxuICAgIHB1YmxpYyAgdWk6VUkgPSBuZXcgVUkoKTtcclxuXHJcbiAgICAvKlxyXG4gICAgRm9yIHJlZ2lzdGVyaW5nIGEgbmV3IHVzZXItIGdldCB0aGUgZW1haWwgYWRkcmVzcywgcGFzc3dvcmQsIGFuZCBhdHRlbXB0IHRvIHJlZ2lzdGVyXHJcbiAgICAgKi9cclxuICAgIFJlZ2lzdGVyKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZW1haWw6c3RyaW5nID0gJChcIiNyZWdpc3Rlcl9lbWFpbFwiKS52YWwoKTtcclxuICAgICAgICBsZXQgcHdkOnN0cmluZyA9ICQoXCIjcmVnaXN0ZXJfcHdkXCIpLnZhbCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXI6IGVtYWlsIGFuZCBwd2QgZW50ZXJlZDogXCIrZW1haWwrXCIsIFwiK3B3ZCk7XHJcblxyXG4gICAgICAgIC8vc28gbGV0cyBjaGVjayB0aGUgaW5wdXQgZmlyc3QsIGFuZCBwcm92aWRlIGFuIGVycm9yIGlmIHNvbWV0aGluZyB3YXMgd3JvbmcvIHRoZXkgZGlkbid0IGVudGVyIGJvdGggaW5wdXRzXHJcblxyXG4gICAgICAgIC8vbm93IGxldHMgdHJ5IHRvIHN1Ym1pdCB0aGVzZSB0byB0aGUgcGhwIHBhZ2UsIGFuZCBnZXQgd2hldGhlciB0aGV5IHdlcmUgcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHlcclxuICAgIH1cclxuICAgIExvZ2luKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbnZhciBNYWluOk1haW5PYmogPSBuZXcgTWFpbk9iaigpO1xyXG53aW5kb3cuTWFpbj1NYWluO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvbWFpbi50cyIsImV4cG9ydCBjbGFzcyBUZXN0XHJcbntcclxuICAgIExvZyh0ZXh0OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxPR0dJTkc6IFwiK3RleHQpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy90ZXN0LnRzIiwiZXhwb3J0IGNsYXNzIFVJXHJcbntcclxuICAgIFBvcFVwKHRleHQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBTaG93UmVnaXN0ZXIoKVxyXG4gICAge1xyXG4gICAgICAgICQoXCIjcmVnaXN0ZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgICQgKFwiI2xvZ2luXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNob3dMb2dpbigpXHJcbiAgICB7XHJcbiAgICAgICAgJChcIiNyZWdpc3RlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICAkIChcIiNsb2dpblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTaG93TG9naW4hISFcIik7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1VJLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==