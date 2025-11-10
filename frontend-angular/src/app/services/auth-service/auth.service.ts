import { Injectable } from '@angular/core';
import { CredentialsVO } from '../../value-objects/credentials.vo';
import { ClienteService } from '../cliente-service/cliente.service';

export type Credentials = {
  nome: string;
  email: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private clienteService: ClienteService) {}

  isAuthenticated(): boolean {
    const credentials: Credentials = JSON.parse(
      localStorage.getItem('cliente') || ''
    );
    return !!credentials;
  }

  logout() {
    localStorage.removeItem('cliente');
  }

  login(credentials: CredentialsVO) {
    const email = credentials.email;
    try {
      const cliente = this.clienteService
        .findOneByEmail(email)
        .subscribe((cliente) => {
          if (!!cliente) {
            localStorage.setItem('cliente', JSON.stringify(cliente));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
