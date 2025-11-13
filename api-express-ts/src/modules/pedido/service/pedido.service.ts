import { inject, injectable } from "tsyringe";
import PedidoEntity from "../entity/pedido.entity.js";
import type IPedidoRepository from "../interfaces/ipedidoRepository.interface.js";
import type IPedidoItemRepository from "../interfaces/ipedidoItemRepository.interface.js";
import PedidoItemEntity from "../entity/pedido-item.entity.js";
import { Transaction } from "sequelize";

type PedidoResponse = {
  pedidoDetalhe: PedidoEntity;
  itens: PedidoItemEntity[];
};

@injectable()
export default class PedidoService {
  constructor(
    @inject("IPedidoRepository")
    private readonly pedidoRepository: IPedidoRepository,
    @inject("IPedidoItemRepository")
    private readonly pedidoItemRepository: IPedidoItemRepository
  ) {}

  public async create(
    Pedido: PedidoEntity,
    transaction?: Transaction
  ): Promise<PedidoEntity> {
    const pedido = await this.pedidoRepository.create(Pedido, transaction);

    return pedido;
  }

  public async createPedidoItem(
    item: PedidoItemEntity,
    transaction?: Transaction
  ) {
    const newItem = await this.pedidoItemRepository.create(item, transaction);
    return newItem;
  }

  public async findAll(): Promise<{ pedido: PedidoResponse }[]> {
    const pedidos = await this.pedidoRepository.findAll();
    const pedidosComItens = await Promise.all(
      pedidos.map(async (pedido) => {
        const itens = await this.pedidoItemRepository.findByPedidoId(pedido.id);

        return {
          pedido: {
            pedidoDetalhe: pedido,
            itens,
          },
        };
      })
    );

    return pedidosComItens;
  }

  public async findOne(id: string): Promise<PedidoResponse | null> {
    const pedido = await this.pedidoRepository.findOne(id);
    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }

    const itens = await this.pedidoItemRepository.findByPedidoId(id);

    return {
      pedidoDetalhe: pedido,
      itens,
    };
  }

  public async update(
    id: string,
    dados: Partial<PedidoEntity>,
    transaction?: Transaction
  ): Promise<PedidoEntity | null> {
    const pedido = await this.pedidoRepository.update(id, dados, transaction);
    return pedido;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.pedidoRepository.delete(id);

    return deletedCount;
  }

  public async deleteAllPedidos() {
    return await this.pedidoRepository.deleteAll();
  }

  public async recaulcularPedido(pedidoId: string): Promise<void> {
    const itens = await this.pedidoItemRepository.findByPedidoId(pedidoId, [
      "quantidade",
      "precoUnitario",
    ]);

    const quantidade = itens.reduce((acc, item) => acc + item.quantidade, 0);
    const total = itens.reduce(
      (acc, item) => acc + Number(item.precoUnitario) * item.quantidade,
      0
    );

    await this.pedidoRepository.update(pedidoId, { quantidade, total });
  }
}
