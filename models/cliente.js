// models/cliente.js
module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Clientes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true
      },
      zona_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Cliente;
  };
  