"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roblox_Util_FastLog_1 = require("../../../../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog");
const PointsRequestProcessor_1 = require("../../../../../../../Web/Points/Roblox.Web.Points/PointsRequestProcessor");
const Errors_1 = require("../../../../../../../Web/Util/Roblox.Web.Util/Errors");
Roblox_Util_FastLog_1.FASTFLAG('RequireGlobalHTTPS');
exports.default = {
    method: 'all',
    func: async (request, response) => {
        const errors = [];
        if (Roblox_Util_FastLog_1.FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
            errors.push({
                code: 0,
                message: 'HTTPS Required',
            });
            return Errors_1.Errors.RespondWithCustomErrors(403, errors, response, true);
        }
        if (request.method !== 'GET') {
            errors.push({
                code: 0,
                message: `The requested resource does not support http method '${request.method}'.`,
            });
            return Errors_1.Errors.RespondWithCustomErrors(405, errors, response, true);
        }
        const universeId = parseInt(request.params.universeId);
        const userId = parseInt(request.params.userId);
        const [IsValidInputs, universe, user] = PointsRequestProcessor_1.PointsRequestProcessor.CheckUniverseAndUser(universeId, userId, response);
        if (!IsValidInputs)
            return;
        const [Success, , Response, Error] = await PointsRequestProcessor_1.PointsRequestProcessor.GetUserAllTimePoints(universe, user);
        if (!Success) {
            return Errors_1.Errors.RespondWithAHttpError(response, Error);
        }
        response.send({ allTimeScore: Response.allTimeScore });
    },
};
