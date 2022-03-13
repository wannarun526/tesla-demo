import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
    _id: Schema.Types.ObjectId;
    custId: string;
    password: string;
	name: string;
	cellphone: string;
    email: string;
    gender: "Male" | "Female";
    birthdate: Date;
    id01: Schema.Types.ObjectId;
    id02: Schema.Types.ObjectId;
    dl01: Schema.Types.ObjectId;
    dl02: Schema.Types.ObjectId;
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
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    birthdate: { type: Date, require: true },
    id01: { type: Schema.Types.ObjectId, require: true, ref: 'Document' },
    id02: { type: Schema.Types.ObjectId, require: true, ref: 'Document' },
    dl01: { type: Schema.Types.ObjectId, require: true, ref: 'Document' },
    dl02: { type: Schema.Types.ObjectId, require: true, ref: 'Document' },
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
