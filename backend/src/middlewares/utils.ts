import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { ApiResult } from '../models/common';

class Utility{
	
	/**
	 * Builds error for validation files
	 */
	validateResult(req: Request, res: Response, next: NextFunction){
		
		const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
			// Build your resulting errors however you want! String, object, whatever - it works!
			return `[${param}]: ${msg}`;
		};
		const result = validationResult(req).formatWith(errorFormatter);

		if (!result.isEmpty()) {
			return res.json({ errors: result.array()[0] });
		}
		
		next();
	}

	/**
	 * Model save method Handler
	 */
	async saveHandle(model: any) {
		return new Promise((resolve, reject) => {
			model.save((error: any, item: any) => {
				if (error) {
					reject(error)
				}
				resolve(item)
			})
		})
	}

	/**
	 * Handles success
	 */
	handleSuccess(resp: Response, data: any) {
		const result = {
			data: data,
			errorMsg: "0000",
		}
		resp.status(200).json(result)
	}

	/**
	 * Handles error by printing to console in development env and builds and sends an error response
	 */
	handleError(resp: Response, err: any) {
		const result: ApiResult<null> = {
			data: null,
			errorMsg: err?.message,
		}
		resp.status(400).json(result)
	}
}
export default Utility;
