import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserProps } from '../entities/user.entity';
import { ClassValidatorFields } from 'src/shared/domain/validator/class-validator-fields';

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MaxLength(15)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  constructor({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt });
  }
}

//factory: padrão de projeto que atribui para um método a responsabilidade de instancair uma ou mais objetos duas classes em conjunto.

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)));
  }
}

//Ao inves de instanciar UserValidator direto na entidade, eu crio um método que faz essa instância da classe, então eu chamo a UserValidatorFactory.create(), que cria a instância.
export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}
