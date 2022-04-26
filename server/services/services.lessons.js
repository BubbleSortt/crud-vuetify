const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Lessons {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Предметы`', { type: QueryTypes.SELECT });
  };

  create = async ({ name }) => {
    await sequelize.query(`INSERT INTO \`Предметы\`(
    \`id\`,
    \`Название_предмета\`) VALUES (
    NULL,
    '${name}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Предметы\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, name }) => {
    await sequelize.query(`UPDATE \`Предметы\` SET
    \`Название_предмета\` = '${name}'
     WHERE \`Предметы\`.\`id\` = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM \`Предметы\` WHERE \`id\` = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Предметы\` WHERE \`Предметы\`.\`id\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };
}

module.exports = new Lessons();