import { Response } from 'express';
import { PointsClient } from '../../../ApiClients/Roblox.Points.Client/Implementation/PointsClient';
import { Task } from '../../../Http/Task';
import { ICustomError } from '../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { IUser } from '../../../Platform/Membership/IUser';
import { User } from '../../../Platform/Membership/User';
import { IUniverse } from '../../../Platform/Universes/IUniverse';
import { Universe } from '../../../Platform/Universes/Universe';
import { Errors } from '../../Util/Roblox.Web.Util/Errors';

export namespace PointsRequestProcessor {
	/**
	 * Gets a user's all-time points balance from an universe.
	 * @param {IUniverse} universe The universe. TODO: Should this be an IUniverse here and on the ApiClient, or just the ApiClient?
	 * @param {IUser} user The user. TODO: Should this be an IUser here and on the ApiClient, or just the ApiClient?
	 * @returns {Task<[Boolean, Number, String]>} OK
	 */
	export async function GetUserAllTimePoints(universe: IUniverse, user: IUser): Task<[Boolean, Number, any, Error]> {
		return new Promise<[Boolean, Number, any, Error]>(async (resumeFunction) => {
			const [WasRequestSuccessful, StatusCode, Response, Error] = await PointsClient.GetUserAllTimePoints(user, universe);
			return resumeFunction([WasRequestSuccessful, StatusCode, Response, Error]);
		});
	}

	export async function CheckUniverseAndUser(universeId: number, userId: number, response: Response): Task<[boolean, IUniverse, IUser]> {
		// NaN check.
		const errors: ICustomError[] = [];
		if (isNaN(universeId)) {
			errors.push({
				code: 1,
				message: 'The universe is invalid.',
				userFacingMessage: 'Something went wrong',
			});
			Errors.RespondWithCustomErrors(404, errors, response, true);
			return [false, null, null];
		}
		if (isNaN(userId)) {
			errors.push({
				code: 2,
				message: 'The user is invalid.',
				userFacingMessage: 'Something went wrong',
			});
			Errors.RespondWithCustomErrors(404, errors, response, true);
			return [false, null, null];
		}

		const user: IUser = await User.GetById(userId);
		const universe: IUniverse = await Universe.GetById(universeId);
		if (universe === null) {
			errors.push({
				code: 1,
				message: 'The universe is invalid.',
				userFacingMessage: 'Something went wrong',
			});
			Errors.RespondWithCustomErrors(404, errors, response, true);
			return [false, null, null];
		}

		if (user === null) {
			errors.push({
				code: 2,
				message: 'The user is invalid.',
				userFacingMessage: 'Something went wrong',
			});
			Errors.RespondWithCustomErrors(404, errors, response, true);
			return [false, null, null];
		}
		return [true, universe, user];
	}
}
