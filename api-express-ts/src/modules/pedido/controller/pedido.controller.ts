import { Request, Response } from "express";

import { injectable } from "tsyringe";
import PedidoService from "../service/pedido.service.js";
import PedidoEntity, { StatusPedido } from "../entity/pedido.entity.js";
import PedidoItemEntity, {
  ProdutoPedidoDTO,
} from "../entity/pedido-item.entity.js";

type CriarPedidoDTO = {
  produtos: Array<ProdutoPedidoDTO>;
  clienteId: string;
  status: StatusPedido;
};

@injectable()
export default class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

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

  private calcularTotal(produtos: ProdutoPedidoDTO[]): number {
    const total: number = produtos.reduce(
      (accumulator, currentValue) => accumulator * currentValue.preco,
      0
    );

    return total;
  }
}
