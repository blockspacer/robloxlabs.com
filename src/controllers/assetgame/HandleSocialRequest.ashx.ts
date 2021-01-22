/*
	FileName: HandleSocialRequest.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://assetgame.sitetest1.mfdlabs.com/game/LuaWebService/HandleSocialRequest.ashx

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/sitetest1.mfdlabs.com

	***

	Copyright 2015-2020 MFD

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

import { Request } from 'express-serve-static-core';

export default {
	dir: '/Game/LuaWebService/HandleSocialRequest.ashx',
	method: 'all',
	func: (req: Request, res): void => {
		switch (req.query.method) {
			case 'IsFriendsWith':
				res.send('<Value type="boolean">false</Value>');
				break;
			case 'IsBestFriendsWith':
				res.send('<Value type="boolean">false</Value>');
				break;
			case 'IsInGroup':
				res.send('<Value type="boolean">true</Value>');
				break;
			case 'GetGroupRank':
				res.send('<Value type="integer">0</Value>');
				break;
			case 'GetGroupRole':
				res.send('<Value type="string">faggot</Value>');
				break;
		}
	},
};
