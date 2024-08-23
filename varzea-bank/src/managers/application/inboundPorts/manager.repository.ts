import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { Manager } from "../domain/model/manager.model";

@Injectable()
export class ManagerRepository {

    private readonly filePath = path.resolve('src/managers/data/managers.json');
    
    public readManagers(): Manager[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Manager[];
      }
    
    public writeManagers(managers: Manager[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(managers, null, 2), 'utf8');
      }
}