import { Task } from '../../../Http/Task';
import { IDataStoreApiResponse } from '../../../Platform/GamePersistence/IDataStoreApiResponse';
import { IDataStoreRequest } from '../../../Platform/GamePersistence/IDataStoreRequest';
export namespace GamePeristenceRequestProcessor {
	/**
	 * Fetches all DataStores for the universe specified in IDataStoreRequest.
	 * @param {IDataStoreRequest} Request The request to use
	 * @param {Boolean} RequireSecureUri Should it use a SSL version of gamepersistence.api
	 * @returns {Task<[Boolean, IDataStoreApiResponse]>} Returns a Task that describes whether or not the request succeeded or failed
	 */
	export async function GetDataStoresForTheUniverse(Request: IDataStoreRequest): Task<[Boolean, IDataStoreApiResponse]> {
		return new Promise<[Boolean, IDataStoreApiResponse]>((resumeFunction) => {});
	}
}
