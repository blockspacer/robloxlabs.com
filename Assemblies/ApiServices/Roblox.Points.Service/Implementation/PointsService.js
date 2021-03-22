"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsService = void 0;
const Roblox_Util_FastLog_1 = require("../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog");
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAGVARIABLE('PointsServiceEnabled', true);
var PointsService;
(function (PointsService) {
    function HandleGetAllTimePoints(user, universe, response) {
        if (!AskIfWeAreAvailable(response))
            return;
        return response.status(200).send({ IUser: user, IUniverse: universe, allTimeScore: 0 });
    }
    PointsService.HandleGetAllTimePoints = HandleGetAllTimePoints;
    function AskIfWeAreAvailable(response) {
        if (!Roblox_Util_FastLog_1.DFFlag('PointsServiceEnabled')) {
            response.status(503).send();
            return false;
        }
        return true;
    }
    PointsService.AskIfWeAreAvailable = AskIfWeAreAvailable;
})(PointsService = exports.PointsService || (exports.PointsService = {}));
