import { inject, injectable } from "tsyringe";
import PedidoEntity from "../entity/pedido.entity.js";
import type IPedidoRepository from "../interfaces/ipedidoRepository.interface.js";
import type IPedidoItemRepository from "../interfaces/ipedidoItemRepository.interface.js";
import PedidoItemEntity from "../entity/pedido-item.entity.js";

@injectable()
export default class PedidoService {
  constructor(
    @inject("IPedidoRepository")
    private readonly pedidoRepository: IPedidoRepository,
    @inject("IPedidoItemRepository")
    private readonly pedidoItemRepository: IPedidoItemRepository
  ) {}

  public async create(Pedido: PedidoEntity): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.create(Pedido);

    return pedido;
  }

  public async createPedidoItem(item: PedidoItemEntity) {
    const newItem = await this.pedidoItemRepository.create(item);
    return newItem;
  }

  public async findAll(): Promise<Array<PedidoEntity>> {
    return await this.pedidoRepository.findAll();
  }

  public async deleteAllPedidos() {
    return await this.pedidoRepository.deleteAll();
  }
}
