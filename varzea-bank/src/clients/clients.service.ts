import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Client } from 'src/clients/model/client.model';

@Injectable()
export class ClientsService {
  private readonly filePath = path.resolve('src/clients/data/clients.json');

  private readClients(): Client[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Client[];
  }

  private writeClients(clients: Client[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(clients, null, 2), 'utf8');
  }

  createClient(
    name: string,
    idAccount: number,
    address: string,
    phone: string,
  ): Client {
    const clients = this.readClients();
    const newClient: Client = {
      id: clients.length > 0 ? Number(clients[clients.length - 1].id) + 1 : 1,
      name,
      idAccount,
      address,
      phone,
    };

    clients.push(newClient);
    this.writeClients(clients);
    return newClient;
  }

  findAllClients(): Client[] {
   return this.readClients();
  }

  findClientById(id: number): Client {
    const clients = this.readClients();
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
    const clients = this.readClients();
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
    this.writeClients(clients)
    return updatedClient;
  }

  deleteClient(id: number): void {
    const clients = this.readClients();
    const clientIndex = clients.findIndex((client) => client.id === Number(id));

    clients.splice(clientIndex, 1);
  }
}
