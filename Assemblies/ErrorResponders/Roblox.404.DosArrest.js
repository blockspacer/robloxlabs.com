"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../Api");
exports.default = (req, res) => {
    res.status(req.method === 'OPTIONS' ? 200 : 404).sendFile(Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\ErrorViews\\DOSArrest\\DOSArrest.404.html');
};
