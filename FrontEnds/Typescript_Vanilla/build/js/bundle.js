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
//cast window as any to trick typescript into not throwing an error because window doesn't have property main
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGJjZjE3NzViYzU2MDI1ZmMzODEiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvdGVzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL1VJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxvQ0FBOEI7QUFDOUIsa0NBQXdCO0FBRXhCLElBQUksSUFBSSxHQUFRLElBQUksV0FBSSxFQUFFLENBQUM7QUFLM0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLHNDQUFzQztJQUN0QywwQ0FBMEM7SUFHMUMsK0JBQStCO0lBQy9CLHdDQUF3QztBQUc1QyxDQUFDLENBQUMsQ0FBQztBQUNILDZEQUE2RDtBQUM3RCxxQkFBcUI7QUFHckIsK0JBQStCO0FBQy9CLDRCQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFvQkU7QUFFRjtJQUFBO1FBRVksT0FBRSxHQUFNLElBQUksT0FBRSxFQUFFLENBQUM7SUFzQjdCLENBQUM7SUFwQkc7O09BRUc7SUFDSCwwQkFBUSxHQUFSO1FBR0ksc0dBQXNHO1FBQ3RHLElBQUksS0FBSyxHQUFlLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25ELElBQUksR0FBRyxHQUFlLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxHQUFDLEtBQUssR0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEUsMkdBQTJHO1FBRTNHLGlHQUFpRztJQUNyRyxDQUFDO0lBQ0QsdUJBQUssR0FBTDtJQUdBLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQztBQXhCWSwwQkFBTztBQXlCcEIsSUFBSSxJQUFJLEdBQVcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUdqQyw2R0FBNkc7QUFDNUcsTUFBYyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUM1RTFCO0lBQUE7SUFNQSxDQUFDO0lBSkcsa0JBQUcsR0FBSCxVQUFJLElBQVc7UUFFWCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUM7QUFOWSxvQkFBSTs7Ozs7Ozs7OztBQ0FqQjtJQUFBO0lBb0JBLENBQUM7SUFsQkcsa0JBQUssR0FBTCxVQUFNLElBQVc7UUFFYixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFHRCx5QkFBWSxHQUFaO1FBRUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHNCQUFTLEdBQVQ7UUFFSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxTQUFDO0FBQUQsQ0FBQztBQXBCWSxnQkFBRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0YmNmMTc3NWJjNTYwMjVmYzM4MSIsImltcG9ydCB7IFRlc3QgfSBmcm9tIFwiLi90ZXN0XCI7XHJcbmltcG9ydCB7VUl9IGZyb20gXCIuL1VJXCI7XHJcblxyXG52YXIgdGVzdDpUZXN0ID0gbmV3IFRlc3QoKTtcclxuXHJcblxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAkKFwiI2xvZ2luXCIpLmh0bWwoXCJIZWxsbyBNRWdhbiEhIVwiKTtcclxuICAgIC8vICQoXCIjcmVnaXN0ZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG5cclxuXHJcbiAgICAvLyBsZXQgaGVsbG86VGVzdCA9IG5ldyBUZXN0KCk7XHJcbiAgICAvLyBoZWxsby5Mb2coXCJ0ZXN0aW5nIGxvZyBmcm9tIEpxdWVyeVwiKTtcclxuXHJcblxyXG59KTtcclxuLy8gY29uc29sZS5sb2coXCJ0aGlzIGJ1bmRsZWQgb2JqZWN0OiBcIitKU09OLnN0cmluZ2lmeSh0aGlzKSk7XHJcbi8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cclxuXHJcbi8vIGxldCBoZWxsbzpUZXN0ID0gbmV3IFRlc3QoKTtcclxuLy8gaGVsbG8uTG9nKFwidGVzdGluZyBsb2dcIik7XHJcblxyXG4vKlxyXG5pbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcclxuXHJcbi8vaW1wb3J0ICogYXMgJCBmcm9tIOKAmGpxdWVyeeKAmTtcclxuXHJcblxyXG4vLyBpbXBvcnQge1Rlc3R9IGZyb20gJ3Rlc3QnO1xyXG5cclxuLy8gaW1wb3J0IHtUZXN0fSA9IHJlcXVpcmUoJy50ZXN0Jyk7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICQoXCIjbG9naW5cIikuaHRtbChcIkhlbGxvIHRoZXJlXCIpO1xyXG4gICAgJChcIiNyZWdpc3RlclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgbGV0IGhlbGxvOlRlc3QgPSBuZXcgVGVzdCgpO1xyXG4gICAgaGVsbG8uTG9nKFwidGVzdGluZyBsb2dcIik7XHJcblxyXG5cclxufSk7XHJcbiovXHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbk9ialxyXG57XHJcbiAgICBwdWJsaWMgIHVpOlVJID0gbmV3IFVJKCk7XHJcblxyXG4gICAgLypcclxuICAgIEZvciByZWdpc3RlcmluZyBhIG5ldyB1c2VyLSBnZXQgdGhlIGVtYWlsIGFkZHJlc3MsIHBhc3N3b3JkLCBhbmQgYXR0ZW1wdCB0byByZWdpc3RlclxyXG4gICAgICovXHJcbiAgICBSZWdpc3RlcigpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIC8vaGF2ZSB0byBjYXN0IGFzIGFueSB0byBnZXQgdHlwZXNjcmlwdCB0byBpZ25vcmUgdGhhdCBqcXVlcnkudmFsIG1heSByZXR1cm4gdW5kZWZpbmVkLCBhbmQgZXJyb3JzIG91dFxyXG4gICAgICAgIGxldCBlbWFpbDpzdHJpbmcgPSA8YW55PiQoXCIjcmVnaXN0ZXJfZW1haWxcIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHB3ZDpzdHJpbmcgPSA8YW55PiQoXCIjcmVnaXN0ZXJfcHdkXCIpLnZhbCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXI6IGVtYWlsIGFuZCBwd2QgZW50ZXJlZDogXCIrZW1haWwrXCIsIFwiK3B3ZCk7XHJcblxyXG4gICAgICAgIC8vc28gbGV0cyBjaGVjayB0aGUgaW5wdXQgZmlyc3QsIGFuZCBwcm92aWRlIGFuIGVycm9yIGlmIHNvbWV0aGluZyB3YXMgd3JvbmcvIHRoZXkgZGlkbid0IGVudGVyIGJvdGggaW5wdXRzXHJcblxyXG4gICAgICAgIC8vbm93IGxldHMgdHJ5IHRvIHN1Ym1pdCB0aGVzZSB0byB0aGUgcGhwIHBhZ2UsIGFuZCBnZXQgd2hldGhlciB0aGV5IHdlcmUgcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHlcclxuICAgIH1cclxuICAgIExvZ2luKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbnZhciBNYWluOk1haW5PYmogPSBuZXcgTWFpbk9iaigpO1xyXG5cclxuXHJcbi8vY2FzdCB3aW5kb3cgYXMgYW55IHRvIHRyaWNrIHR5cGVzY3JpcHQgaW50byBub3QgdGhyb3dpbmcgYW4gZXJyb3IgYmVjYXVzZSB3aW5kb3cgZG9lc24ndCBoYXZlIHByb3BlcnR5IG1haW5cclxuKHdpbmRvdyBhcyBhbnkpLk1haW49TWFpbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvRjovd29ya2luZ19kaXIvV2ViL1Rhc2tUcmFja2VyL0Zyb250RW5kcy9UeXBlc2NyaXB0X1ZhbmlsbGEvc3JjL21haW4udHMiLCJleHBvcnQgY2xhc3MgVGVzdFxyXG57XHJcbiAgICBMb2codGV4dDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMT0dHSU5HOiBcIit0ZXh0KTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GOi93b3JraW5nX2Rpci9XZWIvVGFza1RyYWNrZXIvRnJvbnRFbmRzL1R5cGVzY3JpcHRfVmFuaWxsYS9zcmMvdGVzdC50cyIsImV4cG9ydCBjbGFzcyBVSVxyXG57XHJcbiAgICBQb3BVcCh0ZXh0OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgU2hvd1JlZ2lzdGVyKClcclxuICAgIHtcclxuICAgICAgICAkKFwiI3JlZ2lzdGVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICAkIChcIiNsb2dpblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93TG9naW4oKVxyXG4gICAge1xyXG4gICAgICAgICQoXCIjcmVnaXN0ZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgJCAoXCIjbG9naW5cIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2hvd0xvZ2luISEhXCIpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Y6L3dvcmtpbmdfZGlyL1dlYi9UYXNrVHJhY2tlci9Gcm9udEVuZHMvVHlwZXNjcmlwdF9WYW5pbGxhL3NyYy9VSS50cyJdLCJzb3VyY2VSb290IjoiIn0=