import { Request, Response } from "express";

import { injectable } from "tsyringe";
import PedidoService from "../service/pedido.service.js";
import PedidoEntity, { StatusPedido } from "../entity/pedido.entity.js";
import PedidoItemEntity, {
  ProdutoPedidoDTO,
} from "../entity/pedido-item.entity.js";
import PedidoItemService from "../service/pedido-item.service.js";
import ProdutoService from "../../produto/service/produto.service.js";
import { sequelize } from "../../../config/database/database.js";

type CriarPedidoDTO = {
  produtos: Array<ProdutoPedidoDTO>;
  clienteId: string;
  status: StatusPedido;
};

@injectable()
export default class PedidoController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly pedidoItemService: PedidoItemService,
    private readonly produtoService: ProdutoService
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
    const quantidadeTotal = this.calcularQuantidade(produtos);
    const newPedido = {
      clienteId: requestBody.clienteId,
      quantidade: quantidadeTotal,
      total,
      status: StatusPedido.PROCESSANDO,
    } as PedidoEntity;

    const transaction = await sequelize.transaction();

    try {
      const pedido = await this.pedidoService.create(newPedido, transaction);
      await Promise.all(
        produtos.map((item) => {
          const newItem = {
            pedidoId: pedido.id,
            produtoId: item.id,
            quantidade: item.quantidade,
            precoUnitario: item.preco,
          } as PedidoItemEntity;

          return this.pedidoService.createPedidoItem(newItem, transaction);
        })
      );

      await transaction.commit();

      const response = {
        pedido,
        message: "Pedido criado com sucesso!",
      };
      return res.status(201).send(response).json();
    } catch (e) {
      await transaction.rollback();
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

  // altera entidade pedido em quantidade e total
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

      await this.pedidoService.recaulcularPedido(PedidoItem.pedidoId);

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

  // altera entidade pedido em quantidade e total
  public async deletePedidoItem(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do item não informado");
    }

    const item = await this.pedidoItemService.findOne(id);

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }

    const pedidoId = item.pedidoId;

    const isDeleted = await this.pedidoItemService.delete(id);
    if (!isDeleted) {
      return res.status(400).json({ message: "Erro ao deletar item!" });
    }

    await this.pedidoService.recaulcularPedido(pedidoId);

    return res.status(200).json({ message: "item deletado com sucesso!" });
  }

  // altera entidade pedido em quantidade e total
  public async addItemtoPedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produtos: ProdutoPedidoDTO[] = req.body;
      if (!produtos) {
        return res
          .status(400)
          .json({ message: "Produtos enviados incorretamente" });
      }

      if (!id) {
        return res.status(400).json({ message: "ID do pedido é obrigatório" });
      }

      await Promise.all(
        produtos.map((item) => {
          const newItem = {
            pedidoId: id,
            produtoId: item.id,
            quantidade: item.quantidade,
            precoUnitario: item.preco,
          } as PedidoItemEntity;

          return this.pedidoService.createPedidoItem(newItem);
        })
      );

      this.pedidoService.recaulcularPedido(id);

      return res
        .status(201)
        .json({ message: "Produtos adicionados ao pedido" });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Erro ao adicionar item ao pedido" });
    }
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
      const dados: Partial<PedidoEntity> = req.body;
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

    const isDeleted = await this.pedidoService.delete(id);
    if (!isDeleted) {
      return res.status(400).json({ message: "Erro ao deletar pedido!" });
    }
    return res.status(200).json({ message: "Pedido deletado com sucesso!" });
  }

  public async concluirPedido(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id do pedido não informado" });
    }

    const transaction = await sequelize.transaction();

    try {
      const pedido = await this.pedidoService.update(
        id,
        { status: StatusPedido.CONCLUIDO },
        transaction
      );

      if (!pedido) {
        await transaction.rollback();
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      const itens = await this.pedidoItemService.findByPedidoId(pedido.id);

      for (const item of itens) {
        const produto = await this.produtoService.findOne(item.produtoId);

        if (!produto) {
          await transaction.rollback();
          return res.status(404).json({ message: "Produto não encontrado" });
        }

        const estoqueAtualizado = produto.estoque - item.quantidade;

        if (estoqueAtualizado < 0) {
          await transaction.rollback();
          return res
            .status(400)
            .json({ message: "Produto sem estoque suficiente" });
        }

        await this.produtoService.update(
          produto.id,
          { estoque: estoqueAtualizado },
          transaction
        );
      }

      await transaction.commit();
      return res.status(200).json({ message: "Pedido concluído com sucesso" });
    } catch (e) {
      await transaction.rollback();
      console.error(e);
      return res.status(500).json({ message: "Erro ao concluir pedido" });
    }
  }

  private calcularTotal(produtos: ProdutoPedidoDTO[]): number {
    const total: number = produtos.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.preco * currentValue.quantidade,
      0
    );

    return total;
  }

  private calcularQuantidade(produtos: ProdutoPedidoDTO[]): number {
    const qunatidade: number = produtos.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantidade,
      0
    );

    return qunatidade;
  }
}
