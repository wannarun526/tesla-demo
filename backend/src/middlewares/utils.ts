import { Response } from 'express';
import mime from 'mime';
import nodemailer from 'nodemailer';
import path from 'path';
import { v4 } from 'uuid';
const fs = require('fs');

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

	
	/**
	 * handle sending email
	 */
	async sendMail() {
		const transporter = nodemailer.createTransport({
			host: "hostname",
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: "username",
				pass: "password",
			},
			logger: true
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Sender Name" <from@example.net>',
			to: "to@example.com",
			subject: "Hello from node",
			text: "Hello world?",
			html: "<strong>Hello world?</strong>",
			headers: { 'x-myheader': 'test header' }
		});

		console.log("Message sent: %s", info.response);
	}

	/**
	 * handle upload file
	 */
	async uploadFile(fileBase64: string, fileName: string) {
		let imageBuffer = Buffer.from(fileBase64, 'base64');
		let extTemp = fileName.split('.');
		extTemp.shift();
		const fileExt = extTemp.length === 0 ? "" : "." + extTemp.join(".");
		const finalName = v4() + fileExt;
        const storePath = path.resolve(__dirname, '../', '../', 'uploads', 'documents', finalName)
		fs.writeFileSync(storePath, imageBuffer, 'utf8');
		return finalName;
	}
}
export default Utility;
