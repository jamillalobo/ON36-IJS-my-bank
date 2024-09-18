import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from './managers.service';
import { ManagerRepository } from '../inboundPorts/manager.repository';
import { AccountRepository } from '../../../accounts/application/inboundPorts/account.repository';

describe('ManagersService', () => {
  // test('should create a manager', () => {
  //   const managerRepository = new ManagerRepository();
  //   const accountRepository = new AccountRepository();
  //   const managerService = new ManagersService(accountRepository, managerRepository);

  //   const esperado = {
  //     id: 5,
  //     name: 'Maria',
  //     accounts: [1, 2],
  //   };

  //   const resultado = managerService.createManager({ name: 'Maria' });

  //   expect(resultado).toStrictEqual(esperado);
  // }
  // );

  // test('should find managers', () => {
  //   const managerRepository = new ManagerRepository();
  //   const accountRepository = new AccountRepository();
  //   const managerService = new ManagersService(accountRepository, managerRepository);

  //   const esperado = managerRepository.readManagers();

  //   const resultado = managerService.findAllManagers();

  //   expect(resultado).toStrictEqual(esperado);
  // });

  // test('should find manager by id', () => {
  //   const managerRepository = new ManagerRepository();
  //   const accountRepository = new AccountRepository();
  //   jest.spyOn(managerRepository, 'readManagers').mockReturnValue([{ id: 1, name: 'João', accounts: [1, 2] }]);

  //   const managerService = new ManagersService(accountRepository, managerRepository);

  //   const esperado = { id: 1, name: 'João', accounts: [1, 2, 3] };

  //   const resultado = managerService.findManagerById(1);

  //   expect(resultado).toStrictEqual(esperado);
  // });

  // test('should delete a manager', () => {
  //   const managerRepository = new ManagerRepository();
  //   const accountRepository = new AccountRepository();
  //   jest.spyOn(managerRepository, 'readManagers').mockReturnValue([{ id: 1, name: 'João', accounts: [1, 2] }]);

  //   const esperado = jest.spyOn(managerRepository, 'writeManagers').mockImplementation((managers) => {
  //     expect(managers).not.toContain({ id: 1, name: 'João', accounts: [1, 2] });
  //   });

  //   const managerService = new ManagersService(accountRepository, managerRepository);

  //   managerService.deleteManager(1);
  // });
      
});
