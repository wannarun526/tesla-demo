import { model, Schema } from 'mongoose';

export interface Car {
    _id: Schema.Types.ObjectId;
    ownerId: Schema.Types.ObjectId;
    model: "Model 3" | "Model X" | "Model S";
    chargeType: "CCS2" | "TPC";
    spec: "SR" | "LR" | "P";
    year: number;
    season: 1 | 2 | 3 | 4;
    carNumber: string;
    insuranceStartDate: Date;
    insuranceEndDate: Date;
    replaceValue: number;
    insuranceCompany: string;
    insuranceType: string;
    sumAssured: number;
    createdAt: Date;
    updatedAt: Date;
}

// Schema
const CarSchema = new Schema<Car>({
    ownerId: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    model: { type: String, required: true, enum: ["Model 3", "Model X", "Model S"] },
    chargeType: { type: String, required: true, enum: ["CCS2", "TPC"] },
    spec: { type: String, required: true, enum: ["SR", "LR", "P"] },
    year: { type: Number, required: true },
    season: { type: Number, required: true, enum: [1, 2, 3, 4] },
    carNumber: { type: String, required: true },
    insuranceStartDate: { type: Date, required: true },
    insuranceEndDate: { type: Date, required: true },
    replaceValue: { type: Number, required: true },
    insuranceCompany: { type: String, required: true },
    insuranceType: { type: String, required: true },
    sumAssured: { type: Number, required: true },
},
{   
    versionKey: false, 
    timestamps: true,
});

export const CarModel = model<Car>("Car", CarSchema);
