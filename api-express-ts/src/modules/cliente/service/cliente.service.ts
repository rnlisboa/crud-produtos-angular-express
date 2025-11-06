import { inject, injectable } from "tsyringe";
import ClienteEntity from "../entity/cliente.entity.js";
import type ICLienteRepository from "../interfaces/iclienteRepository.interface.js";

@injectable()
export default class ClienteService {
  constructor(
    @inject("IClienteRepository")
    private readonly clienteRepository: ICLienteRepository
  ) {}

  public async create(cliente: ClienteEntity): Promise<ClienteEntity> {
    return this.clienteRepository.create(cliente);
  }

  public async findAll(): Promise<Array<ClienteEntity>> {
    return await this.clienteRepository.findAll();
  }
}
