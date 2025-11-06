import { Request, Response } from "express";
import ClienteService from "../service/cliente.service.js";
import { injectable } from "tsyringe";
import ClienteEntity from "../entity/cliente.entity.js";

@injectable()
export default class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  public async create(req: Request, res: Response) {
    const cliente = await this.clienteService.create(req.body);
    const response = {
      cliente,
      message: "Cliente criado com sucesso!",
    };
    return res.status(201).send(response).json();
  }

  public async findOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do cliente não informado");
    }

    const cliente = await this.clienteService.findOne(id);
    return res.status(200).json({ cliente });
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados: Partial<ClienteEntity> = req.body;
      if (!id) {
        return res.status(400).json({ message: "ID do cliente é obrigatório" });
      }

      const clienteAtualizado = await this.clienteService.update(id, dados);

      if (!clienteAtualizado) {
        return res
          .status(404)
          .json({ message: "Cliente não encontrado para atualização" });
      }

      return res.status(200).json({
        message: "Cliente atualizado com sucesso!",
        cliente: clienteAtualizado,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      return res.status(500).json({
        message: "Erro ao atualizar cliente",
        error: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Id do cliente não informado");
    }

    const clientes = await this.clienteService.delete(id);
    return res.status(200).json({ clientes });
  }

  public async findAll(req: Request, res: Response) {
    const clientes = await this.clienteService.findAll();
    return res.status(200).send(clientes).json();
  }
}
