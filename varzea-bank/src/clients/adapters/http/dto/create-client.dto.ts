import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    cep: string;

    @IsNotEmpty()
    phone: string;
  }