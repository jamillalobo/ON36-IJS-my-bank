import { Controller, Post, Body, Delete, Param, Get, ParseIntPipe, Put } from '@nestjs/common';
import { ManagersService } from '../../application/outboundPorts/managers.service';
// import { Manager } from '../../application/domain/manager.model';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerEntity } from 'src/managers/entity/manager.entity';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async createManager(@Body() createManagerDto: CreateManagerDto): Promise<ManagerEntity> {
    return this.managersService.createManager(createManagerDto);
  }

  @Get()
  findAllClients(): Promise<ManagerEntity[]> {
    return this.managersService.findAllManagers();
  }

  @Get(':id')
  findClientById(@Param('id') id: string): Promise<ManagerEntity> {
    return this.managersService.findManagerById(id);
  }

  @Delete(':id')
  deleteManager(@Param('id') id: string): Promise<ManagerEntity> {
    return this.managersService.deleteManager(id);
  }
}
