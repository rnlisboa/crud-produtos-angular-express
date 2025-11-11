import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PoDynamicModule,
  PoButtonModule,
  PoLinkModule,
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import {
  AuthService,
  Credentials,
} from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ClienteDTO } from '../../interfaces/dto/cliente.dto';
import { EmailVO } from '../../value-objects/email.vo';
import { TelefoneVO } from '../../value-objects/telefone.vo';
import { ClienteService } from '../../services/cliente-service/cliente.service';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.less',
})
export class SignupComponent implements OnInit {
  poNotification = inject(PoNotificationService);
  clienteDTO!: ClienteDTO;

  constructor(private clienteService: ClienteService, private router: Router) {}

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      required: true,
      minLength: 3,
      maxLength: 100,
      gridColumns: 12,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Seu nome',
    },
    {
      property: 'email',
      required: true,
      gridColumns: 12,
      icon: 'an an-envelope',
      placeholder: 'voce@gmail.com',
      order: 2,
    },
    {
      property: 'telefone',
      gridColumns: 12,
      required: true,
      mask: '(99) 99999-9999',
      placeholder: '(xx) 9xxxx-xxxx',
      order: 3,
    },
    {
      property: 'endereco',
      required: true,
      gridColumns: 12,
      order: 4,
    },
  ];

  ngOnInit(): void {
    this.clienteDTO = {
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
    };
  }

  register() {
    const clienteDTO: ClienteDTO = {
      nome: this.clienteDTO.nome,
      email: EmailVO.create(this.clienteDTO.email).value,
      telefone: TelefoneVO.create(this.clienteDTO.telefone).value,
      endereco: this.clienteDTO.endereco,
    };

    this.clienteService.register(clienteDTO).subscribe({
      next: (res) => {
        this.poNotification.success('Cliente cadastrado com sucesso');
        this.redirect();
      },
      error: (res) => {
        this.poNotification.error(
          `Erro ao cadastrar cliente ${res.toString()}`
        );
      },
    });
  }

  redirect() {
    this.router.navigate(['/signin']);
  }
}
