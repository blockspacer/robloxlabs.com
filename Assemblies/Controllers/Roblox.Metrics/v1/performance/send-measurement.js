"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../../../../Api");
exports.default = {
    method: 'all',
    func: (_req, res) => {
        const DFInt = Api_1.RobloxLegacy.Api.Helpers.Util.ClientSettings.GetDFInts();
        return res.send({ logRatio: DFInt['MetricsLogRatio'] });
    },
};
