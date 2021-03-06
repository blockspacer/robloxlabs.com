import { __baseDirName } from '../../../Util/Directories';
import filestream from 'fs';

export const CheckIfPlaceExists = (placeId: number): boolean => {
	const placePath = __baseDirName + '\\DataBase\\places\\' + placeId;
	if (!filestream.existsSync(placePath)) {
		return false;
	}
	return true;
};
