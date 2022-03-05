import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
    _id: Schema.Types.ObjectId;
    account: string;
    password: string;
	name: string;
	cellphone: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const UserSchema = new Schema<User>({
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cellphone: { type: String, required: true },
},
{   
    versionKey: false, 
    timestamps: true 
});

UserSchema.pre('save', function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
    return this;
})

export const UserModel = model<User>("User", UserSchema);
