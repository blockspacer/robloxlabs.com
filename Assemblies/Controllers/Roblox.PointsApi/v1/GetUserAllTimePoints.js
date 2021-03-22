"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../../../Api");
const PointsService_1 = require("../../../ApiServices/Roblox.Points.Service/Implementation/PointsService");
const Api_2 = require("../../../Data/Keys/Api");
const Roblox_Util_FastLog_1 = require("../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog");
const FetchKeyFromObjectCaseInsensitive_1 = require("../../../Util/FetchKeyFromObjectCaseInsensitive");
Roblox_Util_FastLog_1.FASTFLAG('RequireGlobalHTTPS');
exports.default = {
    method: 'all',
    func: async (request, response) => {
        if (request.method === 'OPTIONS')
            return response.status(200).send();
        if (Roblox_Util_FastLog_1.FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https')
            return response
                .status(404)
                .sendFile(Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\ErrorViews\\FilesApi\\Roblox.404.html');
        if (request.method !== 'POST')
            return response
                .status(405)
                .header({ Allow: 'POST' })
                .send({
                Message: `The requested resource does not support http method '${request.method}'.`,
            });
        if (request.body && (!request.headers['content-type'] || request.headers['content-type'].length === 0))
            return response.status(415).send({
                Message: "The request contains an entity body but no Content-Type header. The inferred media type 'application/octet-stream' is not supported for this resource.",
            });
        const apiKey = FetchKeyFromObjectCaseInsensitive_1.FetchKeyFromObjectCaseInsensitive(request.query, 'ApiKey');
        if (!apiKey.match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)) {
            response.statusMessage = 'ApiKey required in Guid format.';
            return response.status(503).send();
        }
        if (apiKey !== Api_2.ApiKeys.PointsApi) {
            response.statusMessage = 'The client is not authorized to perform this operation.';
            return response.status(503).send();
        }
        return PointsService_1.PointsService.HandleGetAllTimePoints(request.body.user, request.body.universe, response);
    },
};
