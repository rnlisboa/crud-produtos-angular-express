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
}
