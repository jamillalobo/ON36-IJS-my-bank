import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { Manager } from './manager.model';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  createManager(@Body('name') name: string): Manager {
    return this.managersService.createManager(name);
  }

  @Delete(':id')
  deleteManager(@Param('id') id: number): void {
    this.managersService.deleteManager(id);
  }
}
