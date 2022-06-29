const trimRequest = require('trim-request')

import Route from './base'
import passport from 'passport'
import CarController from '../controllers/car'
import {
    CarAuditApproveDto,
    CarAuditRejectDto,
    CarCreateDto,
    CarListUnorderedDto,
} from '../controllers/car.validate'

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

        /**
         * 審核車輛通過
         */
        this.router.post(
            '/AuditApprove',
            this.requireAuth,
            trimRequest.all,
            this.carController.validateModel(CarAuditApproveDto),
            this.carController.auditApprove
        )

        /**
         * 審核車輛拒絕
         */
        this.router.post(
            '/AuditReject',
            this.requireAuth,
            trimRequest.all,
            this.carController.validateModel(CarAuditRejectDto),
            this.carController.auditReject
        )
    }
}
export default CarRoute
