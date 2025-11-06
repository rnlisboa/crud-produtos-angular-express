import { Request, Response } from "express";
import { injectable } from "tsyringe";
import ProdutoService from "../service/produto.service.js";

@injectable()
export default class ProdutoController {
  constructor(private readonly ProdutoService: ProdutoService) {}

  public async create(req: Request, res: Response) {
    const Produto = await this.ProdutoService.create(req.body);
    const response = {
      Produto,
      message: "Produto criado com sucesso!",
    };
    return res.status(201).send(response).json();
  }

  public async findAll(req: Request, res: Response) {
    const Produtos = await this.ProdutoService.findAll();
    return res.status(200).send(Produtos).json();
  }
}
