import {
    IsNotEmpty,
    IsNumber,
  } from 'class-validator';
import { AccountType } from 'src/accounts/domain/enums/accountType.enum';

export class CreateAccountDto {
    @IsNotEmpty()
    type: AccountType;
    
    @IsNotEmpty()
    idManager: string;

    @IsNotEmpty()
    idClient: string;

    @IsNumber()
    @IsNotEmpty()
    balance: number;
  }