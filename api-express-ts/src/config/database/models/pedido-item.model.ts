import { DataTypes, Model, Optional } from "sequelize";
import PedidoItemEntity from "../../../modules/pedido/entity/pedido-item.entity.js";
import { sequelize } from "../database.js";
import { Produto } from "./produto.model.js";

interface PedidoItemCreation extends Optional<PedidoItemEntity, "id"> {}

export class PedidoItem
  extends Model<PedidoItemEntity, PedidoItemCreation>
  implements PedidoItemEntity
{
  declare id: string;
  pedidoId!: string;
  produtoId!: string;
  quantidade!: number;
  precoUnitario!: number;
  subtotal!: number;
}

PedidoItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pedidoId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "pedido_id",
    },
    produtoId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "produto_id",
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precoUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.VIRTUAL,
      get() {
        const q = this.getDataValue("quantidade") || 0;
        const p = this.getDataValue("precoUnitario") || 0;
        return Number(q) * Number(p);
      },
    },
  },
  {
    sequelize,
    modelName: "PedidoItem",
    tableName: "PedidoItem",
    timestamps: false,
  }
);

PedidoItem.belongsTo(Produto, { foreignKey: "produtoId", as: "produto" });
