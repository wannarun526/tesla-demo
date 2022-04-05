import { Response } from 'express';
import mime from 'mime';
import nodemailer from 'nodemailer';
import path from 'path';
import { v4 } from 'uuid';
import { FileUploadDto } from '../controllers/file.validate';
const fs = require('fs');

interface Error {
	message: string
}

export interface Email{
	to: string;
	subject: string;
	html: string;
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
	async sendMail(emailInfo: Email) {
		const transporter = nodemailer.createTransport({
			host: process.env.MAILGUN_HOST,
			port: 587,
			secure: false,
			requireTLS: true,
			auth: {
				user: process.env.MAILGUN_USER,
				pass: process.env.MAILGUN_PASS,
			},
			logger: true
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: "support <support@fudian.com>",
			to: emailInfo.to,
			subject: emailInfo.subject,
			html: emailInfo.html,
		});

		console.log("Message sent: %s", info.response);
	}

	/**
	 * handle upload file
	 */
	async uploadFile(uploadFile: FileUploadDto) {
		let imageBuffer = Buffer.from(uploadFile.docContent, 'base64');
		let extTemp = uploadFile.docName.split('.');
		extTemp.shift();
		const fileExt = extTemp.length === 0 ? "" : "." + extTemp.join(".");
		const finalName = v4() + fileExt;
		const fileType = uploadFile.docType === "av01" ? "avatars" : "documents";
        const storePath = path.resolve(__dirname, '../', '../', 'uploads', fileType, finalName)
		fs.writeFileSync(storePath, imageBuffer, 'utf8');
		return `uploads/${fileType}/${finalName}`;
	}
}
export default Utility;
