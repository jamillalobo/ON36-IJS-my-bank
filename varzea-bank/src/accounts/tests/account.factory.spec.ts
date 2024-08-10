import { AccountType } from "../enums/accountType.enum";
import { AccountFactory } from "../factories/account.factory";
import { CurrentAccount } from "../models/current-account";
import { SavingsAccount } from "../models/savings-account";

describe('Account Factory', () => {
    test('should create a current account', () => {
        const retornado = AccountFactory.createAccount(
            AccountType.CURRENT,
            123,  // idAccount
            1,    // idClient
            2,    // idManager
            1000, // balance
            0.2   // rate
        );
    
        expect(retornado).toBeInstanceOf(CurrentAccount);
        if (retornado instanceof CurrentAccount) {
            expect(retornado.rate).toBe(0.2);
        }
        expect(retornado.idAccount).toBe(123);
        expect(retornado.idClient).toBe(1);
        expect(retornado.idManager).toBe(2);
        expect(retornado.balance).toBe(1000);
    });
    
    
    test('should create a savings account', () => {
        const retornado = AccountFactory.createAccount(
            AccountType.SAVINGS,
            123,
            1,
            2,
            1000,
            400
        );

        expect(retornado).toBeInstanceOf(SavingsAccount);
        if (retornado instanceof SavingsAccount) {
            expect(retornado.overDraftLimit).toBe(400);
        }
        expect(retornado.idAccount).toBe(123);
        expect(retornado.idClient).toBe(1);
        expect(retornado.idManager).toBe(2);
        expect(retornado.balance).toBe(1000);

    });
})