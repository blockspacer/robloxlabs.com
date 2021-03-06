/*
	FileName: Signup.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: The current Signup function.
			
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
POST https://www.sitetest4.robloxlabs.com/Authentication/Signup.ashx https/2.0
X-CSRF-TOKEN: token123
Content-Type: application/x-www-form-urlencoded
Connection: close

&cvalue=username
&password=password
&captchaToken=sessionId+gameId+correctAnswers[].toString()|locale-info

*/

import { Request, Response } from 'express-serve-static-core';
import dotenv from 'dotenv';
import filestream from 'fs';
import { RobloxLegacy } from '../../../../Api';

dotenv.config({ path: RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\.env' });

const FFlag = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetFFlags();

export default {
	method: 'All',
	func: (request: Request, response: Response): Response<unknown> | void => {
		const DFFlag = RobloxLegacy.Api.Helpers.Util.ClientSettings.GetDFFlags();
		// const DFInt = ClientSettings.GetSettings(Group.DFInt);
		// const Manifest = GetManifests();

		if (!DFFlag['IsWWWAuthV1Enabled'] || !DFFlag['IsWWWAuthSignupPubliclyListed'])
			return response.status(503).send({
				code: 503,
				message: 'The server cannot handle the request (because it is overloaded or down for maintenance)',
				userfacingmessage: 'Service disabled for an unknown amount of time.',
			});

		if (request.method === 'OPTIONS') return response.status(200).send({ success: true, message: '' });
		if (FFlag['RequireGlobalhttps'] && request.protocol !== 'https')
			return response.status(403).send({ success: false, message: 'https Required.' });

		if (request.method !== 'POST' && !DFFlag['WWWAuthV1AllowAllMethods'])
			return response.status(405).send({
				success: false,
				message: `The requested resource does not support https method '${request.method}'.`,
			});

		const sessions = filestream.readdirSync(RobloxLegacy.Api.Constants.RobloxDirectories.__iBaseDirectory + '\\DataBase\\sessions');

		if (JSON.stringify(request.body) === '{}') return response.status(400).send({ success: false, message: 'No body was provided.' });

		if (request.body && request.headers['content-type'] !== 'application/x-www-form-urlencoded')
			return response.status(400).send({
				success: false,
				message: `The Content-Type ${request.headers['content-type']} is not supported.`,
			});
		if (
			!request.body['username'] &&
			!request.body['password'] &&
			!request.body['birthday'] &&
			!request.body['isTosAgreementBoxChecked'] &&
			!request.body['email']
		)
			return response.status(400).send({
				success: false,
				message: 'The body provided was invalid.',
				userfacingmessage: 'The provided credentials were invalid.',
			});

		const Sessions = RobloxLegacy.Api.Helpers.Helpers.DB.GetSessions();
		if (DFFlag['IsCaptchaV2Enabled']) {
			const __captchaSession = RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaSessionBlob(request.ip);
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
							return RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(
								response,
								__captchaSession,
								request.ip,
							);
						if (Sessions.get(cSession).answer !== cAnswer)
							return RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(
								response,
								__captchaSession,
								request.ip,
							);
						RobloxLegacy.Api.Helpers.Helpers.Sessions.DeleteCaptchaSession(cSession);
					} else {
						return RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(
							response,
							__captchaSession,
							request.ip,
						);
					}
				} else {
					return RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(
						response,
						__captchaSession,
						request.ip,
					);
				}
			} else {
				return RobloxLegacy.Api.Helpers.Helpers.Sessions.CreateCaptchaBlobSessionAfter403(response, __captchaSession, request.ip);
			}
		}
		return response.status(200).send({ success: true, message: 'Not Enabled', userfacingmessage: 'NE_AJ_JSX' });
	},
};
