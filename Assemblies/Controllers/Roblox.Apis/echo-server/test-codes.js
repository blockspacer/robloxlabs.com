"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const codes_json_1 = __importDefault(require("./codes.json"));
exports.default = {
    method: 'all',
    func: async (_req, res) => {
        res.statusMessage = codes_json_1.default[_req.query.code || '400'];
        res.status(parseInt(_req.query.code) || 400).send({
            errors: [{ code: parseInt(_req.query.code) || 400, message: codes_json_1.default[_req.query.code || '400'] || 'Unknown' }],
        });
    },
};
