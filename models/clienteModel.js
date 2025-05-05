const db = require('../db');

const ClienteModel = {
  getAll: (callback) => {
    const sql = `
      SELECT clientes.id, clientes.nombre, direccion, telefono, imagen,
             zonas.nombre AS zona
      FROM clientes
      JOIN zonas ON clientes.zona_id = zonas.id
    `;
    db.query(sql, callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO clientes (nombre, direccion, telefono, imagen, zona_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [data.nombre, data.direccion, data.telefono, data.imagen, data.zona_id];
    db.query(sql, values, callback);
  },

  update: (id, data, callback) => {
    let sql = `
      UPDATE clientes
      SET nombre = ?, direccion = ?, telefono = ?, zona_id = ?
    `;
    const values = [data.nombre, data.direccion, data.telefono, data.zona_id];

    if (data.imagen) {
      sql += `, imagen = ?`;
      values.push(data.imagen);
    }

    sql += ` WHERE id = ?`;
    values.push(id);

    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM clientes WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = ClienteModel;
