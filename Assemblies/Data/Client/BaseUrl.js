"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseURL = void 0;
const Api_1 = require("../../Api");
var BaseURL;
(function (BaseURL) {
    function GetBaseURL() {
        return 'http://' + Api_1.RobloxLegacy.Api.Constants.URLS.ROBLOX_WWW;
    }
    BaseURL.GetBaseURL = GetBaseURL;
    function GetSecureBaseURL() {
        return 'https://' + Api_1.RobloxLegacy.Api.Constants.URLS.ROBLOX_WWW;
    }
    BaseURL.GetSecureBaseURL = GetSecureBaseURL;
    function ConstructServicePath(subDomain, servicePath = '/', secure = true) {
        return `${(secure ? GetSecureBaseURL() : GetBaseURL()).replace(/www/, subDomain)}${!servicePath.startsWith('/') ? `/${servicePath}` : servicePath}`;
    }
    BaseURL.ConstructServicePath = ConstructServicePath;
})(BaseURL = exports.BaseURL || (exports.BaseURL = {}));
