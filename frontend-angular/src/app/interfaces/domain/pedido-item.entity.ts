export default interface PedidoItemEntity {
  id: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  subtotal?: number;
}
