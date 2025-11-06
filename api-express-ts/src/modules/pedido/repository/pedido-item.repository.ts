import * as sequelize from "sequelize";
import { inject, injectable } from "tsyringe";
import IPedidoItemRepository from "../interfaces/ipedidoItemRepository.interface.js";
import { PedidoItem } from "../../../config/database/models/pedido-item.model.js";
import PedidoItemEntity from "../entity/pedido-item.entity";
import { Transaction } from "sequelize";

@injectable()
export default class PedidoItemRepository implements IPedidoItemRepository {
  constructor(
    @inject("PedidoItemModel")
    private readonly pedidoItemModel: sequelize.ModelStatic<PedidoItem> = PedidoItem
  ) {}

  public async findAll(): Promise<Array<PedidoItemEntity>> {
    return await this.pedidoItemModel.findAll();
  }

  public async create(Pedido: PedidoItemEntity): Promise<PedidoItemEntity> {
    const novoPedido = await this.pedidoItemModel.create(Pedido);
    return novoPedido.toJSON() as PedidoItemEntity;
  }
}
