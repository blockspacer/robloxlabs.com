"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAsp404 = void 0;
const Api_1 = require("../Api");
const DefaultAsp404 = (req, res) => {
    res.status(req.method === 'OPTIONS' ? 200 : 404).sendFile(Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\ErrorViews\\Roblox.404.html');
};
exports.DefaultAsp404 = DefaultAsp404;
