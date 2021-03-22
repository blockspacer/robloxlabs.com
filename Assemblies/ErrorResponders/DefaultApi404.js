"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultApi404 = void 0;
const Errors_1 = require("../Web/Util/Roblox.Web.Util/Errors");
const DefaultApi404 = (_req, res) => {
    Errors_1.Errors.RespondWithADefaultHttpError(404, res);
};
exports.DefaultApi404 = DefaultApi404;
