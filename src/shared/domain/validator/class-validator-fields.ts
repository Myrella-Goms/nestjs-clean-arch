import { validateSync } from 'class-validator';
import {
  FieldsError,
  IValidatorFieldsInterface,
} from './validator.field.interface';

export abstract class ClassValidatorFields<
  PropsValidated,
> implements IValidatorFieldsInterface<PropsValidated> {
  errors: FieldsError = {};
  validatedData: PropsValidated = {} as PropsValidated;

  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property; //property vem do objeto que é retornado de validateSync
        this.errors[field] = Object.values(error.constraints); //obtendo o valor das chaves do objeto constraint
      }
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
