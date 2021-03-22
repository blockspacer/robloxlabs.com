"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsClient = void 0;
const BaseUrl_1 = require("../../../Data/Client/BaseUrl");
const Api_1 = require("../../../Data/Keys/Api");
const HttpClient_1 = require("../../../Http/ServiceClient/HttpClient");
const HttpRequestMethodEnum_1 = require("../../../Http/ServiceClient/HttpRequestMethodEnum");
var PointsClient;
(function (PointsClient) {
    async function CheckHealth(isRequestSecure = true) {
        return new Promise(async (resumeFunction) => {
            const CheckHealthUrl = BaseUrl_1.BaseURL.ConstructServicePath('points.api', 'checkhealth', isRequestSecure);
            const Client = new HttpClient_1.ServiceClient.HttpClient({
                Url: CheckHealthUrl,
                QueryString: {
                    ApiKey: Api_1.ApiKeys.PointsApi,
                },
                AdditionalHeaders: {},
                Payload: '',
                Method: HttpRequestMethodEnum_1.HttpRequestMethodEnum.GET,
            });
            const [Success, Response] = await Client.execute();
            return resumeFunction([Success, Response.StatusCode, Response.StatusMessage, CheckHealthUrl]);
        });
    }
    PointsClient.CheckHealth = CheckHealth;
    async function GetUserAllTimePoints(user, universe, isRequestSecure = true) {
        return new Promise(async (resumeFunction) => {
            const Url = BaseUrl_1.BaseURL.ConstructServicePath('points.api', 'v1/GetUserAllTimePoints', isRequestSecure);
            const Payload = {
                universe,
                user,
            };
            const Client = new HttpClient_1.ServiceClient.HttpClient({
                Url: Url,
                QueryString: {
                    ApiKey: Api_1.ApiKeys.PointsApi,
                },
                AdditionalHeaders: { 'Content-Type': 'application/json' },
                Payload: JSON.stringify(Payload),
                Method: HttpRequestMethodEnum_1.HttpRequestMethodEnum.POST,
                FailedMessage: `Error getting the alltime points for the user ${user.Id} in the universe ${universe.Id}`,
            });
            const [Success, Response, Error] = await Client.execute();
            return resumeFunction([Success, Response.StatusCode, Response.ResponsePayload, Error]);
        });
    }
    PointsClient.GetUserAllTimePoints = GetUserAllTimePoints;
})(PointsClient = exports.PointsClient || (exports.PointsClient = {}));
