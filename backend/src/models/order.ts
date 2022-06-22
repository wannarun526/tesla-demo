import { CarListResp } from './car'

// Order/Create
export interface OrderCreateReq {
    carId: string
    location: string
    startDate: Date
    endDate: Date
}

// Order/ListMyOrders
export interface OrderListMyOrdersResp {
    orderId: string;
    car: CarListResp
    user: string
    location: string
    startDate: Date
    endDate: Date
}
