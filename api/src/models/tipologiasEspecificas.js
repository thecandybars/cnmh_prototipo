const { DataTypes } = require("sequelize");
//Lugares
module.exports = (sequelize) => {
  sequelize.define(
    "TipologiasEspecificas",
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
