"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlCondition = void 0;
var SqlCondition;
(function (SqlCondition) {
    SqlCondition[SqlCondition["EqualTo"] = 0] = "EqualTo";
    SqlCondition[SqlCondition["NotEqualTo"] = 1] = "NotEqualTo";
    SqlCondition[SqlCondition["LessThan"] = 2] = "LessThan";
    SqlCondition[SqlCondition["GreaterThan"] = 3] = "GreaterThan";
    SqlCondition[SqlCondition["LessThanEqualTo"] = 4] = "LessThanEqualTo";
    SqlCondition[SqlCondition["GreaterThanEqualTo"] = 5] = "GreaterThanEqualTo";
})(SqlCondition = exports.SqlCondition || (exports.SqlCondition = {}));
