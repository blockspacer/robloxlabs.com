"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobloxEntity = void 0;
class RobloxEntity {
    constructor(primaryKey, db) {
        this._DB = db;
        this.canExecute = false;
    }
    Select(keyOrKeys) {
        if (typeof keyOrKeys === 'undefined')
            this.selectAllKeys = true;
        if (typeof keyOrKeys === 'string')
            this.keysToSelect.push(keyOrKeys);
        if (Array.isArray(keyOrKeys))
            keyOrKeys.forEach((key) => this.keysToSelect.push(key));
        this.canExecute = true;
        return this;
    }
    Where(key, conition, value) {
        return this;
    }
    Execute() {
        if (!this.canExecute)
            return;
    }
    static GetOrCreate(db, primaryKey) {
        return new RobloxEntity(primaryKey, db);
    }
}
exports.RobloxEntity = RobloxEntity;
