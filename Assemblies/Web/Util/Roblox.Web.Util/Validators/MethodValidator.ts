import { Response } from 'express';
import { HttpRequestMethodEnum } from '../../../../Http/ServiceClient/HttpRequestMethodEnum';
import { ICustomError } from '../../../../Platform/ErrorModels/Roblox.Platform.ErrorModels/CustomError';
import { Errors } from '../Errors';

export namespace MethodValidator {
	/**
	 * Checks if the request method matches the given {methodToValidate} for the MethodValidator.
	 *
	 * @param {string} originalMethod The original request method, to be converted to lowercase etc.
	 * @param {string} methodToValidate The method to validate.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @returns {[boolean, HttpRequestMethodEnum]} Returns true if the request method verb matches any of the given methods below.
	 */
	export function CheckMethod(originalMethod: string, methodToValidate: string, response: Response): [boolean, HttpRequestMethodEnum] {
		return CheckMethods(originalMethod, [methodToValidate], response);
	}

	/**
	 * Checks if the request method matches the given {methodsToValidate} for the MethodValidator.
	 *
	 * @param {string} originalMethod The original request method, to be converted to lowercase etc.
	 * @param {string[]} methodsToValidate The methods to validate.
	 * @param {Response} response A response to pass in to be injected into the {Roblox.Web.Util.Errors}.
	 * @returns {[boolean, HttpRequestMethodEnum]} Returns true if the request method verb matches any of the given methods below.
	 */
	export function CheckMethods(
		originalMethod: string,
		methodsToValidate: string[],
		response: Response,
	): [boolean, HttpRequestMethodEnum] {
		const errors: ICustomError[] = [];
		originalMethod = originalMethod.toLowerCase();
		if (originalMethod === 'options') return [true, HttpRequestMethodEnum.OPTIONS];
		let methodIsValid = false;
		let requestMethod = HttpRequestMethodEnum.GET;
		methodsToValidate.every((method) => {
			method = method.toLowerCase();
			if (method === originalMethod) {
				methodIsValid = true;
				switch (originalMethod) {
					case 'post':
						requestMethod = HttpRequestMethodEnum.POST;
						break;
					case 'put':
						requestMethod = HttpRequestMethodEnum.PUT;
						break;
					case 'delete':
						requestMethod = HttpRequestMethodEnum.DELETE;
						break;
					case 'head':
						requestMethod = HttpRequestMethodEnum.HEAD;
						break;
					case 'patch':
						requestMethod = HttpRequestMethodEnum.PATCH;
						break;
					default:
						requestMethod = <HttpRequestMethodEnum>(<unknown>'Unknown');
						break;
				}
				return false;
			}
			return true;
		});
		if (!methodIsValid) {
			errors.push({ code: 0, message: `The requested resource does not support http method '${originalMethod.toUpperCase()}'.` });
			Errors.RespondWithCustomErrors(405, errors, response, true);
			return [false, null];
		}
		return [true, requestMethod];
	}
}
