import { UpdateClientDto } from './../../adapters/http/dto/update-client.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../../entity/client.entity';
import { ClientRepository } from '../inboundPorts/client.repository';
import { CreateClientDto } from '../../adapters/http/dto/create-client.dto';
import { Repository } from 'typeorm';
import { CepRepository } from 'src/utils/cep.repository';
import { Client } from 'src/clients/domain/client.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
    private readonly cepRepository: CepRepository,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const logradouro = await this.cepRepository.getCep(createClientDto.cep);

    if (!logradouro) {
      throw new Error('Could not create a client with no valid logradouro');
    }

    const newClient = await this.clientRepository.save(createClientDto);

    return newClient;
  }

  async findAllClients(): Promise<ClientEntity[]> {
   const clients = await this.clientRepository.find();

   if(!clients || clients.length === 0) {
     throw new NotFoundException('No clients found');
   }

    return clients;
  }

  async findClientById(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ where: {id}}); 

    if(!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async updateClient(id: string, updateClientDto: UpdateClientDto): Promise<ClientEntity> {
    const clientNotUpdated = await this.clientRepository.findOne({ where: { id } });

    if (clientNotUpdated.cpf !== updateClientDto.cpf) {
      throw new Error(`Client can not update cpf`)
    }

    const updateClient = await this.clientRepository.update(id, updateClientDto);

    if (!updateClient) {
      throw new NotFoundException('Client not found');
    }

    const client = await this.clientRepository.findOne({ where: { id } });

    return client;
  }

  async deleteClient(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if(!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientRepository.delete(id);

    return client;
  }
}
