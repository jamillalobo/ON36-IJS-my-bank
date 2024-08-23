import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'src/clients/application/domain/model/client.model';
import { ClientRepository } from './repository/client.repository';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  createClient(
    name: string,
    idAccount: number,
    address: string,
    phone: string,
  ): Client {
    const clients = this.clientRepository.readClients();
    const newClient: Client = {
      id: clients.length > 0 ? Number(clients[clients.length - 1].id) + 1 : 1,
      name,
      idAccount,
      address,
      phone,
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
