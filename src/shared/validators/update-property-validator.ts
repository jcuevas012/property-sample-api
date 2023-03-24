import { body } from 'express-validator';
import { PropertyType } from '../../entities';

export default [
  body('address')
    .isString()
    .notEmpty()
    .withMessage('Property address is not valid'),
  body('price').isFloat({ gt: 0 }).withMessage('Property price is not valid'),
  body('bedrooms')
    .isInt({ gt: 0 })
    .withMessage('Property bedrooms is not valid'),
  body('bathrooms')
    .isInt({ gt: 0 })
    .withMessage('Property bathrooms is not valid'),
  body('type')
    .isString()
    .isIn(Object.values(PropertyType))
    .withMessage(
      `Property type is not valid, type should be ${Object.values(
        PropertyType,
      )}`,
    ),
];
