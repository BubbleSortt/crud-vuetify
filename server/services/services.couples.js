const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


class Couples {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM couples;', { type: QueryTypes.SELECT });
  };

  create = async ({ audience, time, capacityId }) => {
    await sequelize.query(`INSERT INTO couples(
    id,
    audience,
    time,
    capacityid) VALUES (
    default,
    '${audience}',
    '${time}',
    '${capacityId}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM couples ORDER BY ID DESC LIMIT 1;`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, audience, time, capacityId }) => {
    await sequelize.query(`UPDATE couples SET
    audience = '${audience}',
    time = '${time}',
    capacityid = '${capacityId}' WHERE id = ${id};`, { type: QueryTypes.UPDATE });

    return await sequelize.query(`SELECT * FROM couples WHERE id = ${id}`, { type: QueryTypes.SELECT });
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM couples WHERE id = ${id};`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM couples WHERE
    id::varchar ~* '${text}' OR 
    audience::varchar ~* '${text}' OR
    time::varchar ~* '${text}' OR
    capacityid::varchar ~* '${text}'`, { type: QueryTypes.SELECT });
  }

  sort = async ({ sortBy, sortDesc }) => {
    return await sequelize.query(`SELECT * FROM couples ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  }
}

module.exports = new Couples();
