"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    method: 'all',
    func: async (_req, res) => {
        if (_req.method === 'OPTIONS')
            return res.send();
        res.redirect('https://assetdelivery.roblox.com' + _req.url);
    },
};
