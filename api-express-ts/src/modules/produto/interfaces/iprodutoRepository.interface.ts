import ProdutoEntity from "../entity/produto.entity.js";

export default interface IProdutoRepository {
  create(Produto: ProdutoEntity): Promise<ProdutoEntity>;
  findAll(): Promise<Array<ProdutoEntity>>;
}
