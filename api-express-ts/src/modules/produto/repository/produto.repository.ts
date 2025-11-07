import * as sequelize from "sequelize";
import { Produto } from "../../../config/database/models/produto.model.js";
import { inject, injectable } from "tsyringe";
import IProdutoRepository from "../interfaces/iprodutoRepository.interface.js";
import ProdutoEntity from "../entity/produto.entity.js";
import { Transaction } from "sequelize";

@injectable()
export default class ProdutoRepository implements IProdutoRepository {
  constructor(
    @inject("ProdutoModel")
    private readonly produtoModel: sequelize.ModelStatic<Produto> = Produto
  ) {}

  public async create(Produto: ProdutoEntity): Promise<ProdutoEntity> {
    const novoProduto = await this.produtoModel.create(Produto);
    return novoProduto.toJSON() as ProdutoEntity;
  }

  public async findOne(id: string): Promise<ProdutoEntity | null> {
    const produto = await this.produtoModel.findByPk(id);
    return produto;
  }

  public async update(
    id: string,
    dados: Partial<ProdutoEntity>,
    transaction?: Transaction
  ): Promise<ProdutoEntity | null> {
    const produto = await this.produtoModel.findByPk(id);
    if (!produto) return null;

    await produto.update(dados, { transaction: transaction ?? null });
    return produto;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.produtoModel.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }

  public async findAll(): Promise<Array<ProdutoEntity>> {
    return await this.produtoModel.findAll();
  }
}
