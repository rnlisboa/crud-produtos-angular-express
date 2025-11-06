import { Request, Response, Router } from "express";
import ClienteController from "../controller/Cliente.controller.js";
import { container } from "tsyringe";

const clienteRouter = Router();
const clienteController = container.resolve(ClienteController);

clienteRouter.post("/", (req: Request, res: Response) =>
  clienteController.create(req, res)
);

clienteRouter.get("/", (req: Request, res: Response) =>
  clienteController.findAll(req, res)
);

clienteRouter.get("/:id", (req: Request, res: Response) =>
  clienteController.findOne(req, res)
);

clienteRouter.put("/:id", (req: Request, res: Response) =>
  clienteController.update(req, res)
);

clienteRouter.delete("/:id", (req: Request, res: Response) =>
  clienteController.delete(req, res)
);

export default clienteRouter;
