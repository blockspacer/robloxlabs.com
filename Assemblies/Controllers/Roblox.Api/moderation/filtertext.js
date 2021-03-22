"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    method: 'all',
    func: (_req, res) => {
        res.send({ data: { white: 'test', black: 'test2' } });
    },
};
