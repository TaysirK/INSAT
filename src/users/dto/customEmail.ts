import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Like } from 'typeorm';

@ValidatorConstraint({ name: 'customEmail', async: false })
export class CustomEmail implements ValidatorConstraintInterface {
  validate(email: any, args: ValidationArguments) {
    return email.Like("%@insat.ucar.tn%"); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'This Email doesnt belong to INSAT';
  }
}