import { IsEmail, IsString, MinLength, IsNotEmpty, IsDefined, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Please provide a valid email address'
    })
    email: string;

    @IsDefined()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    })
    @IsNotEmpty()
    password: string;

    @IsDefined()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\s]+$/, {
        message: 'First name can only contain letters and spaces'
    })
    @IsNotEmpty()
    firstName: string;

    @IsDefined()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\s]+$/, {
        message: 'Last name can only contain letters and spaces'
    })
    @IsNotEmpty()
    lastName: string;
} 