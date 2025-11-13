import { StatusPedido } from "../../enum/status-pedido.enum";

export default interface PedidoEntity {
  id: string;
  clienteId: string;
  quantidade: number;
  data?: Date;
  total: number;
  status?: StatusPedido;
}
