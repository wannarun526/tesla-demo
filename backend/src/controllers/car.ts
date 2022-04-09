import { Request, Response } from 'express';
import { CarModel } from '../schemas/car';
import { BaseController } from './base';
import { CarCreateReq, CarCreateResp } from '../models/car';

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
}
export default CarController;
