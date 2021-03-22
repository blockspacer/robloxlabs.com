"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobloxDataBase = void 0;
const RobloxEntity_1 = require("./RobloxEntity");
class RobloxDataBase {
    constructor(dal, name) {
        this._Dal = dal;
        this._Name = name;
    }
    From(primaryKey) {
        return RobloxEntity_1.RobloxEntity.GetOrCreate(this, primaryKey);
    }
    get Name() {
        return this._Name;
    }
    get DAL() {
        return this._Dal;
    }
    static GetDataBaseByDAL(dal) {
        return new RobloxDataBase(dal, dal['Name']);
    }
}
exports.RobloxDataBase = RobloxDataBase;
