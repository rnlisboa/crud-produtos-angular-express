import { inject, injectable } from "tsyringe";
import type IPedidoItemRepository from "../interfaces/ipedidoItemRepository.interface.js";
import PedidoItemEntity from "../entity/pedido-item.entity.js";

@injectable()
export default class PedidoItemService {
  constructor(
    @inject("IPedidoItemRepository")
    private readonly pedidoItemRepository: IPedidoItemRepository
  ) {}

  public async create(PedidoItem: PedidoItemEntity): Promise<PedidoItemEntity> {
    return this.pedidoItemRepository.create(PedidoItem);
  }

  public async findOne(id: string): Promise<PedidoItemEntity | null> {
    const PedidoItem = await this.pedidoItemRepository.findOne(id);
    return PedidoItem;
  }

  public async update(
    id: string,
    dados: Partial<PedidoItemEntity>
  ): Promise<PedidoItemEntity | null> {
    const PedidoItem = await this.pedidoItemRepository.update(id, dados);
    return PedidoItem;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.pedidoItemRepository.delete(id);

    return deletedCount;
  }

  public async findAll(): Promise<Array<PedidoItemEntity>> {
    return await this.pedidoItemRepository.findAll();
  }
}
