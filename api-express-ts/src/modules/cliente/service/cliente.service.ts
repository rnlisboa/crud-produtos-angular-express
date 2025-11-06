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

  public async findOne(id: string): Promise<ClienteEntity | null> {
    const cliente = await this.clienteRepository.findOne(id);
    return cliente;
  }

  public async update(
    id: string,
    dados: Partial<ClienteEntity>
  ): Promise<ClienteEntity | null> {
    const cliente = await this.clienteRepository.update(id, dados);
    return cliente;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.clienteRepository.delete(id);

    return deletedCount;
  }

  public async findAll(): Promise<Array<ClienteEntity>> {
    return await this.clienteRepository.findAll();
  }
}
