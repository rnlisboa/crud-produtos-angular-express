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

  public async findAll(): Promise<Array<ProdutoEntity>> {
    return await this.produtoRepository.findAll();
  }
}
