import filestream from 'fs';
import { __baseDirName } from '../../../Util/Directories';

export const WriteToManifest = (
	userId: string,
	field: string,
	value: unknown,
	pushIfArray?: boolean,
	popIfUndefined?: boolean,
	index?: number,
	spliceIfIndex?: boolean,
	createIfDoesntExist?: boolean,
) => {
	let user;
	try {
		user = JSON.parse(filestream.readFileSync(__baseDirName + `\\DataBase\\users\\${userId}.json`, { encoding: 'utf-8' }));
	} catch (e) {
		return e;
	}
	if (user) {
		if (!createIfDoesntExist && user[field] !== null && !user[field]) return "The field doesn't exist";
		else {
			if (Array.isArray(user[field])) {
				if (spliceIfIndex && index && value === undefined) {
					user[field].splice(index, 1);
					if (!user[field]) user[field] = [];
				} else if (pushIfArray && !popIfUndefined) {
					user[field].push(value);
					if (!user[field]) user[field] = [];
				} else if (popIfUndefined && value === undefined) {
					user[field].pop();
					if (!user[field]) user[field] = [];
				} else {
					user[field] = value;
					if (!user[field]) user[field] = [];
				}
			} else {
				user[field] = user;
			}
		}
	}
	return filestream.writeFileSync(__baseDirName + `\\DataBase\\users\\${userId}.json`, JSON.stringify(user, undefined, 4), {
		encoding: 'utf-8',
	});
};
