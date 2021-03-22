"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PointsService_1 = require("../../ApiServices/Roblox.Points.Service/Implementation/PointsService");
exports.default = {
    method: 'all',
    func: async (_req, res) => {
        if (!PointsService_1.PointsService.AskIfWeAreAvailable(res))
            return;
        res.status(200).send('"RPS OK"');
    },
};
