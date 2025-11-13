import ProdutoEntity from "../domain/produto.entity";

export type ProdutoPedidoDTO = Pick<ProdutoEntity, 'id' | 'preco'> & {
  quantidade: number;
};
