import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @MaxLength(72)
  email: string;

  @Field()
  @MinLength(4)
  @MaxLength(72)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(72, { message: 'Password cannot exceed 72 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/, {
    message:
      'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ?',
  })
  password: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(72)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/)
  confirmPassword: string;
}
