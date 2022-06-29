const trimRequest = require('trim-request')

import Route from './base'
import passport from 'passport'
import CarController from '../controllers/car'
import { CarCreateDto, CarListUnorderedDto } from '../controllers/car.validate'

class CarRoute extends Route {
    private carController: CarController = new CarController()
    private requireAuth = passport.authenticate('jwt', { session: false })

    constructor() {
        super()
        this.setRoutes()
    }

    protected setRoutes() {
        /**
         * 租車夥伴新增車輛
         */
        this.router.post(
            '/create',
            this.requireAuth,
            trimRequest.all,
            this.carController.validateModel(CarCreateDto),
            this.carController.create
        )

        /**
         * 列出該租車夥伴已新增車輛
         */
        this.router.post('/list', this.requireAuth, trimRequest.all, this.carController.list)

        /**
         * 列出所有未預約車輛
         */
        this.router.post(
            '/ListUnordered',
            this.requireAuth,
            trimRequest.all,
            this.carController.validateModel(CarListUnorderedDto),
            this.carController.listUnordered
        )

        /**
         * 列出所有新加入車輛
         */
        this.router.post(
            '/ListPendings',
            this.requireAuth,
            trimRequest.all,
            this.carController.listPendings
        )
    }
}
export default CarRoute
