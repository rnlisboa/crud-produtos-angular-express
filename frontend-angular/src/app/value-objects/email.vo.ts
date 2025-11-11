export class EmailVO {
  private constructor(public readonly value: string) {}

  public static create(email: string): EmailVO {
    if (!this.validate(email)) {
      throw new Error('E-mail inválido');
    }
    return new EmailVO(email);
  }

  private static validate(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public equals(other: EmailVO): boolean {
    return this.value === other.value;
  }
}
