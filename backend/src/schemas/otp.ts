import { model, Schema } from 'mongoose';

export interface OTP {
    _id: Schema.Types.ObjectId;
	cellphone: string;
    verifyCode: string;
    errorCount: number;
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const OTPSchema = new Schema<OTP>({
    cellphone: { type: String, required: true },
    verifyCode: { type: String, required: true },
    errorCount: { type: Number, required: true },
},
{   
    versionKey: false, 
    timestamps: true,
});

export const OTPModel = model<OTP>("OTP", OTPSchema);
