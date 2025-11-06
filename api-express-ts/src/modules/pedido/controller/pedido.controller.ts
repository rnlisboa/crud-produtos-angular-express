import { Request, Response } from "express";

import { injectable } from "tsyringe";
import PedidoService from "../service/pedido.service.js";
import PedidoEntity, { StatusPedido } from "../entity/pedido.entity.js";
import PedidoItemEntity, {
  ProdutoPedidoDTO,
} from "../entity/pedido-item.entity.js";
import PedidoItemService from "../service/pedido-item.service.js";

type CriarPedidoDTO = {
  produtos: Array<ProdutoPedidoDTO>;
  clienteId: string;
  status: StatusPedido;
};

@injectable()
export default class PedidoController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly pedidoItemService: PedidoItemService
  ) {}

  public async create(req: Request, res: Response) {
    const requestBody: CriarPedidoDTO = req.body;
    const produtos: ProdutoPedidoDTO[] = requestBody.produtos;
    const quantidade: number = produtos.length;

    if (quantidade === 0) {
      return res
        .status(400)
        .send({ message: "Quantidade de produtos deve ser maior que 0" })
        .json();
    }

    const total = this.calcularTotal(produtos);
    const newPedido = {
      clienteId: requestBody.clienteId,
      quantidade,
      total,
      status: StatusPedido.PROCESSANDO,
    } as PedidoEntity;

    try {
      const pedido = await this.pedidoService.create(newPedido);
      await Promise.all(
        produtos.map((item) => {
          const newItem = {
            pedidoId: pedido.id,
            produtoId: item.id,
            quantidade: item.quantidade,
            precoUnitario: item.preco,
          } as PedidoItemEntity;

          return this.pedidoService.createPedidoItem(newItem);
        })
      );

      const response = {
        pedido,
        message: "Pedido criado com sucesso!",
      };
      return res.status(201).send(response).json();
    } catch (e) {
      const response = {
        message: "Erro ao criar pedido",
      };
      return res.status(400).send(response).json();
    }
  }

  public async findAll(req: Request, res: Response) {
    const Pedidos = await this.pedidoService.findAll();
    return res.status(200).send(Pedidos).json();
  }

  public async deleteAll(req: Request, res: Response) {
    const num = await this.pedidoService.deleteAllPedidos();
    return res
      .status(400)
      .send({ message: `${num} de pedidos deletados` })
      .json();
  }

  /**PEDIDO ITEM */

  public async findOnePedidoItem(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do item não informado");
    }

    const item = await this.pedidoItemService.findOne(id);
    return res.status(200).json({ item });
  }

  public async updatePedidoItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados: Partial<PedidoItemEntity> = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID do item é obrigatório" });
      }

      const PedidoItem = await this.pedidoItemService.update(id, dados);

      if (!PedidoItem) {
        return res
          .status(404)
          .json({ message: "Item não encontrado para atualização" });
      }

      return res.status(200).json({
        message: "Item atualizado com sucesso!",
        item: PedidoItem,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar Item:", error);
      return res.status(500).json({
        message: "Erro ao atualizar Item",
        error: error.message,
      });
    }
  }

  public async deletePedidoItem(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do item não informado");
    }

    const item = await this.pedidoItemService.delete(id);
    return res.status(200).json({ item });
  }

  /** PEDIDO */
  public async findOnePedido(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do pedido não informado");
    }

    const pedido = await this.pedidoService.findOne(id);
    return res.status(200).json({ pedido });
  }

  public async updatePedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados: Partial<PedidoItemEntity> = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID do pedido é obrigatório" });
      }

      const pedido = await this.pedidoService.update(id, dados);

      if (!pedido) {
        return res
          .status(404)
          .json({ message: "Pedido não encontrado para atualização" });
      }

      return res.status(200).json({
        message: "pedido atualizado com sucesso!",
        item: pedido,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar pedido:", error);
      return res.status(500).json({
        message: "Erro ao atualizar pedido",
        error: error.message,
      });
    }
  }

  public async deletePedido(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do pedido não informado");
    }

    const pedido = await this.pedidoService.delete(id);
    return res.status(200).json({ pedido });
  }

  private calcularTotal(produtos: ProdutoPedidoDTO[]): number {
    const total: number = produtos.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.preco * currentValue.quantidade,
      0
    );

    return total;
  }
}
