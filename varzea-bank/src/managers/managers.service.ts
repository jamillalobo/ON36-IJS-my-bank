import { ManagerRepository } from './repository/manager.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Manager } from './model/manager.model';
import { AccountRepository } from 'src/accounts/repository/account.repository';

@Injectable()
export class ManagersService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly managerRepository: ManagerRepository,
  ) {}

  createManager(name: string): Manager {
    const managers = this.managerRepository.readManagers();
    const accounts = this.accountRepository.readAccounts();

    const newManagerId =
      managers.length > 0 ? Number(managers[managers.length - 1].id) + 1 : 1;

    accounts.forEach((account) => {
      account.idManager = newManagerId;
    });

    this.accountRepository.writeAccounts(accounts);

    const accountIds = accounts.map((account) => account.idAccount);

    const newManager: Manager = {
      id: newManagerId,
      name: name,
      idAccounts: accountIds,
    };

    managers.push(newManager);
    this.managerRepository.writeManagers(managers);
    return newManager;
  }

  findAllManagers(): Manager[] {
    return this.managerRepository.readManagers();
  }

  findManagerById(id: number): Manager {
    const managers = this.managerRepository.readManagers();
    const manager = managers.find((manager) => manager.id === Number(id))

    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }

    return manager;
  }

  deleteManager(id: number): void {
    const managers = this.managerRepository.readManagers();
    const managerIndex = managers.findIndex(
      (manager) => manager.id === Number(id),
    );

    if (managerIndex !== -1) {
      managers.splice(managerIndex, 1);
      this.managerRepository.writeManagers(managers);
    } else {
      console.error(`Manager with ID ${id} not found.`);
    }
  }
}
