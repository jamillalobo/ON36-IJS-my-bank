import { Controller, Post, Body, Delete, Param, Get, ParseIntPipe, Put, HttpStatus, Res } from '@nestjs/common';
import { ManagersService } from '../../application/outboundPorts/managers.service';
// import { Manager } from '../../application/domain/manager.model';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerEntity } from 'src/managers/entity/manager.entity';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  async createManager(@Res() response, @Body() createManagerDto: CreateManagerDto): Promise<ManagerEntity> {
    try {
      const manager = await this.managersService.createManager(createManagerDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Manager has been created successfully',
        manager, 
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Client not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAllManagers(@Res() response): Promise<ManagerEntity[]> {
    try {
      const managers = await this.managersService.findAllManagers();
      return response.status(HttpStatus.OK).json({
        message: 'All Managers data found successfully',
        managers}); 
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async findManagerById(@Res() response, @Param('id') id: string): Promise<ManagerEntity> {
    try {
      const manager = await this.managersService.findManagerById(id);
      return response.status(HttpStatus.OK).json({
        message: 'Manager found successfully',
        manager}); 
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async deleteManager(@Res() response, @Param('id') id: string): Promise<ManagerEntity> {
    try {
      const deletedManager = await this.managersService.deleteManager(id);
      return response.status(HttpStatus.OK).json({
        message: 'Manager deleted successfully',
        deletedManager});
    } catch (error) {
      return response.status(error.status).json(error.response);
      
    }

  }
}
