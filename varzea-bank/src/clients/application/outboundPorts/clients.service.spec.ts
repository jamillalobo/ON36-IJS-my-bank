import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientRepository } from '../inboundPorts/client.repository';

// describe('ClientsService', () => {
//   test('should create a Client', async () => {
//     const clientRepository = new ClientRepository();
//     const clientService = new ClientsService(clientRepository);
    
//     jest.spyOn(clientRepository, 'getCep').mockResolvedValue('Rua Francisco Lacerda');

//     const esperado = {
//       id: 8,
//       name: 'Alex',
//       account: [],
//       cep: 'Rua Francisco Lacerda',
//       phone: '999999999',
//     };
    
//     const resultado = await clientService.createClient({ name: 'Alex', cep: '50741150', phone: '999999999' });

//     expect(resultado).toStrictEqual(esperado);
//   }
//   );
//   test('should find all Clients', () => {
//     const clientRepository = new ClientRepository();
//     const clientService = new ClientsService(clientRepository);

//     const esperado = clientRepository.readClients();

//     const resultado = clientService.findAllClients();

//     expect(resultado).toStrictEqual(esperado);
//   });
// });
