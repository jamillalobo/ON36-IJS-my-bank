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
import { UpdateClientDto } from './dto/update-client.dto';

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
  async findAllClients(): Promise<ClientEntity[]>  {
    return await this.clientsService.findAllClients();
  }

  @Get(':id')
  async findClientById(@Param('id') id: string): Promise<ClientEntity>  {
    return await this.clientsService.findClientById(id);
  }
  
  @Put(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto : UpdateClientDto,
  ) : Promise<ClientEntity> {
    return await this.clientsService.updateClient(id, updateClientDto);
  }


  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<ClientEntity> {
    return this.clientsService.deleteClient(id);
  }
}
