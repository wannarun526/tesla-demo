import { model, Schema } from 'mongoose';

// Document interface
export interface User {
	name: string;
	email: string;
}

// Schema
const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

export const UserModel = model<User>("User", UserSchema);
