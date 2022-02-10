// src/router.ts

import Route from "./route";
import AuthRoute from "./auth";

export const router: Array<Route> = [
    new AuthRoute(),
];
