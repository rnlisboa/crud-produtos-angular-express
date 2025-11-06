import ProdutoEntity from "../entity/produto.entity.js";

export default interface IProdutoRepository {
  create(Produto: ProdutoEntity): Promise<ProdutoEntity>;
  findAll(): Promise<Array<ProdutoEntity>>;
  findOne(id: string): Promise<ProdutoEntity | null>;
  update(
    id: string,
    dados: Partial<ProdutoEntity>
  ): Promise<ProdutoEntity | null>;
  delete(id: string): Promise<boolean>;
}
