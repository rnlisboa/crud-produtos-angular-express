import * as sequelize from "sequelize";
import { inject, injectable } from "tsyringe";
import IPedidoItemRepository from "../interfaces/ipedidoItemRepository.interface.js";
import { PedidoItem } from "../../../config/database/models/pedido-item.model.js";
import PedidoItemEntity from "../entity/pedido-item.entity";
import { Transaction } from "sequelize";
import { Produto } from "../../../config/database/models/produto.model.js";

@injectable()
export default class PedidoItemRepository implements IPedidoItemRepository {
  constructor(
    @inject("PedidoItemModel")
    private readonly pedidoItemModel: sequelize.ModelStatic<PedidoItem> = PedidoItem
  ) {}

  public async findOne(id: string): Promise<PedidoItemEntity | null> {
    PedidoItem.belongsTo(Produto, {
      foreignKey: "produtoId",
      as: "produto",
    });

    const pedidoItem = await this.pedidoItemModel.findByPk(id, {
      include: [
        {
          model: Produto,
          as: "produto",
        },
      ],
    });
    return pedidoItem;
  }

  public async findByPedidoId(
    pedidoId: string,
    campos?: string[]
  ): Promise<PedidoItemEntity[]> {
    const options: any = {
      where: { pedidoId },
    };

    if (campos) {
      options.attributes = campos;
    }

    return this.pedidoItemModel.findAll(options);
  }

  public async update(
    id: string,
    dados: Partial<PedidoItemEntity>
  ): Promise<PedidoItemEntity | null> {
    const pedidoItem = await this.pedidoItemModel.findByPk(id);
    if (!pedidoItem) return null;

    await pedidoItem.update(dados);
    return pedidoItem;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.pedidoItemModel.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }

  public async findAll(): Promise<Array<PedidoItemEntity>> {
    return await this.pedidoItemModel.findAll();
  }

  public async create(
    Pedido: PedidoItemEntity,
    transaction?: Transaction
  ): Promise<PedidoItemEntity> {
    const novoPedido = await this.pedidoItemModel.create(Pedido, {
      transaction: transaction ?? null,
    });
    return novoPedido.toJSON() as PedidoItemEntity;
  }
}
