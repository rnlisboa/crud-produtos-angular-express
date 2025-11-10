import { Routes } from '@angular/router';
import { ClientesComponent } from './modules/clientes/clientes.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { SigninComponent } from './modules/signin/signin.component';
import { ProdutosComponent } from './modules/produtos/produtos.component';
import { PedidosComponent } from './modules/pedidos/pedidos.component';

export const routes: Routes = [
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
];
