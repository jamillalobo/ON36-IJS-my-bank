import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'src/clients/application/domain/client.model';
import { ClientRepository } from '../inboundPorts/client.repository';
import { CreateClientDto } from '../../adapters/http/dto/create-client.dto';
import { error } from 'console';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const clients = this.clientRepository.readClients();

    const newClientId =
    clients.length > 0 ? Number(clients[clients.length - 1].id) + 1 : 1;

    const logradouro = await this.clientRepository.getCep(createClientDto.cep);

    if (!logradouro) {
      throw new Error('Could not create a client with no valid logradouro');
    }

    const newClient: Client = {
      id: newClientId,
      name: createClientDto.name,
      account: [], // vou ajeitar isso em breve
      cep: logradouro,
      phone: createClientDto.phone
    };

    clients.push(newClient);
    this.clientRepository.writeClients(clients);
    return newClient;
  }

  findAllClients(): Client[] {
   return this.clientRepository.readClients();
  }

  findClientById(id: number): Client {
    const clients = this.clientRepository.readClients();
    const client = clients.find((client) => client.id === Number(id));
    return client;
  }

  updateClient(
    id: number,
    name: string,
    idAccount: number,
    address: string,
    phone: string,
  ): Client {
    const clients = this.clientRepository.readClients();
    const client = clients.find((client) => client.id === Number(id))

    if(!client) {
      throw new NotFoundException('Account not found');
    }

    const updatedClient = {
      ...client,
      name,
      idAccount,
      address,
      phone,
    };
    
    clients.push(updatedClient)
    this.clientRepository.writeClients(clients)
    return updatedClient;
  }

  deleteClient(id: number): void {
    const clients = this.clientRepository.readClients();
    const clientIndex = clients.findIndex((client) => client.id === Number(id));

    clients.splice(clientIndex, 1);
  }
}
