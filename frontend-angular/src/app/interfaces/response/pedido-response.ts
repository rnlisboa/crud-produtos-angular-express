import PedidoItemEntity from '../domain/pedido-item.entity';
import PedidoEntity from '../domain/pedido.entity';
import ProdutoEntity from '../domain/produto.entity';

export type PedidoResponse = {
  pedidoDetalhe: PedidoEntity;
  itens: PedidoItemResponse[];
};

export type PedidoItemResponse = PedidoItemEntity & { produto: ProdutoEntity };
