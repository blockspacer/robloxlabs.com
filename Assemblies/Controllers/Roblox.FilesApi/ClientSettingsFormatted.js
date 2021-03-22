"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../../Api");
exports.default = {
    method: 'All',
    func: (request, response) => {
        switch (request.query.clientSettingsType) {
            case 'Client':
                return response.send(Api_1.Roblox.Api.Helpers.Util.ClientSettings.GetAllSettings('Client'));
            case 'Web':
                return response.send({
                    ...Api_1.Roblox.Api.Helpers.Util.ClientSettings.GetAllSettings('Web'),
                    'X-Notice-Me': 'FETCHED WEB-19-RA DEVELOPMENT SERVERAPISETTINGS, ITEMS ARE REMOVED FROM DEVELOPMENT.',
                });
            default:
                return response.send(Api_1.Roblox.Api.Helpers.Util.ClientSettings.GetAllSettings('Client'));
        }
    },
};
