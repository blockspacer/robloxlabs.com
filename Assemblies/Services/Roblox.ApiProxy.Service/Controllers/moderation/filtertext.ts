/*
	FileName: Negotiate.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://api.sitetest4.robloxlabs.com/Login/Negotiate.ashx, Tries to authenticate the current user based on a query param named 'suggest'.

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

export default {
	method: 'all',
	func: (_req: any, res): void => {
		res.send({ data: { white: 'test', black: 'test2' } });
	},
};
