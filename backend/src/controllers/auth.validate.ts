import { check } from 'express-validator';
import { validateResult } from '../middlewares/utils';

export const testValidate = [
    check('userId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    validateResult
]


