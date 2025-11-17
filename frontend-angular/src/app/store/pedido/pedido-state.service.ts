import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PedidoResponse } from '../../interfaces/response/pedido-response';

@Injectable({
  providedIn: 'root',
})
export class PedidoStateService {
  private readonly _pedidos$ = new BehaviorSubject<{ pedido?: PedidoResponse }>(
    {}
  );

  constructor() {
    const stored = localStorage.getItem('pedido-processando');
    if (stored) {
      this._pedidos$.next(JSON.parse(stored));
    }
  }

  public readonly pedidos$: Observable<{ pedido?: PedidoResponse }> =
    this._pedidos$.asObservable();

  public get pedidos(): { pedido?: PedidoResponse } {
    return this._pedidos$.getValue();
  }

  public setPedidos(pedidos: { pedido: PedidoResponse }): void {
    this._pedidos$.next(pedidos);
    localStorage.setItem('pedido-processando', JSON.stringify(pedidos));
  }
}
