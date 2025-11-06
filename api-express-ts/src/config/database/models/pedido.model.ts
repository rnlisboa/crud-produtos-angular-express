import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database.js";
import PedidoEntity, {
  StatusPedido,
} from "../../../modules/pedido/entity/pedido.entity.js";

interface PedidoCreation
  extends Optional<PedidoEntity, "id" | "data" | "status"> {}

export class Pedido
  extends Model<PedidoEntity, PedidoCreation>
  implements PedidoEntity
{
  declare id: string;
  clienteId!: string;
  quantidade!: number;
  data?: Date;
  total!: number;
  status?: StatusPedido;
}

Pedido.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clienteId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "cliente_id",
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(StatusPedido)),
      allowNull: false,
      defaultValue: StatusPedido.NOVO,
    },
  },
  {
    sequelize,
    modelName: "Pedido",
    tableName: "Pedidos",
    timestamps: false,
  }
);
