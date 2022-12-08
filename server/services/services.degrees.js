const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Degrees {
  getAll = async () => {
    return await sequelize.query('SELECT * FROM degrees', { type: QueryTypes.SELECT });
  };

  create = async ({ name }) => {
    await sequelize.query(`INSERT INTO degrees(
    id,
    name) VALUES (
    default,
    '${name}');`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM degrees ORDER BY ID DESC LIMIT 1;`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, name }) => {
    await sequelize.query(`UPDATE degrees SET
    name = '${name}'
     WHERE id = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM degrees WHERE id = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM degrees WHERE id = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM degrees WHERE
    id::varchar ~* '${text}' OR 
    name::varchar ~* '${text}';`, { type: QueryTypes.SELECT });
  }

  sort = async ({ sortBy, sortDesc }) => {
    return await sequelize.query(`SELECT * FROM degrees ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  }
}

module.exports = new Degrees();
