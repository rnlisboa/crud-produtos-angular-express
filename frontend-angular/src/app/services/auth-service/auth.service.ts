import { inject, Injectable } from '@angular/core';
import { CredentialsVO } from '../../value-objects/credentials.vo';
import { ClienteService } from '../cliente-service/cliente.service';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import ClienteEntity from '../../interfaces/domain/cliente.entity';

export type Credentials = {
  nome: string;
  email: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  poNotification = inject(PoNotificationService);
  constructor(private clienteService: ClienteService, private router: Router) {}

  isAuthenticated(): boolean {
    const stored = this.getLoggedCliente();
    return !!stored;
  }

  logout() {
    localStorage.removeItem('cliente');
  }

  login(credentials: CredentialsVO) {
    const email = credentials.email;
    this.clienteService.findOneByEmail(email).subscribe({
      next: (cliente) => {
        if (cliente) {
          localStorage.setItem('cliente', JSON.stringify(cliente));
          this.poNotification.success('Autenticado com sucesso');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        if (err.status === 400 || err.status === 404) {
          this.poNotification.error('Cliente não encontrado');
        } else {
          this.poNotification.error('Erro inesperado');
        }
      },
    });
  }

  getLoggedCliente() {
    const stored = localStorage.getItem('cliente');
    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as ClienteEntity;
  }
}
