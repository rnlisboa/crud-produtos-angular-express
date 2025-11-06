import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "crudb",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "0000",
  {
    host: process.env.DB_HOST || "localhost",
    port: 5433,
    dialect: "postgres",
    logging: false,
  }
);

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco PostgreSQL com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}
