import { Transaction } from "sequelize";
import PedidoEntity from "../entity/pedido.entity.js";

export default interface IPedidoRepository {
  create(pedido: PedidoEntity): Promise<PedidoEntity>;
  findAll(): Promise<Array<PedidoEntity>>;
  deleteAll(): Promise<number>;
  findOne(id: string): Promise<PedidoEntity | null>;
  update(
    id: string,
    dados: Partial<PedidoEntity>,
    transaction?: Transaction
  ): Promise<PedidoEntity | null>;
  delete(id: string): Promise<boolean>;
}
