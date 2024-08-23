import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { Client } from "../domain/client.model";
import axios from "axios";
import { response } from "express";

@Injectable()
export class ClientRepository {
  private readonly filePath = path.resolve('src/clients/data/clients.json');
  
  public readClients(): Client[] {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) as Client[];
    }
  
  public writeClients(Clients: Client[]): void {
      fs.writeFileSync(this.filePath, JSON.stringify(Clients, null, 2), 'utf8');
    }

  public async getCep(cep: string): Promise<string> {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;

      const response = await axios.get(url)
        .then(response => {
          return response.data;
        }).catch(error => {
          console.log('error in fetching cep', error);
        }
      );
      return response.data.logradouro;
    } catch (error) { 
      console.log('error in fetching data', error);
    }
  }
}