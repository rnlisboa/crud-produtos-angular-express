import * as sequelize from "sequelize";
import { Cliente } from "../../../config/database/models/cliente.model.js";
import ClienteEntity from "../entity/cliente.entity.js";
import { inject, injectable } from "tsyringe";
import ICLienteRepository from "../interfaces/iclienteRepository.interface.js";

@injectable()
export default class ClienteRepository implements ICLienteRepository {
  constructor(
    @inject("ClienteModel")
    private readonly clienteModel: sequelize.ModelStatic<Cliente> = Cliente
  ) {}

  public async create(cliente: ClienteEntity): Promise<ClienteEntity> {
    const novoCliente = await this.clienteModel.create(cliente);
    return novoCliente.toJSON() as ClienteEntity;
  }

  public async findOne(id: string): Promise<ClienteEntity | null> {
    const cliente = await this.clienteModel.findByPk(id);
    return cliente;
  }

  public async update(
    id: string,
    dados: Partial<ClienteEntity>
  ): Promise<ClienteEntity | null> {
    const cliente = await this.clienteModel.findByPk(id);
    if (!cliente) return null;

    await cliente.update(dados);
    return cliente;
  }

  public async delete(id: string): Promise<boolean> {
    const deletedCount = await this.clienteModel.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }

  public async findAll(): Promise<Array<ClienteEntity>> {
    return await this.clienteModel.findAll();
  }
}
