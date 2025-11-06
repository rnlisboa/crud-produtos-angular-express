import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database.js";
import ProdutoEntity from "../../../modules/produto/entity/produto.entity.js";

interface ProdutoCreation extends Optional<ProdutoEntity, "id"> {}

export class Produto
  extends Model<ProdutoEntity, ProdutoCreation>
  implements ProdutoEntity
{
  declare id: string;
  nome!: string;
  descricao?: string;
  preco!: number;
  estoque!: number;
}

Produto.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "Produtos",
    timestamps: false,
  }
);
