"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const Roblox_Util_FastLog_1 = require("../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog");
const StatusCodes_1 = require("./StatusCodes");
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAGVARIABLE('Debug', false);
var Errors;
(function (Errors) {
    function RespondWithCustomErrors(statusCode, customErrors, response, shouldEndResponse = true) {
        const CustomErrorList = { errors: customErrors };
        response.status(statusCode).send(CustomErrorList);
        if (shouldEndResponse)
            response.end();
    }
    Errors.RespondWithCustomErrors = RespondWithCustomErrors;
    function RespondWithAHttpError(response, exception) {
        if (Roblox_Util_FastLog_1.DFFlag('Debug'))
            return RespondWithADetailedError(response, exception);
        return RespondWithInternalServerError(response);
    }
    Errors.RespondWithAHttpError = RespondWithAHttpError;
    function RespondWithInternalServerError(response) {
        const customErrors = [{ code: 500, message: 'InternalServerError' }];
        RespondWithCustomErrors(500, customErrors, response, true);
        return;
    }
    Errors.RespondWithInternalServerError = RespondWithInternalServerError;
    function RespondWithAHttpStatusError(status, response) {
        const customErrors = [{ code: status || 0, message: StatusCodes_1.StatusCodes[status.toString()] || 'Unknown' }];
        RespondWithCustomErrors(status, customErrors, response, true);
        return;
    }
    Errors.RespondWithAHttpStatusError = RespondWithAHttpStatusError;
    function RespondWithADefaultHttpError(status, response) {
        const customErrors = [{ code: 0, message: 'Something went wrong with the request, see response status code.' }];
        RespondWithCustomErrors(status, customErrors, response, true);
        return;
    }
    Errors.RespondWithADefaultHttpError = RespondWithADefaultHttpError;
    function RespondWithADetailedError(response, exception) {
        const customErrors = [{ code: 500, message: `${exception.stack}`.replace('Error:', '') }];
        RespondWithCustomErrors(500, customErrors, response, true);
        return;
    }
    Errors.RespondWithADetailedError = RespondWithADetailedError;
})(Errors = exports.Errors || (exports.Errors = {}));
