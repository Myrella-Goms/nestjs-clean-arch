export type FieldsError = {
  [field: string]: string[];
};

//criação da abstração para fazer a validacão dos campos, com um genéric definido e um método sem tipagem especifica
export interface IValidatorFieldsInterface<PropsValidate>{
  errors: FieldsError;
  validatedData: PropsValidate;
  validate(data: any): boolean;
}
