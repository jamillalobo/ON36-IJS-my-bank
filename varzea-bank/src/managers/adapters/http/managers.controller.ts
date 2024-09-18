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
  async findAllManagers(): Promise<ManagerEntity[]> {
    return await this.managersService.findAllManagers();
  }

  @Get(':id')
  async findManagerById(@Param('id') id: string): Promise<ManagerEntity> {
    return await this.managersService.findManagerById(id);
  }

  @Delete(':id')
  async deleteManager(@Param('id') id: string): Promise<ManagerEntity> {
    return await this.managersService.deleteManager(id);
  }
}
