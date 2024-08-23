import {
    IsNotEmpty,
  } from 'class-validator';
import { AccountType } from 'src/accounts/application/domain/enums/accountType.enum';
import { Manager } from 'src/managers/model/manager.model';

export class CreateAccountDto {
    @IsNotEmpty()
    type: AccountType;
    
    @IsNotEmpty()
    idManager: Manager["id"];
  }