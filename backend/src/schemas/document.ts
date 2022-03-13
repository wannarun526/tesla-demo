import { model, Schema } from 'mongoose';

export interface Document {
    _id: Schema.Types.ObjectId;
    fileType: "id01" | "id02" | "dl01" | "dl02";
    path: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const DocumentSchema = new Schema<Document>({
    fileType: { type: String, required: true, enum: ["id01", "id02", "dl01", "dl02"] },
    path: { type: String, required: true },
},
{   
    versionKey: false, 
    timestamps: true,
});

export const DocumentModel = model<Document>("Document", DocumentSchema);