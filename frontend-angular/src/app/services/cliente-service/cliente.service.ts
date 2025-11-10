import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../../config/api/api.routes';
import { map, Observable } from 'rxjs';
import ClienteEntity from '../../domain/cliente.entity';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  _clienteRoutes = ApiRoutes.clientes;

  constructor(private httpCliente: HttpClient) {}

  findOneByEmail(email: string): Observable<ClienteEntity> {
    return this.httpCliente
      .get<ClienteEntity>(this._clienteRoutes.findOneByEmail(email))
      .pipe(
        map((user) => {
          return user;
        })
      );
  }
}
