import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransferDto {
    @IsString()
    @IsNotEmpty()
    account: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    accountDestiny: string;
  }