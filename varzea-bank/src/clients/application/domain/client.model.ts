export class Client {
  constructor(
    public id: number,
    public name: string,
    public account: number[],
    public cep: string,
    public phone: string,
  ) {}
}
