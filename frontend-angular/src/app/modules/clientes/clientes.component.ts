import { Component, inject, OnInit } from '@angular/core';
import ClienteEntity from '../../interfaces/domain/cliente.entity';
import {
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ClienteService } from '../../services/cliente-service/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.less',
})
export class ClientesComponent implements OnInit {
  poNotification = inject(PoNotificationService);
  cliente!: Partial<ClienteEntity>;

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      minLength: 3,
      maxLength: 100,
      gridColumns: 12,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Seu nome',
    },
    {
      property: 'email',
      gridColumns: 12,
      icon: 'an an-envelope',
      placeholder: 'voce@gmail.com',
      order: 2,
    },
    {
      property: 'telefone',
      gridColumns: 12,
      mask: '(99) 99999-9999',
      placeholder: '(xx) 9xxxx-xxxx',
      order: 3,
    },
    {
      property: 'endereco',
      gridColumns: 12,
      order: 4,
    },
  ];

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedCliente = this.authService.getLoggedCliente();

    this.cliente = {
      id: loggedCliente?.id,
      nome: loggedCliente?.nome,
      email: loggedCliente?.email,
      telefone: loggedCliente?.telefone,
      endereco: loggedCliente?.endereco,
    };
  }

  update() {
    if (this.cliente.id) {
      this.clienteService.update(this.cliente.id, this.cliente).subscribe({
        next: (updated) => {
          this.poNotification.success('Cliente atualizado com sucesso!');
          this.cliente = updated;
        },
        error: (err) => {
          console.error(err);
          this.poNotification.error('Erro ao atualizar cliente.');
        },
      });
    } else {
      this.poNotification.error('Sessão do usuário inválida.');
    }
  }
}
