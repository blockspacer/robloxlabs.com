"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClientExceptions = void 0;
const StatusCodes_1 = require("../../Web/Util/Roblox.Web.Util/StatusCodes");
var ServiceClientExceptions;
(function (ServiceClientExceptions) {
    class HttpException {
        constructor(Url, Message = 'Error', StatusCode = 0, MachineId = 'None', ErrorCode = 'None') {
            this.Url = Url;
            this.Status = StatusCode;
            this.MachineId = MachineId;
            this.ErrorCode = ErrorCode;
            this.Message = Message;
        }
        fetch() {
            return new Error(`${this.Message}. Roblox.Http.ServiceClientExceptions.HttpException: An error has occurred with your request.
	Status code: ${StatusCodes_1.StatusCodes[this.Status.toString()]} (${this.Status})
	Url: ${this.Url.split('?').shift()}
	Response Machine Id: ${this.MachineId}
	Error code: ${this.ErrorCode} (None)`);
        }
    }
    ServiceClientExceptions.HttpException = HttpException;
})(ServiceClientExceptions = exports.ServiceClientExceptions || (exports.ServiceClientExceptions = {}));
