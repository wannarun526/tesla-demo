import { model, Schema } from 'mongoose';

// Document interface
export interface UserLogin {
    access_Token: string;
}
export interface User {
    _id: Schema.Types.ObjectId;
    account: string;
	name: string;
	cellphone: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const UserSchema = new Schema<User>({
    account: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cellphone: { type: String, required: true },
},
{   
    versionKey: false, 
    timestamps: true 
});

export const UserModel = model<User>("User", UserSchema);
