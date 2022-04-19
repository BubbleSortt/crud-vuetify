const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Groups {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Группы`', { type: QueryTypes.SELECT });
  };

  create = async ({ speciality, name, leader, year }) => {
    await sequelize.query(`INSERT INTO \`Группы\`(
    \`id\`,
    \`Специальность\`,
    \`Название_группы\`,
    \`Фамилия_старосты\`,
    \`Год_поступления\`) VALUES (
    NULL,
    '${speciality}',
    '${name}',
    '${leader}', 
    '${year}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Группы\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, speciality, name, leader, year }) => {
    await sequelize.query(`UPDATE \`Группы\` SET
    \`Специальность\` = '${speciality}',
    \`Название_группы\` = '${name}',
    \`Фамилия_старосты\` = '${leader}',
    \`Год_поступления\` = '${year}' WHERE \`Группы\`.\`id\` = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM \`Группы\` WHERE \`id\` = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Группы\` WHERE \`Группы\`.\`id\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };
}

module.exports = new Groups();
