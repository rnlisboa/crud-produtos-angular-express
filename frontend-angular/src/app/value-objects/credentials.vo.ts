export class CredentialsVO {
  private readonly _nome: string;
  private readonly _email: string;

  private constructor(nome: string, email: string) {
    this._nome = nome;
    this._email = email;
  }

  static create(nome: string, email: string): CredentialsVO {
    if (!nome || nome.trim().length < 3) {
      throw new Error('Nome inválido. Deve conter pelo menos 3 caracteres.');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Email inválido.');
    }

    return new CredentialsVO(nome.trim(), email.trim().toLowerCase());
  }

  get nome(): string {
    return this._nome;
  }

  get email(): string {
    return this._email;
  }

  equals(other: CredentialsVO): boolean {
    return this._nome === other._nome && this._email === other._email;
  }

  toJSON() {
    return {
      nome: this._nome,
      email: this._email,
    };
  }
}
