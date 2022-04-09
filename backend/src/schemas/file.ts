import { model, Schema } from 'mongoose';

export interface UploadFile {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    carId: Schema.Types.ObjectId;
    fileType: "id01" | "id02" | "dl01" | "dl02" | "av01" | "vl01" | "vl02" | "car01" | "car02" | "car03" | "car04" | "car05" | "car06" | "car07" | "car08" | "car09";
    path: string;
    originFileName: string;
    mimeType: string,
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const FileSchema = new Schema<UploadFile>({
    userId: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    carId: { type: Schema.Types.ObjectId, require: false, ref: 'Car' },
    fileType: { type: String, required: true, enum: ["id01", "id02", "dl01", "dl02", "av01", "vl01", "vl02", "car01", "car02", "car03", "car04", "car05", "car06", "car07", "car08", "car09"] },
    path: { type: String, required: true },
    originFileName: {type: String, required: true},
    mimeType: { type: String, required: true},
},
{   
    versionKey: false, 
    timestamps: true,
});

export const FileModel = model<UploadFile>("File", FileSchema);
