import ProdutoEntity from "../../produto/entity/produto.entity.js";

export default interface PedidoItemEntity {
  id: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  subtotal?: number;
}

export interface PedidoItemResponse {
  id: string;
  pedidoId: string;
  produto: ProdutoEntity;
  quantidade: number;
  precoUnitario: number;
  subtotal?: number;
}

export type ProdutoPedidoDTO = Pick<ProdutoEntity, "id" | "preco"> & {
  quantidade: number;
};
