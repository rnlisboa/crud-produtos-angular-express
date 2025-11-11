import ProdutoEntity from '../domain/produto.entity';

export type ProdutoDTO = Omit<ProdutoEntity, 'id'>;
