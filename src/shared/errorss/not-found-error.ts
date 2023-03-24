import CustomError from './custom-error';

export class NotFoundError extends CustomError {
  statusCode: number = 500;

  constructor(public message: string = 'Resource not found') {
    super('Resource not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
