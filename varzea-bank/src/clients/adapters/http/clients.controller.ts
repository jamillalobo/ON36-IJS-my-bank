import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Get,
} from '@nestjs/common';
import { ClientsService } from '../../application/outboundPorts/clients.service';
import { Client } from '../../domain/client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientEntity } from 'src/clients/entity/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAllClients(): Promise<ClientEntity[]>  {
    return this.clientsService.findAllClients();
  }

  @Get(':id')
  findClientById(@Param('id') id: string): Promise<ClientEntity>  {
    return this.clientsService.findClientById(id);
  }
  
  // @Put(':id')
  // updateClient(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('name') name: string,
  //   @Body('idAccount') idAccount: number,
  //   @Body('address') address: string,
  //   @Body('phone') phone: string,
  // ): Client {
  //   return this.clientsService.updateClient(
  //     id,
  //     name,
  //     idAccount,
  //     address,
  //     phone,
  //   );
  // }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<ClientEntity> {
    return this.clientsService.deleteClient(id);
  }
}
