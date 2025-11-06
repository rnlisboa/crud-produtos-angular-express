import { container } from "tsyringe";
import ClienteRepository from "../cliente/repository/cliente.repository.js";
import IClienteRepository from "../../modules/cliente/interfaces/iclienteRepository.interface.js";
import { Cliente } from "../../config/database/models/cliente.model.js";
import ProdutoRepository from "../produto/repository/produto.repository.js";
import IProdutoRepository from "../produto/interfaces/iprodutoRepository.interface.js";
import { Produto } from "../../config/database/models/produto.model.js";
import { Pedido } from "../../config/database/models/pedido.model.js";
import IPedidoRepository from "../pedido/interfaces/ipedidoRepository.interface.js";
import PedidoRepository from "../pedido/repository/pedido.repository.js";
import { PedidoItem } from "../../config/database/models/pedido-item.model.js";
import PedidoItemRepository from "../pedido/repository/pedido-item.repository.js";
import IPedidoItemRepository from "../pedido/interfaces/ipedidoItemRepository.interface.js";

container.registerInstance("ClienteModel", Cliente);
container.register<IClienteRepository>("IClienteRepository", {
  useClass: ClienteRepository,
});

container.registerInstance("PedidoModel", Pedido);
container.register<IPedidoRepository>("IPedidoRepository", {
  useClass: PedidoRepository,
});

container.registerInstance("PedidoItemModel", PedidoItem);
container.register<IPedidoItemRepository>("IPedidoItemRepository", {
  useClass: PedidoItemRepository,
});

container.registerInstance("ProdutoModel", Produto);
container.register<IProdutoRepository>("IProdutoRepository", {
  useClass: ProdutoRepository,
});
