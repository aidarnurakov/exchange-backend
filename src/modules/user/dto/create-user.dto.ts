import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 16)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,16}$/, {
    message:
      'Password must include at least one uppercase letter, one number, and one special character.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 16)
  confirmPassword: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty()
  email: string;
}
