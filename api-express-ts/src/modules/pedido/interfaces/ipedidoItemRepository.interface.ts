import PedidoItemEntity from "../entity/pedido-item.entity.js";

export default interface IPedidoItemRepository {
  create(pedido: PedidoItemEntity): Promise<PedidoItemEntity>;
  findAll(): Promise<Array<PedidoItemEntity>>;
}
