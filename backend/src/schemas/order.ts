import { model, Schema } from 'mongoose';

export interface Order {
    _id: Schema.Types.ObjectId;
    car: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    location: string;
    startDate: Date;
    endDate: Date;
}

// Schema
const OrderSchema = new Schema<Order>({
    car: { type: Schema.Types.ObjectId, require: true, ref: 'Car' },
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    location: { type: String, require: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
},
{   
    versionKey: false, 
    timestamps: true,
});

export const OrderModel = model<Order>("Order", OrderSchema);
