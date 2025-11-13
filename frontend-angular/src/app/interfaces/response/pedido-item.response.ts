import ProdutoEntity from '../domain/produto.entity';

export interface PedidoItemResponse {
  id: string;
  pedidoId: string;
  produto: ProdutoEntity;
  quantidade: number;
  precoUnitario: number;
  subtotal?: number;
}
