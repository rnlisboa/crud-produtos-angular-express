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

  public async findAll(): Promise<Array<ClienteEntity>> {
    return await this.clienteModel.findAll();
  }

  public async create(cliente: ClienteEntity): Promise<ClienteEntity> {
    const novoCliente = await this.clienteModel.create(cliente);
    return novoCliente.toJSON() as ClienteEntity;
  }
}
