import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import ProdutoController from "../controller/produto.controller.js";

const produtoRouter = Router();
const produtoController = container.resolve(ProdutoController);

produtoRouter.post("/", (req: Request, res: Response) =>
  produtoController.create(req, res)
);

produtoRouter.get("/", (req: Request, res: Response) =>
  produtoController.findAll(req, res)
);

produtoRouter.put("/:id", (req: Request, res: Response) =>
  produtoController.update(req, res)
);

produtoRouter.get("/:id", (req: Request, res: Response) =>
  produtoController.findOne(req, res)
);

produtoRouter.delete("/:id", (req: Request, res: Response) =>
  produtoController.findAll(req, res)
);

export default produtoRouter;
