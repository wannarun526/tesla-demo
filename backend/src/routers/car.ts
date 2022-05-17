const trimRequest = require('trim-request');

import Route from "./base";
import passport from 'passport';
import CarController from "../controllers/car";
import { CarCreateDto, CarListUnorderedDto } from "../controllers/car.validate";

class CarRoute extends Route{

    private carController: CarController = new CarController();
    private requireAuth = passport.authenticate('jwt', { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post(
            '/create',
            this.requireAuth,
            trimRequest.all,
            this.carController.validateModel(CarCreateDto),
            this.carController.create,
        );

        this.router.post(
            '/list',
            this.requireAuth,
            trimRequest.all,
            this.carController.list,
        );

        this.router.post(
            "/ListUnordered",
            this.requireAuth,
            trimRequest.all,
            this.carController.validateModel(CarListUnorderedDto),
            this.carController.listUnordered,
        );
    }
}
export default CarRoute;
