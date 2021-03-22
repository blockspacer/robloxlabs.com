"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const Api_1 = require("../../../Api");
dotenv_1.default.config({ path: Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });
const FFlag = Api_1.RobloxLegacy.Api.Helpers.Util.ClientSettings.GetFFlags();
exports.default = {
    method: 'All',
    func: (request, response) => {
        const DFFlag = Api_1.RobloxLegacy.Api.Helpers.Util.ClientSettings.GetDFFlags();
        const DFInt = Api_1.RobloxLegacy.Api.Helpers.Util.ClientSettings.GetDFInts();
        const Manifest = Api_1.RobloxLegacy.Api.Helpers.Helpers.DB.GetManifests();
        if (!DFFlag['IsWWWAuthV1Enabled'])
            return response.status(503).send({
                code: 503,
                message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
                userfacingmessage: 'Service disabled for an unknown amount of time.',
            });
        if (request.method === 'OPTIONS')
            return response.status(200).send({ success: true, message: '' });
        if (FFlag['RequireGlobalhttps'] && request.protocol !== 'https')
            return response.status(403).send({ success: false, message: 'https Required.' });
        if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods'])
            return response.status(405).send({
                success: false,
                message: `The requested resource does not support https method '${request.method}'.`,
            });
        const registeredUsers = Api_1.RobloxLegacy.Api.Helpers.Helpers.DB.GetRegisteredUsers();
        const sessions = fs_1.default.readdirSync(Api_1.RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\DataBase\\sessions');
        if (JSON.stringify(request.body) === '{}')
            return response.status(400).send({ success: false, message: 'No body was provided.' });
        if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
            return response.status(400).send({
                success: false,
                message: `The Content-Type ${request.headers['content-type']} is not supported.`,
            });
        if (!request.body['cvalue'] || !request.body['password'])
            return response.status(400).send({
                success: false,
                message: 'The body provided was invalid.',
                userfacingmessage: 'The provided credentials were invalid.',
            });
        const Sessions = Api_1.RobloxLegacy.Api.Helpers.Helpers.DB.GetSessions();
        if (DFFlag['IsCaptchaV2Enabled']) {
            const __captchaSession = Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaSessionBlob(request.ip);
            const cToken = request.body['captchaToken'];
            if (typeof cToken === 'string') {
                const cSession = cToken.split('|')[0];
                if (cSession) {
                    let isCaptchaSessionValid = false;
                    for (const v of sessions) {
                        const sessionId = v.split('.').shift();
                        if (sessionId === cSession) {
                            isCaptchaSessionValid = true;
                            break;
                        }
                    }
                    if (isCaptchaSessionValid) {
                        const cAnswer = cToken.split('|')[1];
                        if (!Sessions.has(cSession))
                            return Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
                        if (Sessions.get(cSession).answer !== cAnswer)
                            return Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
                        Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.DeleteCaptchaSession(cSession);
                    }
                    else {
                        return Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
                    }
                }
                else {
                    return Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
                }
            }
            else {
                return Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
            }
        }
        let isValidUser = false;
        let userId = '';
        for (const id of Object.keys(registeredUsers)) {
            if (registeredUsers[id] === request.body['cvalue']) {
                isValidUser = true;
                userId = id;
                break;
            }
        }
        if (isValidUser === false)
            return response.status(404).send({
                success: false,
                message: 'User not found.',
                userfacingmessage: 'Incorrect username or password.',
            });
        if (Manifest.get(userId).password !== request.body['password'])
            return response.status(403).send({
                success: false,
                message: 'Incorrect Password.',
                userfacingmessage: 'Incorrect Password or Username.',
            });
        const AuthToken = crypto_1.default.createHash('sha512').update(crypto_1.default.randomBytes(1000)).digest('hex');
        Api_1.RobloxLegacy.Api.Helpers.Helpers.DB.WriteToManifest(userId, 'sessionIds', AuthToken, true, false, 0, false, false);
        Api_1.RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCsrfSessionFile(AuthToken);
        response.shouldKeepAlive = false;
        return response
            .status(200)
            .cookie('AuthToken', AuthToken, {
            maxAge: DFInt['WWWAuthV1MaxAuthTokenAge'],
            domain: 'sitetest4.robloxlabs.com',
            secure: false,
            sameSite: 'lax',
            httpOnly: true,
        })
            .send({ success: true, message: 'Success', userfacingmessage: 'Success' });
    },
};
