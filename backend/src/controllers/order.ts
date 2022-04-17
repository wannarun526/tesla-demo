import { Request, Response } from "express";
import { OrderCreateReq } from "../models/order";
import { CarModel } from "../schemas/car";
import { OrderModel } from "../schemas/order";
import { BaseController } from "./base";

class OrderController extends BaseController {
    create = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any;
            const body: OrderCreateReq = req.body;

            // 1.檢核車子是否存在且通過審核
            const car = await CarModel.findById(body.carId);
            if(car?.status !== "approved"){
                throw new Error("所選車輛異常");
            }

            // 2.檢核所選車輛是否已預訂
            const orderedCar = await OrderModel.findOne({ 
                car: body.carId, 
                $or:[ 
                    {startDate: { $gte: body.startDate, $lte: body.endDate }}, 
                    {endDate: { $gte: body.startDate, $lte: body.endDate }}
                ]
            })
            if(orderedCar){
                throw new Error("所選車輛已被預訂");
            }

            // 3. 新增訂單
            const newOrder = await new OrderModel({
                car: body.carId,
                user: user._id,
                location: body.location,
                startDate: body.startDate,
                endDate: body.endDate,
            }).save();

            console.log(newOrder);

            return this.util.handleSuccess<null>(resp, null);
        } catch (error: any) {
            return this.util.handleError(resp, error);
        }
    };

    
}
export default OrderController;
