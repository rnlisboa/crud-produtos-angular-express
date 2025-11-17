import { Injectable } from '@angular/core';
import { ApiRoutes } from '../../config/api/api.routes';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { PedidoResponse } from '../../interfaces/response/pedido-response';
import { PedidoStateService } from '../../store/pedido/pedido-state.service';
import { CriarPedidoDTO } from '../../interfaces/dto/criar-pedido.dto';
import PedidoEntity from '../../interfaces/domain/pedido.entity';
import { ProdutoPedidoDTO } from '../../interfaces/dto/produto-pedido.dto';
import PedidoItemEntity from '../../interfaces/domain/pedido-item.entity';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private _pedidosRoutes = ApiRoutes.pedidos;

  constructor(
    private httpCliente: HttpClient,
    private pedidoState: PedidoStateService
  ) {}

  findAll(): Observable<{ pedido: PedidoResponse }[]> {
    return this.httpCliente
      .get<{ pedido: PedidoResponse }[]>(this._pedidosRoutes.findAll)
      .pipe(
        tap((pedidos) => {
          this.pedidoState.setPedidos(pedidos);
        }),
        map((pedidos) => {
          return pedidos;
        })
      );
  }

  create(
    criarPedidoDTO: CriarPedidoDTO
  ): Observable<{ pedido: PedidoResponse; message: string }> {
    return this.httpCliente
      .post<{ pedido: PedidoResponse; message: string }>(
        this._pedidosRoutes.create,
        criarPedidoDTO
      )
      .pipe(map((res) => res));
  }

  addItemtoPedido(
    id: string,
    itens: ProdutoPedidoDTO[]
  ): Observable<{ message: string }> {
    return this.httpCliente
      .post<{ message: string }>(this._pedidosRoutes.addItem(id), itens)
      .pipe(map((res) => res));
  }

  editarQuantidadeItemPedido(
    id: string,
    quantidade: number
  ): Observable<{ item: PedidoEntity; message: string }> {
    return this.httpCliente.put<{ item: PedidoEntity; message: string }>(
      this._pedidosRoutes.item.update(id),
      { quantidade }
    );
  }

  deleteItem(id: string): Observable<{ message: string }> {
    return this.httpCliente
      .delete<{ message: string }>(this._pedidosRoutes.item.delete(id))
      .pipe(map((res) => res));
  }

  findOne(id: string): Observable<{ pedido: PedidoResponse }> {
    return this.httpCliente
      .get<{ pedido: PedidoResponse }>(this._pedidosRoutes.findOne(id))
      .pipe(map((res) => res));
  }

  updateItem(
    id: string,
    quantidade: number
  ): Observable<{ message: string; item: PedidoItemEntity }> {
    return this.httpCliente
      .put<{ message: string; item: PedidoItemEntity }>(
        this._pedidosRoutes.item.update(id),
        { quantidade }
      )
      .pipe(map((res) => res));
  }

  concluirPedido(id: string): Observable<{ message: string }> {
    return this.httpCliente
      .put<{ message: string }>(this._pedidosRoutes.concluir(id), {})
      .pipe(map((res) => res));
  }
}
