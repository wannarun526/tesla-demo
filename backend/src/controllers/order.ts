import { Request, Response } from 'express'
import { OrderCreateReq, OrderListMyOrdersResp } from '../models/order'
import { Car, CarModel } from '../schemas/car'
import { OrderModel } from '../schemas/order'
import { BaseController } from './base'

/**
 * 訂單
 */
class OrderController extends BaseController {
    /**
     * 新增訂單
     */
    create = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any
            const body: OrderCreateReq = req.body

            // 1.檢核車子是否存在且通過審核
            const car = await CarModel.findById(body.carId)
            if (car?.status !== 'approved') {
                throw new Error('所選車輛異常')
            }

            // 2.檢核所選車輛是否已預訂
            const orderedCar = await OrderModel.findOne({
                car: body.carId,
                $or: [
                    { startDate: { $gte: body.startDate, $lte: body.endDate } },
                    { endDate: { $gte: body.startDate, $lte: body.endDate } },
                ],
            })
            if (orderedCar) {
                throw new Error('所選車輛已被預訂')
            }

            // 3. 新增訂單
            const newOrder = await new OrderModel({
                car: body.carId,
                user: user._id,
                location: body.location,
                startDate: body.startDate,
                endDate: body.endDate,
            }).save()

            return this.util.handleSuccess<null>(resp, null)
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 訂單列表
     */
    listMyOrders = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any

            // 1. 查訂單
            const orders = await OrderModel.find({ user: user._id.toString() })
                .sort({ startDate: 1 })
                .populate<{ car: Car }>('car')

            const result: Array<OrderListMyOrdersResp> = orders
                .filter((order) => order.car.status === 'approved')
                .map((order) => ({
                    orderId: order._id.toString(),
                    car: {
                        id: order.car._id.toString(),
                        model: order.car.model,
                        chargeType: order.car.chargeType,
                        spec: order.car.spec,
                        year: order.car.year,
                        season: order.car.season,
                        carNumber: order.car.carNumber,
                        carPrice: order.car.carPrice,
                        sumAssured: order.car.sumAssured,
                        insuranceArray: order.car.insuranceArray,
                        vl01: { docPath: order.car.vl01.path, base64: null },
                        vl02: { docPath: order.car.vl02.path, base64: null },
                        car01: { docPath: order.car.car01?.path, base64: null },
                        car02: { docPath: order.car.car02?.path, base64: null },
                        car03: { docPath: order.car.car03?.path, base64: null },
                        car04: { docPath: order.car.car04?.path, base64: null },
                        car05: { docPath: order.car.car05?.path, base64: null },
                        car06: { docPath: order.car.car06?.path, base64: null },
                        car07: { docPath: order.car.car07?.path, base64: null },
                        car08: { docPath: order.car.car08?.path, base64: null },
                        car09: { docPath: order.car.car09?.path, base64: null },
                        carInsurancePDF: { docPath: order.car.carInsurancePDF?.path, base64: null },
                        status: order.car.status,
                        owner: {
                            id: order.car.ownerId.toString(),
                            name: '',
                            cellphone: '',
                            email: '',
                        },
                        createdAt: order.car.createdAt,
                        rentPrice: order.car.rentPrice,
                    },
                    user: order.user.toString(),
                    location: order.location,
                    startDate: order.startDate,
                    endDate: order.endDate,
                }))

            return this.util.handleSuccess<Array<OrderListMyOrdersResp>>(resp, result)
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }

    /**
     * 出租記綠列表
     */
    listRentOrders = async (req: Request, resp: Response) => {
        try {
            const user = req.user as any

            // 1. 查訂單
            const orders = await OrderModel.find({})
                .sort({ startDate: 1 })
                .populate<{ car: Car }>('car')

            const result: Array<OrderListMyOrdersResp> = orders
                .filter((order) => order.car.ownerId.toString() === user._id.toString())
                .map((order) => ({
                    orderId: order._id.toString(),
                    car: {
                        id: order.car._id.toString(),
                        model: order.car.model,
                        chargeType: order.car.chargeType,
                        spec: order.car.spec,
                        year: order.car.year,
                        season: order.car.season,
                        carNumber: order.car.carNumber,
                        carPrice: order.car.carPrice,
                        sumAssured: order.car.sumAssured,
                        insuranceArray: order.car.insuranceArray,
                        vl01: { docPath: order.car.vl01.path, base64: null },
                        vl02: { docPath: order.car.vl02.path, base64: null },
                        car01: { docPath: order.car.car01?.path, base64: null },
                        car02: { docPath: order.car.car02?.path, base64: null },
                        car03: { docPath: order.car.car03?.path, base64: null },
                        car04: { docPath: order.car.car04?.path, base64: null },
                        car05: { docPath: order.car.car05?.path, base64: null },
                        car06: { docPath: order.car.car06?.path, base64: null },
                        car07: { docPath: order.car.car07?.path, base64: null },
                        car08: { docPath: order.car.car08?.path, base64: null },
                        car09: { docPath: order.car.car09?.path, base64: null },
                        carInsurancePDF: { docPath: order.car.carInsurancePDF?.path, base64: null },
                        status: order.car.status,
                        owner: {
                            id: order.car.ownerId.toString(),
                            name: '',
                            cellphone: '',
                            email: '',
                        },
                        createdAt: order.car.createdAt,
                        rentPrice: order.car.rentPrice,
                    },
                    user: order.user.toString(),
                    location: order.location,
                    startDate: order.startDate,
                    endDate: order.endDate,
                }))

            return this.util.handleSuccess<Array<OrderListMyOrdersResp>>(resp, result)
        } catch (error: any) {
            return this.util.handleError(resp, error)
        }
    }
}
export default OrderController
