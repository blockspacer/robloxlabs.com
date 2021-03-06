/*
	FileName: _P-userId.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Gets a user's all-time points balance from an universe.
			
	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest4.robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

/*

GET /v1/universe/{universeId}/users/{userId} HTTP/1.1
Host: points.sitetest4.robloxlabs.com

*/

// Implementation:
// Method: GET
// Requires HTTPS: Yes
// Uses ApiService: Yes

import { Request, Response } from 'express';
import { FASTFLAG, FFlag } from '../../../../../../../../Helpers/WebHelpers/Roblox.Util/Roblox.Util.FastLog';
import { ICustomError } from '../../../../../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { PointsRequestProcessor } from '../../../../../../../../Web/Points/Roblox.Web.Points/PointsRequestProcessor';
import { Errors } from '../../../../../../../../Web/Util/Roblox.Web.Util/Errors';
import { GetAllTimePointBalanceResponse } from '../../../../../../Models/GetAllTimePointBalanceResponse';

FASTFLAG('RequireGlobalHTTPS');

export default {
	method: 'all', //Allow all methods but validate the method in the request itself
	func: async (request: Request, response: Response<GetAllTimePointBalanceResponse>) => {
		const errors: ICustomError[] = [];
		if (FFlag['RequireGlobalHTTPS'] && request.protocol !== 'https') {
			errors.push({
				code: 0,
				message: 'HTTPS Required',
			});
			return Errors.RespondWithCustomErrors(403, errors, response, true);
		}

		// OPTIONS should already be validated by now
		if (request.method !== 'GET') {
			errors.push({
				code: 0,
				message: `The requested resource does not support http method '${request.method}'.`,
			});
			return Errors.RespondWithCustomErrors(405, errors, response, true);
		}

		const universeId = parseInt(<string>request.params.universeId);
		const userId = parseInt(<string>request.params.userId);

		const [IsValidInputs, universe, user] = await PointsRequestProcessor.CheckUniverseAndUser(universeId, userId, response);
		if (!IsValidInputs) return;

		const [Success, , Response, Error] = await PointsRequestProcessor.GetUserAllTimePoints(universe, user);
		if (!Success) {
			return Errors.RespondWithAHttpError(response, Error);
		}
		response.send({ allTimeScore: Response.allTimeScore });
	},
};
