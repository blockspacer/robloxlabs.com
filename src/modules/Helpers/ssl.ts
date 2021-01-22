/*
	FileName: ssl.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: Wrapper for SSL servers and HTTP servers, used as a helper.

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

import https2 from 'spdy';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import dotenv from 'dotenv';
import { _dirname, _sslname } from '../constants/directories';
import filestream from 'fs';
import { FASTLOG3, FLog } from './Log';

dotenv.config({ path: _dirname + '\\.env' });
export = (app: IApplicationBuilder, name: string): [HttpServer, HttpsServer] => {
	try {
		const httpsServer = https2
			.createServer(
				{
					cert: filestream.readFileSync(_sslname + '\\sitetest1.mfdlabs.crt', 'utf-8'),
					key: filestream.readFileSync(_sslname + '\\mfdlabsprivate.key', 'utf-8'),
					passphrase: process.env['mfdlabs_pc'],
					maxVersion: 'TLSv1.3',
					minVersion: 'TLSv1.3',
				},
				app,
			)
			.listen(443, name, () => FASTLOG3(FLog[name], `https://${name}:443 started.`));
		const httpServer = app.listen(80, name, () => FASTLOG3(FLog[name], `http://${name}:80 started.`));
		return [httpServer, httpsServer];
	} catch (err) {
		throw new Error(err);
	}
};
