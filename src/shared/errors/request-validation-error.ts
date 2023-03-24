import {ValidationError} from 'express-validator';

import CustomError from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid param request');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => ({
      message: err.msg,
      field: err.param,
    }));
  }
}
