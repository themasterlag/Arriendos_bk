const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contrato', {
    id_contrato: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_punto_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'punto_de_venta',
        key: 'id_punto_venta'
      }
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    },
    valor_canon: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    incremento_anual: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'incremento',
        key: 'id_incremento'
      }
    },
    incremento_adicional: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_inicio_contrato: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_fin_contrato: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tipo_contrato: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_contrato',
        key: 'id_tipo_contrato'
      }
    },
    valor_adminstracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    definicion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    poliza: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_responsable: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'responsable',
        key: 'id_responsable'
      }
    },
    id_autorizado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'autorizado',
        key: 'id_autorizado'
      }
    },
    id_autorizado_adm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'autorizado_administracion',
        key: 'id_autorizado_adm'
      }
    }
  }, {
    sequelize,
    tableName: 'contrato',
    schema: 'arriendos',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "contrato_pkey",
        unique: true,
        fields: [
          { name: "id_contrato" },
        ]
      },
    ]
  });
};
