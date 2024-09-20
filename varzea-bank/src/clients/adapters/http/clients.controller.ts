import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Get,
  Res,
  HttpStatus
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
    @Res() response, 
    @Body() createClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    try {
      const product = await this.clientsService.createClient(createClientDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Client has been created successfully',
        product,});      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Client not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAllClients(@Res() response): Promise<ClientEntity[]>  {
    try {
      const clients = await this.clientsService.findAllClients();
      return response.status(HttpStatus.OK).json({
        message: 'All clients data found successfully',
        clients});      
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async findClientById(@Res() response, @Param('id') id: string): Promise<ClientEntity>  {
    try {
      const client = await this.clientsService.findClientById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Client found successfully',
        client});      
    } catch (error) {
      return response.status(error.status).json(error.response);
      
    }
  }
  
  @Put(':id')
  async updateClient(
    @Res() response, 
    @Param('id') id: string,
    @Body() updateClientDto : UpdateClientDto,
  ) : Promise<ClientEntity> {
    try {
      const updateClient = await this.clientsService.updateClient(id, updateClientDto);
      return response.status(HttpStatus.OK).json({
        message: 'Client has been updated successfully',
        updateClient});      
    } catch (error) {
      return response.status(error.status).json(error.response);
      
    }
  }


  @Delete(':id')
  async deleteClient(@Res() response, @Param('id') id: string): Promise<ClientEntity> {
    try {
      const deletedClient = await this.clientsService.deleteClient(id);
      return response.status(HttpStatus.OK).json({
        message: 'Client deleted successfully',
        deletedClient});      
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
