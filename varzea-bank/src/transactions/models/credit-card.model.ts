import { CardFlagType } from "../enums/cardFlagType.enum";

export class CreditCard {
    public idCredit: string;
    public cardExpire: Date;
    public cardCvv: number;
    public cardFlag: CardFlagType;
}