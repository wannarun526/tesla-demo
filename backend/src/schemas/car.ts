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
    vl01: Schema.Types.ObjectId;
    vl02: Schema.Types.ObjectId;
    car01: Schema.Types.ObjectId;
    car02: Schema.Types.ObjectId;
    car03: Schema.Types.ObjectId;
    car04: Schema.Types.ObjectId;
    car05: Schema.Types.ObjectId;
    car06: Schema.Types.ObjectId;
    car07: Schema.Types.ObjectId;
    car08: Schema.Types.ObjectId;
    car09: Schema.Types.ObjectId;
    status: "pending" | "approved" | "failed";
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
    vl01: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    vl02: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car01: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car02: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car03: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car04: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car05: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car06: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car07: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car08: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    car09: { type: Schema.Types.ObjectId, required: false, ref: 'File'},
    status: { type: String, required: true, enum: ["pending", "approved", "failed"]},
},
{   
    versionKey: false, 
    timestamps: true,
});

export const CarModel = model<Car>("Car", CarSchema);
