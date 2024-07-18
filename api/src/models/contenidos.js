const { DataTypes } = require("sequelize");
//contenidos
module.exports = (sequelize) => {
  sequelize.define(
    "Contenidos",
    {
      cid: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      titulo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
