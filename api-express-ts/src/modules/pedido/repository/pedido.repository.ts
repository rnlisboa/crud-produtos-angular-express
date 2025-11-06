import * as sequelize from "sequelize";
import { sequelize as sq } from "../../../config/database/database.js";

import { inject, injectable } from "tsyringe";
import IPedidoRepository from "../interfaces/ipedidoRepository.interface.js";
import { Pedido } from "../../../config/database/models/pedido.model.js";
import PedidoEntity from "../entity/pedido.entity.js";

@injectable()
export default class PedidoRepository implements IPedidoRepository {
  constructor(
    @inject("PedidoModel")
    private readonly PedidoModel: sequelize.ModelStatic<Pedido> = Pedido
  ) {}

  public async findAll(): Promise<Array<PedidoEntity>> {
    return await this.PedidoModel.findAll();
  }

  public async create(Pedido: PedidoEntity): Promise<PedidoEntity> {
    const novoPedido = await this.PedidoModel.create(Pedido);
    return novoPedido.toJSON() as PedidoEntity;
  }

  public async deleteAll(): Promise<number> {
    const [results, metadata] = await sq.query(`DELETE from "Pedidos"`);
    return metadata as number;
  }
}
