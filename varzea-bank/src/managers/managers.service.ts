import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Manager } from './model/manager.model';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class ManagersService {
  constructor(private readonly accountsService: AccountsService) {}

  private readonly filePath = path.resolve('src/managers/data/managers.json');

  private readManagers(): Manager[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Manager[];
  }

  private writeManagers(managers: Manager[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(managers, null, 2), 'utf8');
  }

  createManager(name: string): Manager {
    const managers = this.readManagers();
    const accounts = this.accountsService.readAccounts();

    const newManagerId =
      managers.length > 0 ? Number(managers[managers.length - 1].id) + 1 : 1;

    accounts.forEach((account) => {
      account.idManager = newManagerId;
    });

    this.accountsService.writeAccounts(accounts);

    const accountIds = accounts.map((account) => account.id);

    const newManager: Manager = {
      id: newManagerId,
      name: name,
      idAccounts: accountIds,
    };

    managers.push(newManager);
    this.writeManagers(managers);
    return newManager;
  }

  findAllManagers(): Manager[] {
    return this.readManagers();
  }

  findManagerById(id: number): Manager {
    const managers = this.readManagers();
    const manager = managers.find((manager) => manager.id === Number(id))

    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }

    return manager;
  }

  deleteManager(id: number): void {
    const managers = this.readManagers();
    const managerIndex = managers.findIndex(
      (manager) => manager.id === Number(id),
    );

    if (managerIndex !== -1) {
      managers.splice(managerIndex, 1);
      this.writeManagers(managers);
    } else {
      console.error(`Manager with ID ${id} not found.`);
    }
  }
}
