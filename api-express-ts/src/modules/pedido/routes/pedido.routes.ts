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

pedidoRouter.delete("/deletar-todos", (req: Request, res: Response) =>
  pedidoController.deleteAll(req, res)
);

export default pedidoRouter;
