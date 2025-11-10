const api = 'http://localhost:3000';

export const ApiRoutes = {
  status: `${api}/status`,

  clientes: {
    base: `${api}/clientes`,
    create: `${api}/clientes`, // POST
    findAll: `${api}/clientes`, // GET
    findOne: (id: string) => `${api}/clientes/${id}`, // GET
    update: (id: string) => `${api}/clientes/${id}`, // PUT
    delete: (id: string) => `${api}/clientes/${id}`, // DELETE
    findOneByEmail: (email: string) =>
      `${api}/clientes/find-one-by-email?email=${email}`, // GET
  },

  produtos: {
    base: `${api}/produtos`,
    create: `${api}/produtos`, // POST
    findAll: `${api}/produtos`, // GET
    findOne: (id: string) => `${api}/produtos/${id}`, // GET
    update: (id: string) => `${api}/produtos/${id}`, // PUT
    delete: (id: string) => `${api}/produtos/${id}`, // DELETE
  },

  pedidos: {
    base: `${api}/pedidos`,
    create: `${api}/pedidos`, // POST
    findAll: `${api}/pedidos`, // GET
    findOne: (id: string) => `${api}/pedidos/${id}`, // GET
    update: (id: string) => `${api}/pedidos/${id}`, // PUT
    delete: (id: string) => `${api}/pedidos/${id}`, // DELETE

    addItem: (id: string) => `${api}/pedidos/${id}`, // POST (add item)
    concluir: (id: string) => `${api}/pedidos/concluir/${id}`, // PUT (concluir pedido)

    item: {
      findOne: (id: string) => `${api}/pedidos/item/${id}`, // GET
      update: (id: string) => `${api}/pedidos/item/${id}`, // PUT
      delete: (id: string) => `${api}/pedidos/item/${id}`, // DELETE
    },
  },
};
