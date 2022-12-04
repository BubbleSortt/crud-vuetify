const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');

class Groups {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM Groups', { type: QueryTypes.SELECT });
  };

  create = async ({ speciality, name, leader, year }) => {
    await sequelize.query(`INSERT INTO Groups(
    id,
    speciality,
    name,
    leader,
    year) VALUES (
    default,
    '${speciality}',
    '${name}',
    '${leader}', 
    '${year}')`, { type: QueryTypes.INSERT });

    return await sequelize.query('SELECT * FROM Groups ORDER BY ID DESC LIMIT 1;', { type: QueryTypes.SELECT });
  };

  update = async ({ id, speciality, name, leader, year }) => {
    await sequelize.query(`UPDATE Groups SET
    speciality = '${speciality}',
    name = '${name}',
    leader = '${leader}',
    year = '${year}' WHERE Groups.id = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM Groups WHERE id = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM Groups WHERE Groups.id = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM Groups WHERE
        id::varchar ~ '${text}' OR
        speciality::varchar ~ '${text}' OR
        name::varchar ~ '${text}' OR
        leader::varchar ~ '${text}' OR
        year::varchar ~ '${text}';`, { type: QueryTypes.SELECT });
  };

  sort = async ({ sortBy, sortDesc }) => {
    return await sequelize.query(`SELECT * FROM Groups ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  };
}

module.exports = new Groups();
