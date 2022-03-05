import passport from 'passport';
import { Strategy, StrategyOptions } from "passport-jwt";
import { Request } from 'express';
import { UserModel } from "../schemas/user";

class JwtPassport {

    constructor() {
        passport.use(this.jwtLogin)
    }

    /**
     * Options object for jwt middlware
     */
    private jwtOptions: StrategyOptions = {
        jwtFromRequest: this.jwtExtractor,
        secretOrKey: process.env.JWT_SECRET,
    }

    /**
     * Login with JWT middleware
     */
    private jwtLogin = new Strategy(this.jwtOptions, async (payload, done) => {
        try{
            const user = await UserModel.findById(payload.id)
            return !user ? done(null, false) : done(null, user)
        }
        catch(err: any){
            return done(err, false)
        }
    })

    /**
     * Extracts token from: header, body or query
     */
    private jwtExtractor(req: Request) {
        let token: string | null = null
        if (req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '').trim()
        } else if (req.body.token) {
            token = req.body.token.trim()
        } else if (req.query.token) {
            token = req.query.token.toString().trim()
        }
        return token
    }
}

export default JwtPassport;
