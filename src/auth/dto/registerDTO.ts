import {IsEmail, IsPhoneNumber, IsString, MinLength, Validate} from "class-validator";
import {IsPasswordsMatchingConstraint} from "@common/common/is-passwords-matching-constraint.decorator";

export class RegisterDTO{
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password:string;

    @IsString()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    passwordRepeat:string;
    @IsPhoneNumber()
    phone: string
}