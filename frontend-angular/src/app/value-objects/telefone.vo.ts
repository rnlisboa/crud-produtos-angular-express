export class TelefoneVO {
  private constructor(public readonly value: string) {}

  public static create(telefone: string): TelefoneVO {
    if (!this.validate(telefone)) {
      throw new Error('Telefone inválido');
    }
    return new TelefoneVO(telefone);
  }

  private static validate(telefone: string): boolean {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
  }

  public equals(other: TelefoneVO): boolean {
    return this.value === other.value;
  }
}
