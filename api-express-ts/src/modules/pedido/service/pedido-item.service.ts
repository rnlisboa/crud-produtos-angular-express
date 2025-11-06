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

  public async findAll(): Promise<Array<PedidoItemEntity>> {
    return await this.pedidoItemRepository.findAll();
  }
}