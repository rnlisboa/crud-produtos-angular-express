import { StatusPedido } from '../../enum/status-pedido.enum';
import { ProdutoPedidoDTO } from './produto-pedido.dto';

export type CriarPedidoDTO = {
  produtos: Array<ProdutoPedidoDTO>;
  clienteId: string;
  status: StatusPedido;
};
