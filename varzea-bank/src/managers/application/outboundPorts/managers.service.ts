import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from 'src/managers/adapters/http/dto/create-manager.dto';
import { Repository } from 'typeorm';
import { ManagerEntity } from '../../entity/manager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/managers/domain/manager.model';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity) private readonly managerRepository: Repository<ManagerEntity>,
  ) {}

  // verificar como adaptar entity para model de manager
  async createManager(createManagerDto: CreateManagerDto): Promise<ManagerEntity> {
    const newManager = await this.managerRepository.save(createManagerDto);
  
    return newManager;
  }

  async findAllManagers(): Promise<ManagerEntity[]> {
    const managers = await this.managerRepository.find();

    if (!managers || managers.length === 0) {
      throw new NotFoundException('No managers found');
    }

    return managers;
  }

  async findManagerById(id: string): Promise<ManagerEntity> {
    const manager = await this.managerRepository.findOne({
      where: { id },
      relations: ['accounts'], // Inclui as contas associadas
    });
  
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    return manager;
  }

  async deleteManager(id: string): Promise<ManagerEntity> {
    const manager = await this.managerRepository.findOne({ where: { id } });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    await this.managerRepository.delete(id);

    return manager;
  }
}
