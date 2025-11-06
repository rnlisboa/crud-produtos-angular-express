import PedidoEntity from "../entity/pedido.entity.js";

export default interface IPedidoRepository {
  create(pedido: PedidoEntity): Promise<PedidoEntity>;
  findAll(): Promise<Array<PedidoEntity>>;
  deleteAll(): Promise<number>;
}
