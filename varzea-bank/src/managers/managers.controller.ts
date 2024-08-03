import { Controller, Post, Body, Delete, Param, Get, ParseIntPipe, Put } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { Manager } from './model/manager.model';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  createManager(@Body('name') name: string): Manager {
    return this.managersService.createManager(name);
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
