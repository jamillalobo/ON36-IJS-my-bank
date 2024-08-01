import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.model';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  createManager(
    @Body('name') name: string,
    @Body('idManager') idManager: number,
    @Body('idAccount') idAccount: number,
    @Body('address') address: string,
    @Body('phone') phone: string,
  ): Client {
    return this.clientsService.createClient(
      name,
      idManager,
      idAccount,
      address,
      phone,
    );
  }

  @Delete(':id')
  deleteManager(@Param('id', ParseIntPipe) id: number): void {
    return this.clientsService.deleteClient(id);
  }
}
