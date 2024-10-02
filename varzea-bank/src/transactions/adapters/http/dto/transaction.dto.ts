import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionDto {
    @IsString()
    @IsNotEmpty()
    account: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
  }