"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServiceIsAliveValidator = void 0;
const ValidateDoesTheWorldGetToViewTheSite_1 = require("../Util/ValidateDoesTheWorldGetToViewTheSite");
const Errors_1 = require("../Web/Util/Roblox.Web.Util/Errors");
exports.ApiServiceIsAliveValidator = ((req, res, next) => {
    if (req.method === 'OPTIONS')
        return next();
    let cookie = req.headers.cookie;
    if (cookie === undefined)
        cookie = '';
    cookie = cookie.split(';').find((secToken) => {
        return secToken.startsWith(' RobloxSecurityToken') || secToken.startsWith('RobloxSecurityToken');
    });
    if (cookie)
        cookie = cookie.split('=')[1];
    if (!ValidateDoesTheWorldGetToViewTheSite_1.ValidateDoesTheWorldGetToViewTheSite(req.method, encodeURIComponent(`${req.protocol}://${req.hostname}${req.url}`), cookie || req.headers['roblox-security-token'], res, true)) {
        const customErrors = [{ code: 0, message: 'Service Undergoing Maintenance' }];
        Errors_1.Errors.RespondWithCustomErrors(503, customErrors, res, true);
        return;
    }
    next();
});
