"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UI = /** @class */ (function () {
    function UI() {
    }
    UI.prototype.PopUp = function (text) {
        console.log(text);
    };
    UI.prototype.Register = function () {
    };
    UI.prototype.Login = function () {
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
//# sourceMappingURL=UI.js.map