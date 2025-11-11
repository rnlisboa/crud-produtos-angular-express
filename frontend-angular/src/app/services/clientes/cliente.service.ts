import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../../config/api/api.routes';
import { map, Observable } from 'rxjs';
import ClienteEntity from '../../interfaces/domain/cliente.entity';
import { ClienteDTO } from '../../interfaces/dto/cliente.dto';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private _clienteRoutes = ApiRoutes.clientes;

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

  register(cliente: ClienteDTO): Observable<ClienteEntity> {
    return this.httpCliente.post<ClienteEntity>(
      this._clienteRoutes.create,
      cliente
    );
  }

  update(
    id: string,
    cliente: Partial<ClienteEntity>
  ): Observable<ClienteEntity> {
    return this.httpCliente.put<ClienteEntity>(
      this._clienteRoutes.update(id),
      cliente
    );
  }
}
