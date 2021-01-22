/*
	FileName: mapconfig.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for server Configurations, used as a helper.

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

import { ConfigOpts } from '../../library/startup';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { _dirname } from '../constants/directories';
import config from '../../config/default-serverv2-config';

export default (app: IApplicationBuilder, PagesDir: string, EndpointsDir: string, apiName: string, errorpage?: boolean) => {
	return {
		app: app,
		...((config as unknown) as ConfigOpts),
		PagesOpts: {
			path: _dirname + PagesDir,
		},
		EndpointOpts: {
			path: _dirname + EndpointsDir,
			logSetups: true,
			apiName: apiName,
		},
		errorpage: errorpage,
	};
};
