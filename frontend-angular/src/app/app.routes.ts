import { Routes } from '@angular/router';
import { ClientesComponent } from './modules/clientes/clientes.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { SigninComponent } from './modules/signin/signin.component';
import { ProdutosComponent } from './modules/produtos/produtos.component';
import { PedidosComponent } from './modules/pedidos/pedidos.component';
import { SignupComponent } from './modules/signup/signup.component';

export const moduleRoutes: Record<string, string> = {
  clientes: 'clientes',
  produtos: 'produtos',
  pedidos: 'pedidos',
};

export const routes: Routes = [
  { path: '', redirectTo: moduleRoutes['produtos'], pathMatch: 'full' },
  {
    path: moduleRoutes['clientes'],
    component: ClientesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: moduleRoutes['produtos'],
    component: ProdutosComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: moduleRoutes['pedidos'],
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
];
