const trimRequest = require('trim-request')

import AuthController from '../controllers/auth'
import {
    AuthForgetPwdDto,
    AuthLoginDto,
    AuthRegisterDto,
    AuthResetPwdDto,
    AuthSendOtpDto,
    AuthUpdateUserDto,
    AuthVerifyOtpDto,
} from '../controllers/auth.validate'
import Route from './base'
import passport from 'passport'

class AuthRoute extends Route {
    private authController: AuthController = new AuthController()
    private requireAuth = passport.authenticate('jwt', { session: false })

    constructor() {
        super()
        this.setRoutes()
    }

    protected setRoutes() {
        this.router.post(
            '/register',
            trimRequest.all,
            this.authController.validateModel(AuthRegisterDto),
            this.authController.register
        )

        this.router.post(
            '/login',
            trimRequest.all,
            this.authController.validateModel(AuthLoginDto),
            this.authController.login
        )

        this.router.post(
            '/sendOtp',
            trimRequest.all,
            this.authController.validateModel(AuthSendOtpDto),
            this.authController.sendOtp
        )

        this.router.post(
            '/verifyOtp',
            trimRequest.all,
            this.authController.validateModel(AuthVerifyOtpDto),
            this.authController.verifyOtp
        )

        this.router.post(
            '/resetPwd',
            this.requireAuth,
            trimRequest.all,
            this.authController.validateModel(AuthResetPwdDto),
            this.authController.resetPwd
        )

        this.router.post(
            '/forgetPwd',
            trimRequest.all,
            this.authController.validateModel(AuthForgetPwdDto),
            this.authController.forgetPwd
        )

        this.router.post(
            '/userInfo',
            this.requireAuth,
            trimRequest.all,
            this.authController.userInfo
        )

        this.router.post(
            '/updateUser',
            this.requireAuth,
            trimRequest.all,
            this.authController.validateModel(AuthUpdateUserDto),
            this.authController.updateUser
        )

        this.router.post(
            '/allUsers',
            this.requireAuth,
            trimRequest.all,
            this.authController.allUsers
        )
    }
}

export default AuthRoute
