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
import { Client } from '../../application/domain/client.model';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    return await this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAllClients(): Client[] {
    return this.clientsService.findAllClients();
  }

  @Get(':id')
  findClientById(@Param('id', ParseIntPipe) id: number): Client {
    return this.clientsService.findClientById(id);
  }
  
  @Put(':id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @Body('idAccount') idAccount: number,
    @Body('address') address: string,
    @Body('phone') phone: string,
  ): Client {
    return this.clientsService.updateClient(
      id,
      name,
      idAccount,
      address,
      phone,
    );
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number): void {
    return this.clientsService.deleteClient(id);
  }
}
