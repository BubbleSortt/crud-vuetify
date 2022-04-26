const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Degrees {
  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Ученые степени`', { type: QueryTypes.SELECT });
  };

  create = async ({ name }) => {
    await sequelize.query(`INSERT INTO \`Ученые степени\`(
    \`id\`,
    \`Наименование_степени\`) VALUES (
    NULL,
    '${name}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Ученые степени\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, name }) => {
    await sequelize.query(`UPDATE \`Ученые степени\` SET
    \`Наименование_степени\` = '${name}'
     WHERE \`Ученые степени\`.\`id\` = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM \`Ученые степени\` WHERE \`id\` = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Ученые степени\` WHERE \`Ученые степени\`.\`id\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };
}

module.exports = new Degrees();
