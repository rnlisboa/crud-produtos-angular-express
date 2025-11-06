import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import PedidoController from "../controller/pedido.controller.js";

const pedidoRouter = Router();
const pedidoController = container.resolve(PedidoController);

pedidoRouter.post("/", (req: Request, res: Response) =>
  pedidoController.create(req, res)
);

pedidoRouter.get("/", (req: Request, res: Response) =>
  pedidoController.findAll(req, res)
);

pedidoRouter.get("/:id", (req: Request, res: Response) =>
  pedidoController.findOnePedido(req, res)
);

pedidoRouter.put(":id", (req: Request, res: Response) =>
  pedidoController.updatePedido(req, res)
);

pedidoRouter.delete("/:id", (req: Request, res: Response) =>
  pedidoController.deletePedido(req, res)
);

/** ---- ROTAS DE ITENS DO PEDIDO ---- **/

pedidoRouter.get("/item/:id", (req: Request, res: Response) =>
  pedidoController.findOnePedidoItem(req, res)
);

pedidoRouter.put("/item/:id", (req: Request, res: Response) =>
  pedidoController.updatePedidoItem(req, res)
);

pedidoRouter.delete("/item/:id", (req: Request, res: Response) =>
  pedidoController.deletePedidoItem(req, res)
);

export default pedidoRouter;
