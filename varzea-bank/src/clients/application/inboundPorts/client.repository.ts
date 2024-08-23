import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { Client } from "../domain/model/client.model";

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
}