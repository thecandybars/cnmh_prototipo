const { DataTypes } = require("sequelize");
//Lugares
module.exports = (sequelize) => {
  sequelize.define(
    "Lugares",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      latitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(1200),
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
