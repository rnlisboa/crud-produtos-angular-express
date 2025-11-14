import { Injectable } from '@angular/core';
import { ApiRoutes } from '../../config/api/api.routes';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import ProdutoEntity from '../../interfaces/domain/produto.entity';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private _produtoRoutes = ApiRoutes.produtos;

  constructor(private httpCliente: HttpClient) {}

  findAll(): Observable<ProdutoEntity[]> {
    return this.httpCliente
      .get<ProdutoEntity[]>(this._produtoRoutes.findAll)
      .pipe(
        map((produtos) => {
          return produtos;
        })
      );
  }

  create(
    produto: Partial<ProdutoEntity>
  ): Observable<{ Produto: ProdutoEntity; message: string }> {
    return this.httpCliente
      .post<{ Produto: ProdutoEntity; message: string }>(
        this._produtoRoutes.create,
        produto
      )
      .pipe(map((res) => res));
  }

  update(
    id: string,
    produto: Partial<ProdutoEntity>
  ): Observable<{ Produto: ProdutoEntity; message: string }> {
    return this.httpCliente
      .put<{ Produto: ProdutoEntity; message: string }>(
        this._produtoRoutes.update(id),
        produto
      )
      .pipe(map((res) => res));
  }
}
