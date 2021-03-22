"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIfAuthTokenExists = void 0;
const DEPRECATED_GetManifest_1 = require("../DataBase/DEPRECATED_GetManifest");
const CheckIfAuthTokenExists = (id) => {
    const Manifests = DEPRECATED_GetManifest_1.GetManifests();
    let isValidId = false;
    Manifests.forEach((value) => {
        value.sessionIds.forEach((v) => {
            if (v === id) {
                isValidId = true;
                return;
            }
        });
        if (isValidId)
            return;
    });
    return isValidId;
};
exports.CheckIfAuthTokenExists = CheckIfAuthTokenExists;
