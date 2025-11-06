import ClienteEntity from "../entity/cliente.entity.js";

export default interface ICLienteRepository {
  create(cliente: ClienteEntity): Promise<ClienteEntity>;
  findAll(): Promise<Array<ClienteEntity>>;
  findOne(id: string): Promise<ClienteEntity | null>;
  update(
    id: string,
    dados: Partial<ClienteEntity>
  ): Promise<ClienteEntity | null>;
  delete(id: string): Promise<boolean>;
}
