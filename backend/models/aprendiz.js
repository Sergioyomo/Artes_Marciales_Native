const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Aprendiz', {
    idAprendiz: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    idSensei: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sensei',
        key: 'idSensei'
      }
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cuota: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'Aprendiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAprendiz" },
        ]
      },
      {
        name: "FK_SENSEI",
        using: "BTREE",
        fields: [
          { name: "idSensei" },
        ]
      },
    ]
  });
};
