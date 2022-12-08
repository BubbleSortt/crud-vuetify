const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


class Lessons {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM lessons', { type: QueryTypes.SELECT });
  };

  create = async ({ name }) => {
    await sequelize.query(`INSERT INTO lessons(
    id,
    name) VALUES (
    default,
    '${name}');`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM lessons ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  //UPDATE lessons SET  `Название_предмета` = 'Test' WHERE lessons.`id` = 9;
  update = async ({ id, name }) => {
    await sequelize.query(`UPDATE lessons SET
     name = '${name}'
     WHERE id = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM lessons WHERE id = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM lessons WHERE id = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM lessons WHERE
        id::varchar ~* '${text}' OR
        name::varchar ~* '${text}';`, { type: QueryTypes.SELECT });
  };

  sort = async ({ sortBy, sortDesc }) => {
    return await sequelize.query(`SELECT * FROM lessons ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  };
}

module.exports = new Lessons();
