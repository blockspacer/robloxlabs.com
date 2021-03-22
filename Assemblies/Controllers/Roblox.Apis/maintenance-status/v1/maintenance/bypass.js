"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roblox_Util_FastLog_1 = require("../../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog");
Roblox_Util_FastLog_1.DYNAMIC_FASTSTRING('RobloxLabsSecurityToken');
Roblox_Util_FastLog_1.DYNAMIC_FASTINT('WWWAuthV1MaxAuthTokenAge');
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAG('NoMaintenance');
Roblox_Util_FastLog_1.DYNAMIC_FASTFLAG('CanAdminsBypassTheSystem');
exports.default = {
    method: 'all',
    func: async (_req, res) => {
        if (_req.method === 'OPTIONS')
            return res.send();
        if (!Roblox_Util_FastLog_1.DFFlag('CanAdminsBypassTheSystem') || Roblox_Util_FastLog_1.DFFlag('NoMaintenance'))
            return res.status(401).send();
        return res
            .status(200)
            .cookie('RobloxSecurityToken', Roblox_Util_FastLog_1.DFString('RobloxLabsSecurityToken'), {
            maxAge: Roblox_Util_FastLog_1.DFInt('WWWAuthV1MaxAuthTokenAge'),
            domain: '.sitetest4.robloxlabs.com',
            secure: false,
            sameSite: 'lax',
            httpOnly: true,
        })
            .send({ success: true });
    },
};
