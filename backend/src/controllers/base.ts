import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import Utility from "../middlewares/utils";

export class BaseController{

    protected util = new Utility();

    validateModel = (dtoClass: any) => {
        return (req: Request, resp: Response, next: NextFunction) => {
            const output: any = plainToClass(dtoClass, req.body);
            validate(output, {
                skipMissingProperties: false,
                skipNullProperties: false,
                skipUndefinedProperties: false,
            })
            .then(errors => {
                if (errors.length > 0) {
                    const constraints = errors[0]?.constraints || { error: `${errors[0]?.property} is not valid`};
                    const errorTxt = Object.values(constraints)[0];
                    errorTxt && this.util.handleError(resp, { message: errorTxt });
                    return;
                } else {
                    resp.locals.input = output;
                    next();
                }
            });
        };
    };
}
