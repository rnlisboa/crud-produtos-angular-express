import PedidoItemEntity from "../entity/pedido-item.entity.js";

export default interface IPedidoItemRepository {
  create(pedido: PedidoItemEntity): Promise<PedidoItemEntity>;
  findAll(): Promise<Array<PedidoItemEntity>>;
  findByPedidoId(
    pedidoId: string,
    campos?: string[]
  ): Promise<PedidoItemEntity[]>;
  findOne(id: string): Promise<PedidoItemEntity | null>;
  update(
    id: string,
    dados: Partial<PedidoItemEntity>
  ): Promise<PedidoItemEntity | null>;
  delete(id: string): Promise<boolean>;
}
