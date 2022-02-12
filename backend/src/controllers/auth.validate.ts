import { check } from 'express-validator';
import Utility from '../middlewares/utils';

class AuthValidate{

    private util = new Utility();

    registerValids = [
        check('account')
            .exists().withMessage('Missing')
            .not().isEmpty().withMessage('Is empty')
            .isString().withMessage('Should be string'),
        check('name')
            .exists().withMessage('Missing')
            .not().isEmpty().withMessage('Is empty')
            .isString().withMessage('Should be string'),
        check('cellphone')
            .exists().withMessage('Missing')
            .not().isEmpty().withMessage('Is empty')
            .isString().withMessage('Should be string'),
        this.util.validateResult
    ]
}

export default AuthValidate;
