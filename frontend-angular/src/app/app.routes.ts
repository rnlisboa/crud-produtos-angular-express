import { Routes } from '@angular/router';
import { ClientesComponent } from './modules/clientes/clientes.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { SigninComponent } from './modules/signin/signin.component';
import { ProdutosComponent } from './modules/produtos/produtos.component';
import { PedidosComponent } from './modules/pedidos/pedidos.component';
import { SignupComponent } from './modules/signup/signup.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
];
