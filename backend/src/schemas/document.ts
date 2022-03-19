import { model, Schema } from 'mongoose';

export interface Document {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    fileType: "id01" | "id02" | "dl01" | "dl02";
    path: string;
    originFileName: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const DocumentSchema = new Schema<Document>({
    userId: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    fileType: { type: String, required: true, enum: ["id01", "id02", "dl01", "dl02"] },
    path: { type: String, required: true },
    originFileName: {type: String, required: true},
},
{   
    versionKey: false, 
    timestamps: true,
});

export const DocumentModel = model<Document>("Document", DocumentSchema);
