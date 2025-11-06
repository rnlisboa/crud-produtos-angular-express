import { Request, Response, Router } from "express";
import clienteRouter from "../modules/cliente/routes/cliente.routes.js";
import produtoRouter from "../modules/produto/routes/produto.routes.js";
import pedidoRouter from "../modules/pedido/routes/pedido.routes.js";

const routes = Router();
routes.use("/status", (req: Request, res: Response) => {
  return res
    .status(200)
    .send({
      message: "Api funcionando corretamente",
    })
    .json();
});

routes.use("/clientes", clienteRouter);
routes.use("/produtos", produtoRouter);
routes.use("/pedidos", pedidoRouter);

export default routes;
