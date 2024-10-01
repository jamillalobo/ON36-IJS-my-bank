export class Client {
  constructor(
    public id: string,
    public name: string,
    public account: number[],
    public cep: string,
    public phone: string,
  ) {}
}
