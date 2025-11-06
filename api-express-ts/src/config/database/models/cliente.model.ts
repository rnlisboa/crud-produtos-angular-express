import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database.js";
import ClienteEntity from "../../../modules/cliente/entity/cliente.entity.js";

interface ClienteCreation extends Optional<ClienteEntity, "id"> {}

export class Cliente
  extends Model<ClienteEntity, ClienteCreation>
  implements ClienteEntity
{
  declare id: string;
  nome!: string;
  email!: string;
  telefone?: string;
  endereco?: string;
}

Cliente.init(
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
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    endereco: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "Clientes",
    timestamps: false,
  }
);
