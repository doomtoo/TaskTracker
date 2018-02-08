"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.IsNull = function (obj) {
        return obj === null || obj === undefined || obj.length === 0 || obj === "NULL"; //for blank strings
    };
    Tools.SanitizeInput = function (str) {
        //lets replace single quotes and double quotes with escaped quotes
        //first, lets escape the characters
        //str =  str.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
        str = encodeURI(str);
        //also encode single quotes
        str = str.replace(/'/g, "%27");
        console.log("escaped string: \n" + str + "\nunescaped str:\n" + Tools.UnSanitizeInput(str));
        return str;
    };
    /*
    for putting it back to human readable
     */
    Tools.UnSanitizeInput = function (str) {
        str = decodeURI(str);
        str = str.replace(/%27/g, "'");
        return str;
    };
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=Tools.js.map