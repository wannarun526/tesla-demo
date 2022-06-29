import { Request, Response } from 'express'
import { CarModel } from '../schemas/car'
import { BaseController } from './base'
import { CarCreateReq, CarCreateResp, CarListResp, CarListUnorderedReq } from '../models/car'
import moment from 'moment'

/**
 * 租車相關
 */
class CarController extends BaseController {
    /**
     * 租車夥伴新增車輛
     */
    create = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any
            const body: CarCreateReq = req.body

            const newCar = await new CarModel({
                ownerId: user._id,
                model: body.model,
                chargeType: body.chargeType,
                spec: body.spec,
                year: body.year,
                season: body.season,
                carNumber: body.carNumber,
                carPrice: body.carPrice,
                sumAssured: body.sumAssured,
                insuranceArray: body.insuranceArray,
                status: 'pending',
                vl01: null,
                vl02: null,
                car01: null,
                car02: null,
                car03: null,
                car04: null,
                car05: null,
                car06: null,
                car07: null,
                car08: null,
                car09: null,
                carInsurancePDF: null,
            }).save()

            return this.util.handleSuccess<CarCreateResp>(resp, { carId: newCar._id.toString() })
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 列出該租車夥伴已新增車輛
     */
    list = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any

            const cars = await CarModel.find({ ownerId: user._id })
                .sort({ createdAt: 1 })
                .populate([
                    { path: 'ownerId', select: 'name cellphone' },
                    { path: 'vl01', select: 'path' },
                    { path: 'vl02', select: 'path' },
                    { path: 'car01', select: 'path' },
                    { path: 'car02', select: 'path' },
                    { path: 'car03', select: 'path' },
                    { path: 'car04', select: 'path' },
                    { path: 'car05', select: 'path' },
                    { path: 'car06', select: 'path' },
                    { path: 'car07', select: 'path' },
                    { path: 'car08', select: 'path' },
                    { path: 'car09', select: 'path' },
                    { path: 'carInsurancePDF', select: 'path' },
                ])

            const result: Array<CarListResp> = cars.map((car) => {
                const owner = car.ownerId as any

                return {
                    id: car._id.toString(),
                    model: car.model,
                    chargeType: car.chargeType,
                    spec: car.spec,
                    year: car.year,
                    season: car.season,
                    carNumber: car.carNumber,
                    carPrice: car.carPrice,
                    sumAssured: car.sumAssured,
                    insuranceArray: car.insuranceArray,
                    vl01: { docPath: car.vl01.path, base64: null },
                    vl02: { docPath: car.vl02.path, base64: null },
                    car01: { docPath: car.car01?.path, base64: null },
                    car02: { docPath: car.car02?.path, base64: null },
                    car03: { docPath: car.car03?.path, base64: null },
                    car04: { docPath: car.car04?.path, base64: null },
                    car05: { docPath: car.car05?.path, base64: null },
                    car06: { docPath: car.car06?.path, base64: null },
                    car07: { docPath: car.car07?.path, base64: null },
                    car08: { docPath: car.car08?.path, base64: null },
                    car09: { docPath: car.car09?.path, base64: null },
                    carInsurancePDF: { docPath: car.carInsurancePDF?.path, base64: null },
                    status: car.status,
                    owner: {
                        id: owner._id.toString(),
                        name: owner.name,
                        cellphone: owner.cellphone,
                    },
                }
            })

            return this.util.handleSuccess<Array<CarListResp>>(resp, result)
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 列出所有未預約車輛
     */
    listUnordered = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any
            const body: CarListUnorderedReq = req.body

            if (moment(body.startDate).isSameOrAfter(body.endDate)) {
                throw new Error('租借時間有誤')
            }

            // 1. 取得所有車輛
            const cars = await CarModel.aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        as: 'orders',
                        localField: '_id',
                        foreignField: 'car',
                    },
                },
            ])

            const filterCars = cars?.filter(
                (car) =>
                    car.ownerId.toString() !== user._id.toString() &&
                    car.status === 'approved' &&
                    car.orders.filter(
                        (order: any) =>
                            moment(body.startDate).isBetween(order.startDate, order.endDate) ||
                            moment(body.startDate).isSame(order.startDate) ||
                            moment(body.endDate).isBetween(order.startDate, order.endDate) ||
                            moment(body.endDate).isSame(order.endDate)
                    ).length === 0
            )

            const populatedCars = await CarModel.populate(filterCars, [
                { path: 'ownerId', select: 'name cellphone' },
                { path: 'vl01', select: 'path' },
                { path: 'vl02', select: 'path' },
                { path: 'car01', select: 'path' },
                { path: 'car02', select: 'path' },
                { path: 'car03', select: 'path' },
                { path: 'car04', select: 'path' },
                { path: 'car05', select: 'path' },
                { path: 'car06', select: 'path' },
                { path: 'car07', select: 'path' },
                { path: 'car08', select: 'path' },
                { path: 'car09', select: 'path' },
                { path: 'carInsurancePDF', select: 'path' },
            ])

            const result: Array<CarListResp> = populatedCars.map((car) => {
                const owner = car.ownerId as any

                return {
                    id: car._id.toString(),
                    model: car.model,
                    chargeType: car.chargeType,
                    spec: car.spec,
                    year: car.year,
                    season: car.season,
                    carNumber: car.carNumber,
                    carPrice: car.carPrice,
                    sumAssured: car.sumAssured,
                    insuranceArray: car.insuranceArray,
                    vl01: { docPath: car.vl01.path, base64: null },
                    vl02: { docPath: car.vl02.path, base64: null },
                    car01: { docPath: car.car01?.path, base64: null },
                    car02: { docPath: car.car02?.path, base64: null },
                    car03: { docPath: car.car03?.path, base64: null },
                    car04: { docPath: car.car04?.path, base64: null },
                    car05: { docPath: car.car05?.path, base64: null },
                    car06: { docPath: car.car06?.path, base64: null },
                    car07: { docPath: car.car07?.path, base64: null },
                    car08: { docPath: car.car08?.path, base64: null },
                    car09: { docPath: car.car09?.path, base64: null },
                    carInsurancePDF: { docPath: car.carInsurancePDF?.path, base64: null },
                    status: car.status,
                    owner: {
                        id: owner._id.toString(),
                        name: owner.name,
                        cellphone: owner.cellphone,
                    },
                }
            })

            return this.util.handleSuccess<Array<CarListResp>>(resp, result)
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 列出所有新加入車輛
     */
    listPendings = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any

            // 驗證權限
            if (!user.role.admin) {
                throw new Error('無權限查詢')
            }

            // 1. 取得所有車輛
            const populatedCars = await CarModel.find({ status: 'pending' }).populate([
                { path: 'ownerId', select: 'name cellphone' },
                { path: 'vl01', select: 'path' },
                { path: 'vl02', select: 'path' },
                { path: 'car01', select: 'path' },
                { path: 'car02', select: 'path' },
                { path: 'car03', select: 'path' },
                { path: 'car04', select: 'path' },
                { path: 'car05', select: 'path' },
                { path: 'car06', select: 'path' },
                { path: 'car07', select: 'path' },
                { path: 'car08', select: 'path' },
                { path: 'car09', select: 'path' },
                { path: 'carInsurancePDF', select: 'path' },
            ])

            console.log(populatedCars)

            const result: Array<CarListResp> = populatedCars.map((car) => {
                const owner = car.ownerId as any
                return {
                    id: car._id.toString(),
                    model: car.model,
                    chargeType: car.chargeType,
                    spec: car.spec,
                    year: car.year,
                    season: car.season,
                    carNumber: car.carNumber,
                    carPrice: car.carPrice,
                    sumAssured: car.sumAssured,
                    insuranceArray: car.insuranceArray,
                    vl01: { docPath: car.vl01.path, base64: null },
                    vl02: { docPath: car.vl02.path, base64: null },
                    car01: { docPath: car.car01?.path, base64: null },
                    car02: { docPath: car.car02?.path, base64: null },
                    car03: { docPath: car.car03?.path, base64: null },
                    car04: { docPath: car.car04?.path, base64: null },
                    car05: { docPath: car.car05?.path, base64: null },
                    car06: { docPath: car.car06?.path, base64: null },
                    car07: { docPath: car.car07?.path, base64: null },
                    car08: { docPath: car.car08?.path, base64: null },
                    car09: { docPath: car.car09?.path, base64: null },
                    carInsurancePDF: { docPath: car.carInsurancePDF?.path, base64: null },
                    status: car.status,
                    owner: {
                        id: owner._id.toString(),
                        name: owner.name,
                        cellphone: owner.cellphone,
                    },
                }
            })

            return this.util.handleSuccess<Array<CarListResp>>(resp, result)
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }
}
export default CarController
