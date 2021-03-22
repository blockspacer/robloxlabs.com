"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const Api_1 = require("../../../Api");
exports.default = {
    method: 'all',
    func: async (_req, res) => {
        if (_req.method === 'OPTIONS')
            return res.send();
        if (_req.query.assetId === '1')
            return res.send(JSON.parse(fs_1.default.readFileSync(Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\InternalCDN\\TheAsset.json', {
                encoding: 'utf-8',
            })));
        axios_1.default.get('https://api.roblox.com' + _req.url, {
            headers: { ..._req.headers, host: 'api.roblox.com' },
        })
            .then((re) => {
            const newheaders = JSON.parse(JSON.stringify(re.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
            return res.header(newheaders).send(re.data);
        })
            .catch((e) => {
            const newheaders = JSON.parse(JSON.stringify(e.response.headers).split('roblox.com').join('sitetest4.robloxlabs.com'));
            return res.header(newheaders).status(e.response.status).send(e.response.data);
        });
    },
};
