import { Request, Response } from "express";
import ClienteService from "../service/cliente.service.js";
import { injectable } from "tsyringe";

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

  public async findAll(req: Request, res: Response) {
    const clientes = await this.clienteService.findAll();
    return res.status(200).send(clientes).json();
  }
}
