import {
    IsNotEmpty,
    IsString,
    Length,
  } from 'class-validator';
  
export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    cep: string;

    @IsNotEmpty()
    @Length(11, 11)
    cpf: string;

    @IsNotEmpty()
    phone: string;
  }