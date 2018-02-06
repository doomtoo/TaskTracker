"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.IsNull = function (obj) {
        return obj === null || obj === undefined || obj.length === 0 || obj === "NULL"; //for blank strings
    };
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=Tools.js.map