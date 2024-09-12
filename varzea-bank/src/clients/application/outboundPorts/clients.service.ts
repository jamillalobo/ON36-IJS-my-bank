import { UpdateClientDto } from './../../adapters/http/dto/update-client.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../../entity/client.entity';
import { ClientRepository } from '../inboundPorts/client.repository';
import { CreateClientDto } from '../../adapters/http/dto/create-client.dto';
import { Repository } from 'typeorm';
import { CepRepository } from 'src/utils/cep.repository';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: Repository<ClientEntity>,
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
    const updateClient = await this.clientRepository.update(id, updateClientDto);

    if (!updateClient) {
      throw new NotFoundException('Client not found');
    }

    const client = await this.clientRepository.findOne({ where: { id } });

    return client;
  }
  
  // updateClient(
  //   id: number,
  //   name: string,
  //   idAccount: number,
  //   address: string,
  //   phone: string,
  // ): Client {
  //   const clients = this.clientRepository.readClients();
  //   const client = clients.find((client) => client.id === Number(id))

  //   if(!client) {
  //     throw new NotFoundException('Account not found');
  //   }

  //   const updatedClient = {
  //     ...client,
  //     name,
  //     idAccount,
  //     address,
  //     phone,
  //   };
    
  //   clients.push(updatedClient)
  //   this.clientRepository.writeClients(clients)
  //   return updatedClient;
  // }

  async deleteClient(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if(!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientRepository.delete(id);

    return client;
  }
}
