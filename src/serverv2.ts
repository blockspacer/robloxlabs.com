/*
	FileName: serverV2.ts
	Written By: Nikita Nikolaevich Petko,
				Ivan Ivanov Gregrovnich,
				Aleksej Pushnik Grasnich,
				Tomska Arnold Vandrej,
				Tomska Poshkiom Lanska,
				Aleksej Brovim Pushnak,
				Ishka Alemdak Rejor,
				Jack Daniels Alan,
				Alanska Ivanski Vosproshchniki
	File Type: Script
	Description: The 2nd version of mfdlabs.com (uses a mfdlabs domain).
					This one is for testing new endpoints and features (such as controllers).

	All commits will be made on behalf of mfd-co to https://github.com/mfd-core/mfdlabs.com

	NOTICE This Application Programming Interface will be hosted on both https://*.sitetest1.mfdlabs.com:443 and http://*.sitetest1.mfdlabs.com:80.
	DEPRECATED DO NOT USE OutgoingMessage.prototype._headers

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

import clearCachedSessions from './modules/constants/clearCachedSessions';
import mapwss from './modules/constants/ws';
import mapssl from './modules/constants/ssl';
import mapconfig from './modules/configs/mapconfig';
import urls from './modules/constants/urls';
import defaultMiddleware from './modules/middleware/init_middleware';
import { www404, api404, staticcdn404, js404, css404, images404, setup404, ecs404, ti404 } from './modules/middleware/404';
import Startup from './library/startup';
import express from 'express';

(async () => {
	await clearCachedSessions();

	const www = express();
	const staticcdn = express();
	const js = express();
	const css = express();
	const images = express();
	const setup = express();
	const api = express();
	const ephemeralcounters = express();
	const temp_images = express();

	www.use(defaultMiddleware);
	staticcdn.use(defaultMiddleware);
	js.use(defaultMiddleware);
	css.use(defaultMiddleware);
	images.use(defaultMiddleware);
	setup.use(defaultMiddleware);
	api.use(defaultMiddleware);
	ephemeralcounters.use(defaultMiddleware);
	temp_images.use(defaultMiddleware);

	await Startup.Configure(mapconfig(staticcdn, '\\static', '\\lib\\controllers\\static', urls['staticcdn']));
	await Startup.Configure(mapconfig(js, '\\lib\\js', '\\lib\\controllers\\js', urls['js']));
	await Startup.Configure(mapconfig(css, '\\css', '\\lib\\controllers\\css', urls['css']));
	await Startup.Configure(mapconfig(images, '\\images', '\\lib\\controllers\\images', urls['images']));
	await Startup.Configure(mapconfig(api, '\\api', '\\lib\\controllers\\api', urls['api']));
	await Startup.Configure(mapconfig(setup, '\\setup', '\\lib\\controllers\\setup', urls['setup']));
	await Startup.Configure(mapconfig(www, '\\www', '\\lib\\controllers\\www', urls['www'], true));
	await Startup.Configure(mapconfig(ephemeralcounters, '\\ecs', '\\lib\\controllers\\ecs', urls['ephemeralcounters']));
	await Startup.Configure(mapconfig(temp_images, '\\temp', '\\lib\\controllers\\temp', urls['temporary_images']));

	api.use(api404);
	staticcdn.use(staticcdn404);
	js.use(js404);
	css.use(css404);
	images.use(images404);
	setup.use(setup404);
	www.use(www404);
	ephemeralcounters.use(ecs404);
	temp_images.use(ti404);

	await (async () => {
		try {
			mapssl(images, urls['images']);
			const [wwwHttp, wwwHttps] = mapssl(www, urls['www']);
			const [apiHttp, apiHttps] = mapssl(api, urls['api']);
			mapssl(staticcdn, urls['staticcdn']);
			mapssl(js, urls['js']);
			mapssl(css, urls['css']);
			mapssl(setup, urls['setup']);
			mapssl(temp_images, urls['temporary_images']);
			const [ecsHttp, ecsHttps] = mapssl(ephemeralcounters, urls['ephemeralcounters']);
			await mapwss(apiHttp, apiHttps, '\\lib\\sockets\\api', urls['api']);
			await mapwss(wwwHttp, wwwHttps, '\\lib\\sockets\\www', urls['www']);
			await mapwss(ecsHttp, ecsHttps, '\\lib\\sockets\\ecs', urls['ephemeralcounters']);
		} catch (e) {
			throw new Error(e);
		}
	})();
})();
