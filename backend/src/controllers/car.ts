import { Request, Response } from 'express';
import { CarModel } from '../schemas/car';
import { BaseController } from './base';
import { CarCreateReq, CarCreateResp, CarListResp } from '../models/car';
import { FileModel } from '../schemas/file';

class CarController extends BaseController {

    create = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;
            const body: CarCreateReq = req.body;

            const newCar = await new CarModel({ 
                ownerId: user._id,
                model: body.model,
                chargeType: body.chargeType,
                spec: body.spec,
                year: body.year,
                season: body.season,
                carNumber: body.carNumber,
                insuranceStartDate: body.insuranceStartDate,
                insuranceEndDate: body.insuranceEndDate,
                replaceValue: body.replaceValue,
                insuranceCompany: body.insuranceCompany,
                insuranceType: body.insuranceType,
                sumAssured: body.sumAssured,
            }).save();

            return this.util.handleSuccess<CarCreateResp>(resp, { carId: newCar._id.toString() });
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }

    list = async(req: Request, resp: Response) => {
        try{
            const user = req.user as any;

            const cars = await CarModel.find({ ownerId: user._id })
                .sort({ createdAt: 1 })
                .populate({ path: "vl01", select: "path" })
                .populate({ path: "vl02", select: "path" })
                .populate({ path: "car01", select: "path" })
                .populate({ path: "car02", select: "path" })
                .populate({ path: "car03", select: "path" })
                .populate({ path: "car04", select: "path" })
                .populate({ path: "car05", select: "path" })
                .populate({ path: "car06", select: "path" })
                .populate({ path: "car07", select: "path" })
                .populate({ path: "car08", select: "path" })
                .populate({ path: "car09", select: "path" });

            console.log("cars: ", cars);
            const result: Array<CarListResp> = cars.map(car => ({
                    model: car.model,
                    chargeType: car.chargeType,
                    spec: car.spec,
                    year: car.year,
                    season: car.season,
                    carNumber: car.carNumber,
                    insuranceStartDate: car.insuranceStartDate,
                    insuranceEndDate: car.insuranceEndDate,
                    replaceValue: car.replaceValue,
                    insuranceCompany: car.insuranceCompany,
                    insuranceType: car.insuranceType,
                    sumAssured: car.sumAssured,
                    vl01: { docPath: car.vl01.path, base64: null},
                    vl02: { docPath: car.vl02.path, base64: null},
                    car01: { docPath: car.car01.path, base64: null},
                    car02: { docPath: car.car02.path, base64: null},
                    car03: { docPath: car.car03.path, base64: null},
                    car04: { docPath: car.car04.path, base64: null},
                    car05: { docPath: car.car05.path, base64: null},
                    car06: { docPath: car.car06.path, base64: null},
                    car07: { docPath: car.car07.path, base64: null},
                    car08: { docPath: car.car08.path, base64: null},
                    car09: { docPath: car.car09.path, base64: null},
                })
            );

            return this.util.handleSuccess<Array<CarListResp>>(resp, result);
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }
}
export default CarController;
