"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../../Api");
const PointsClient_1 = require("../../ApiClients/Roblox.Points.Client/Implementation/PointsClient");
const Errors_1 = require("../../Web/Util/Roblox.Web.Util/Errors");
exports.default = {
    method: 'all',
    func: async (req, res) => {
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
            let cookie = req.headers.cookie;
            if (cookie === undefined)
                cookie = '';
            cookie = cookie.split(';').find((AuthToken) => {
                return AuthToken.startsWith(' .ROBLOSECURITY') || AuthToken.startsWith('.ROBLOSECURITY');
            });
            if (cookie)
                cookie = cookie.split('=')[1];
            if (!Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateOrGetXsrfSession(cookie, req.ip, req.headers['x-csrf-token'], res, false))
                return;
        }
        const [Success, StatusCode, StatusMessage, Url] = await PointsClient_1.PointsClient.CheckHealth(req.secure);
        if (Success && StatusCode === 200) {
            return res.send({ message: 'OK' });
        }
        const customErrors = [
            {
                code: StatusCode,
                message: StatusCode === 503
                    ? StatusMessage.toString()
                    : `Error checking health for Roblox.Points.Service:\r\n   \tStatus Code: ${StatusMessage} (${StatusCode || 'None'})\r\n   \tUrl: ${Url}\r\n   \tResponse Machine Id: None`,
            },
        ];
        return Errors_1.Errors.RespondWithCustomErrors(StatusCode || 503, customErrors, res, true);
    },
};
