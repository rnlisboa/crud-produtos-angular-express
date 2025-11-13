import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PedidoResponse } from '../../interfaces/response/pedido-response';

@Injectable({
  providedIn: 'root',
})
export class PedidoStateService {
  private readonly _pedidos$ = new BehaviorSubject<
    { pedido: PedidoResponse }[]
  >([]);

  public readonly pedidos$: Observable<{ pedido: PedidoResponse }[]> =
    this._pedidos$.asObservable();

  public get pedidos(): { pedido: PedidoResponse }[] {
    return this._pedidos$.getValue();
  }

  public setPedidos(pedidos: { pedido: PedidoResponse }[]): void {
    this._pedidos$.next(pedidos);
  }

  public addPedido(novoPedido: { pedido: PedidoResponse }): void {
    const pedidosAtuais = this.pedidos;
    this._pedidos$.next([...pedidosAtuais, novoPedido]);
  }

  public removePedido(id: string): void {
    const pedidosFiltrados = this.pedidos.filter(
      (p) => p.pedido.pedidoDetalhe.id !== id
    );
    this._pedidos$.next(pedidosFiltrados);
  }
}
