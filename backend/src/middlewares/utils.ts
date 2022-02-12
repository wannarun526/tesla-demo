import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

/**
 * Builds error for validation files
 */
export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    
    const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${location}[${param}]: ${msg}`;
    };
    const temp = validationResult(req)
    console.log(temp);
    const result = temp.formatWith(errorFormatter);

    if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    return res.json({ errors: result.array() });
  }
    
}
