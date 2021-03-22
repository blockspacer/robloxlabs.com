"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    method: 'all',
    func: async (_req, res) => {
        return res.redirect('https://assetgame.roblox.com' + _req.url);
    },
};
