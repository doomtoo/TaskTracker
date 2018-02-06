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
//# sourceMappingURL=Config.js.map