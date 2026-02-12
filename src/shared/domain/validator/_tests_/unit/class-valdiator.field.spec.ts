import { ClassValidatorFields } from '../../class-validator-fields';
import * as lib from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('Class validator unit test', () => {
  it('Should initialize errors and validatedDate variables with empty objetc', () => {
    const sut = new StubClassValidatorFields();
    expect(sut.errors).toMatchObject({});
    expect(sut.validatedData).toMatchObject({});
  });

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(lib, 'validateSync');
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: {
          isRequired: 'test error',
        },
      },
    ]);
    const sut = new StubClassValidatorFields();

    expect(sut.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toMatchObject({});
    expect(sut.errors).toStrictEqual({ field: ['test error'] });
  });

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(lib, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const sut = new StubClassValidatorFields();

    expect(sut.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(sut.validatedData).toStrictEqual({ field: 'value' });
    expect(sut.errors).toMatchObject({});
  });
});
