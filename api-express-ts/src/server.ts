import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "./modules/container/container.js";
import { connectDatabase, sequelize } from "./config/database/database.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3000;
async function startServer() {
  await connectDatabase();
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

startServer();
