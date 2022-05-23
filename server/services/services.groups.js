const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


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

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM \`Группы\` WHERE
    \`id\` LIKE '%${text}%' OR 
    \`Специальность\` LIKE '%${text}%' OR
    \`Название_группы\` LIKE '%${text}%' OR
    \`Фамилия_старосты\` LIKE '%${text}%' OR
    \`Год_поступления\` LIKE '%${text}%'`, { type: QueryTypes.SELECT });
  };

  sort = async ({ sortBy, sortDesc, items }) => {
    return await sequelize.query(`SELECT * FROM \`Группы\` WHERE \`id\` IN ${prepareForIn(items)} ORDER BY \`${sortBy}\` ${sortDesc}`, { type: QueryTypes.SELECT });
  };
}

module.exports = new Groups();
