"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsRequestProcessor = void 0;
const PointsClient_1 = require("../../../ApiClients/Roblox.Points.Client/Implementation/PointsClient");
const User_1 = require("../../../Platform/Membership/User");
const Universe_1 = require("../../../Platform/Universes/Universe");
const Errors_1 = require("../../Util/Roblox.Web.Util/Errors");
var PointsRequestProcessor;
(function (PointsRequestProcessor) {
    async function GetUserAllTimePoints(universe, user) {
        return new Promise(async (resumeFunction) => {
            const [WasRequestSuccessful, StatusCode, Response, Error] = await PointsClient_1.PointsClient.GetUserAllTimePoints(user, universe);
            return resumeFunction([WasRequestSuccessful, StatusCode, Response, Error]);
        });
    }
    PointsRequestProcessor.GetUserAllTimePoints = GetUserAllTimePoints;
    function CheckUniverseAndUser(universeId, userId, response) {
        const errors = [];
        if (isNaN(universeId)) {
            errors.push({
                code: 1,
                message: 'The universe is invalid.',
                userFacingMessage: 'Something went wrong',
            });
            Errors_1.Errors.RespondWithCustomErrors(404, errors, response, true);
            return [false, null, null];
        }
        if (isNaN(userId)) {
            errors.push({
                code: 2,
                message: 'The user is invalid.',
                userFacingMessage: 'Something went wrong',
            });
            Errors_1.Errors.RespondWithCustomErrors(404, errors, response, true);
            return [false, null, null];
        }
        const user = User_1.User.GetByUserId(userId);
        const universe = Universe_1.Universe.GetById(universeId);
        if (universe === null) {
            errors.push({
                code: 1,
                message: 'The universe is invalid.',
                userFacingMessage: 'Something went wrong',
            });
            Errors_1.Errors.RespondWithCustomErrors(404, errors, response, true);
            return [false, null, null];
        }
        if (user === null) {
            errors.push({
                code: 2,
                message: 'The user is invalid.',
                userFacingMessage: 'Something went wrong',
            });
            Errors_1.Errors.RespondWithCustomErrors(404, errors, response, true);
            return [false, null, null];
        }
        return [true, universe, user];
    }
    PointsRequestProcessor.CheckUniverseAndUser = CheckUniverseAndUser;
})(PointsRequestProcessor = exports.PointsRequestProcessor || (exports.PointsRequestProcessor = {}));
