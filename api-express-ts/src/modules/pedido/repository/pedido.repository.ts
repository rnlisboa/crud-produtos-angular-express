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
    private readonly pedidoModel: sequelize.ModelStatic<Pedido> = Pedido
  ) {}
  public async findAll(): Promise<Array<PedidoEntity>> {
    return await this.pedidoModel.findAll();
  }

  public async create(Pedido: PedidoEntity): Promise<PedidoEntity> {
    const novoPedido = await this.pedidoModel.create(Pedido);
    return novoPedido.toJSON() as PedidoEntity;
  }

  public async deleteAll(): Promise<number> {
    const [results, metadata] = await sq.query(`DELETE from "Pedidos"`);
    return metadata as number;
  }

  public async findOne(id: string): Promise<PedidoEntity | null> {
    const pedido = await this.pedidoModel.findByPk(id);
    return pedido;
  }

  public async update(
    id: string,
    dados: Partial<PedidoEntity>
  ): Promise<PedidoEntity | null> {
    const pedido = await this.pedidoModel.findByPk(id);
    if (!pedido) return null;

    await pedido.update(dados);
    return pedido;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.pedidoModel.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }
}
