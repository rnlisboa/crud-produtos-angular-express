import ClienteEntity from "../entity/cliente.entity.js";

export default interface ICLienteRepository {
  create(cliente: ClienteEntity): Promise<ClienteEntity>;
  findAll(): Promise<Array<ClienteEntity>>;
}
