const { DataTypes } = require("sequelize");
//Users
module.exports = (sequelize) => {
  sequelize.define(
    "Regions",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: false, // Deshabilitar los campos de fecha
    }
  );
};
