"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../Api");
exports.default = (req, res) => {
    return res
        .status(404)
        .sendFile(Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\ErrorViews\\WWWRoot\\Roblox.404.html');
};
