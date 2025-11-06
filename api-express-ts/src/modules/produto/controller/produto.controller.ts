import { Request, Response } from "express";
import { injectable } from "tsyringe";
import ProdutoService from "../service/produto.service.js";
import ProdutoEntity from "../entity/produto.entity.js";

@injectable()
export default class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  public async create(req: Request, res: Response) {
    const Produto = await this.produtoService.create(req.body);
    const response = {
      Produto,
      message: "Produto criado com sucesso!",
    };
    return res.status(201).send(response).json();
  }

  public async findOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do produto não informado");
    }

    const produto = await this.produtoService.findOne(id);
    return res.status(200).json({ produto });
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados: Partial<ProdutoEntity> = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID do produto é obrigatório" });
      }

      const produtoAtualizado = await this.produtoService.update(id, dados);

      if (!produtoAtualizado) {
        return res
          .status(404)
          .json({ message: "produto não encontrado para atualização" });
      }

      return res.status(200).json({
        message: "produto atualizado com sucesso!",
        produto: produtoAtualizado,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);
      return res.status(500).json({
        message: "Erro ao atualizar produto",
        error: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do produto não informado");
    }

    const produtos = await this.produtoService.delete(id);
    return res.status(200).json({ produtos });
  }

  public async findAll(req: Request, res: Response) {
    const Produtos = await this.produtoService.findAll();
    return res.status(200).send(Produtos).json();
  }
}
