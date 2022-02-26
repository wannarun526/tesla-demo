import { Response } from 'express';


interface Error {
	message: string
}

class Utility{
	/**
	 * Model save method Handler
	 */
	async saveHandle<T>(model: any): Promise<T> {
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
	handleSuccess<T>(resp: Response, data: T) {
		const result = {
			data: data,
			errorMsg: "0000",
		}
		resp.status(200).json(result)
	}

	/**
	 * Handles error by printing to console in development env and builds and sends an error response
	 */
	handleError(resp: Response, err: Error) {
		const result = {
			data: null,
			errorMsg: err?.message,
		}
		resp.status(400).json(result)
	}
}
export default Utility;
