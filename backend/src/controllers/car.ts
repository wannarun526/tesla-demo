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

            const cars = await CarModel.find({ ownerId: user._id });
            const carFiles = await FileModel.find({ userId: user._id });

            const result: Array<CarListResp> = cars.map(car => {

                return {
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
                    carPics: carFiles
                        .filter(carfile => carfile.carId === car._id )
                        .map(file => ({
                                docType: 
                                    file.fileType === "vl01" ||
                                    file.fileType === "vl02" ||
                                    file.fileType === "car01" ||
                                    file.fileType === "car02" ||
                                    file.fileType === "car03" ||
                                    file.fileType === "car04" ||
                                    file.fileType === "car05" ||
                                    file.fileType === "car06" ||
                                    file.fileType === "car07" ||
                                    file.fileType === "car08" ||
                                    file.fileType === "car09" ? 
                                    file.fileType : "vl01",
                                docPath: file.path,
                        })),
                }
            });

            return this.util.handleSuccess<Array<CarListResp>>(resp, result);
        }catch(error: any){
            return this.util.handleError(resp, error)
        }
    }
}
export default CarController;
