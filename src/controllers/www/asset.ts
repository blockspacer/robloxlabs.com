/*
	FileName: asset.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://www.sitetest1.mfdlabs.com/asset/

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

export default {
	dir: '/asset/',
	method: 'all',
	func: (req, res): void => {
		if (req.query.id === '1') {
			res.redirect('http://static.sitetest1.mfdlabs.com/rbx/1.rbxlx');
			return;
		}
		res.redirect(`https://assetdelivery.roblox.com/v1/asset?${req.url.split('?')[1]}`);
	},
};
