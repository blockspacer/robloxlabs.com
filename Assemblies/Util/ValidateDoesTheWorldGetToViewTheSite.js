"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateDoesTheWorldGetToViewTheSite = void 0;
const BaseUrl_1 = require("../Data/Client/BaseUrl");
const Roblox_Util_FastLog_1 = require("../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog");
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAGVARIABLE('DoesTheWorldGetToViewTheSite', false);
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAGVARIABLE('CanAdminsBypassTheSystem', false);
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAGVARIABLE('NoMaintenance', false);
Roblox_Util_FastLog_1.DYNAMIC_FASTSTRINGVARIABLE('RobloxLabsSecurityToken', 'ljWby+/HVsZXJLfRkoljWby+/HVsZXJLfRko9mPQ9mPQ==');
function ValidateDoesTheWorldGetToViewTheSite(method, returnUrl, secToken, response, doNotRedirect = false, allowNoMaintenance = false) {
    if (method === 'OPTIONS')
        return true;
    if (Roblox_Util_FastLog_1.DFFlag('CanAdminsBypassTheSystem') &&
        (secToken === Roblox_Util_FastLog_1.DFString('RobloxLabsSecurityToken') || secToken === encodeURIComponent(Roblox_Util_FastLog_1.DFString('RobloxLabsSecurityToken'))))
        return true;
    if (!Roblox_Util_FastLog_1.DFFlag('NoMaintenance') && Roblox_Util_FastLog_1.DFFlag('DoesTheWorldGetToViewTheSite'))
        return true;
    if (!Roblox_Util_FastLog_1.DFFlag('DoesTheWorldGetToViewTheSite')) {
        if (Roblox_Util_FastLog_1.DFFlag('NoMaintenance') && allowNoMaintenance) {
            response.status(503).send('The service is unavailable.');
            return false;
        }
        if (!doNotRedirect)
            response.redirect(BaseUrl_1.BaseURL.GetSecureBaseURL() + '/login/maintenance/?ReturnUrl=' + returnUrl);
        return false;
    }
    return true;
}
exports.ValidateDoesTheWorldGetToViewTheSite = ValidateDoesTheWorldGetToViewTheSite;
