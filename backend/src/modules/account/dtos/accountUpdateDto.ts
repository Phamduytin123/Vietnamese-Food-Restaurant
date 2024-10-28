import { IsEmail, IsNotEmpty } from "class-validator";
import { AccountGenderEnum } from "../../../common";
import { Optional } from "@nestjs/common";

export class AccountUpdateDto {
    @Optional()
    name: string;
    @Optional()
    displayName: string;
    @Optional()
    address: string;
    @IsEmail()
    email: string;
    @Optional()
    tel: string;
    @IsNotEmpty()
    avatar: string;
    @IsNotEmpty()
    gender: AccountGenderEnum;
    @IsNotEmpty()
    password: string;
}