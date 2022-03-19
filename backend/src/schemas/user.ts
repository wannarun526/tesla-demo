import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
    _id: Schema.Types.ObjectId;
    custId: string;
    password: string;
	name: string;
	cellphone: string;
    email: string;
    gender: "male" | "female";
    birthdate: Date;
    role: "user" | "partner";
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const UserSchema = new Schema<User>({
    custId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cellphone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    birthdate: { type: Date, require: true },
    role: { type: String, required: true, enum: ['user', 'partner'] },
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
