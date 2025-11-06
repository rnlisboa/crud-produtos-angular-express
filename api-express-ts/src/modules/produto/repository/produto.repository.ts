import * as sequelize from "sequelize";
import { Produto } from "../../../config/database/models/produto.model.js";
import { inject, injectable } from "tsyringe";
import IProdutoRepository from "../interfaces/iprodutoRepository.interface.js";
import ProdutoEntity from "../entity/produto.entity.js";

@injectable()
export default class ProdutoRepository implements IProdutoRepository {
  constructor(
    @inject("ProdutoModel")
    private readonly produtoModel: sequelize.ModelStatic<Produto> = Produto
  ) {}

  public async findAll(): Promise<Array<ProdutoEntity>> {
    return await this.produtoModel.findAll();
  }

  public async create(Produto: ProdutoEntity): Promise<ProdutoEntity> {
    const novoProduto = await this.produtoModel.create(Produto);
    return novoProduto.toJSON() as ProdutoEntity;
  }
}
