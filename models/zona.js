module.exports = (sequelize, DataTypes) => {
  const Zona = sequelize.define('Zonas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Zona;
};
