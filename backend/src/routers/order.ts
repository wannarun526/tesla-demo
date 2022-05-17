const trimRequest = require('trim-request');

import Route from "./base";
import passport from 'passport';
import { OrderCreateDto } from "../controllers/order.validate";
import OrderController from "../controllers/order";

class OrderRoute extends Route {
    private orderController: OrderController = new OrderController();
    private requireAuth = passport.authenticate("jwt", { session: false });

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.post(
            "/Create",
            this.requireAuth,
            trimRequest.all,
            this.orderController.validateModel(OrderCreateDto),
            this.orderController.create,
        );

        
    }
}

export default OrderRoute;
