import { inject, injectable } from "tsyringe";
import ProdutoEntity from "../entity/produto.entity.js";
import type IProdutoRepository from "../interfaces/iprodutoRepository.interface.js";

@injectable()
export default class ProdutoService {
  constructor(
    @inject("IProdutoRepository")
    private readonly produtoRepository: IProdutoRepository
  ) {}

  public async create(Produto: ProdutoEntity): Promise<ProdutoEntity> {
    return this.produtoRepository.create(Produto);
  }

  public async findOne(id: string): Promise<ProdutoEntity | null> {
    const produto = await this.produtoRepository.findOne(id);
    return produto;
  }

  public async update(
    id: string,
    dados: Partial<ProdutoEntity>
  ): Promise<ProdutoEntity | null> {
    const produto = await this.produtoRepository.update(id, dados);
    return produto;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.produtoRepository.delete(id);
    return deletedCount;
  }

  public async findAll(): Promise<Array<ProdutoEntity>> {
    return await this.produtoRepository.findAll();
  }
}
