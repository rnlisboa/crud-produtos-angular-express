import ClienteEntity from '../domain/cliente.entity';

export type ClienteDTO = Omit<ClienteEntity, 'id'>;
