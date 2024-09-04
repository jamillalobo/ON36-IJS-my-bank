import { Controller, Post, Body, Delete, Param, Get, ParseIntPipe, Put } from '@nestjs/common';
import { ManagersService } from '../../application/outboundPorts/managers.service';
import { Manager } from '../../application/domain/manager.model';
import { CreateManagerDto } from './dto/create-manager.dto';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  createManager(@Body() createManagerDto: CreateManagerDto): Manager {
    return this.managersService.createManager(createManagerDto);
  }

  @Get()
  findAllClients(): Manager[] {
    return this.managersService.findAllManagers();
  }

  @Get(':id')
  findClientById(@Param('id', ParseIntPipe) id: number): Manager {
    return this.managersService.findManagerById(id);
  }

  @Delete(':id')
  deleteManager(@Param('id') id: number): void {
    this.managersService.deleteManager(id);
  }
}
