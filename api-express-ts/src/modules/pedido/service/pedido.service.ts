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

  public async findOne(id: string): Promise<PedidoEntity | null> {
    const pedido = await this.pedidoRepository.findOne(id);
    return pedido;
  }

  public async update(
    id: string,
    dados: Partial<PedidoEntity>
  ): Promise<PedidoEntity | null> {
    const pedido = await this.pedidoRepository.update(id, dados);
    return pedido;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.pedidoRepository.delete(id);

    return deletedCount;
  }

  public async deleteAllPedidos() {
    return await this.pedidoRepository.deleteAll();
  }
}
