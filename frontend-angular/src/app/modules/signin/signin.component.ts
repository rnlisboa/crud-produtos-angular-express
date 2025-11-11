import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  AuthService,
  Credentials,
} from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { CredentialsVO } from '../../value-objects/credentials.vo';
import {
  PoDynamicFormField,
  PoNotificationService,
} from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.less',
})
export class SigninComponent implements OnInit {
  poNotification = inject(PoNotificationService);

  credentials!: Credentials;

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
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.credentials = {
      nome: '',
      email: '',
    };
  }

  login() {
    const credentials: CredentialsVO = CredentialsVO.create(
      this.credentials.nome,
      this.credentials.email
    );
    this.authService.login(credentials);
  }

  redirect() {
    this.router.navigate(['/signup']);
  }
}
