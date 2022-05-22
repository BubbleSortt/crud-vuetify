const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


class Posts {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Должности`', { type: QueryTypes.SELECT });
  };

  create = async ({ post }) => {
    await sequelize.query(`INSERT INTO \`Должности\`(
    \`id должности\`,
    \`Должность\`) VALUES (
    NULL,
    '${post}'
    )`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Должности\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, post }) => {
    await sequelize.query(`UPDATE \`Должности\` SET
    \`Должность\` = '${post}'
     WHERE \`Должности\`.\`id должности\` = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM \`Должности\` WHERE \`id должности\` = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Должности\` WHERE \`Должности\`.\`id должности\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM \`Должности\` WHERE
    \`id должности\` LIKE '%${text}%' OR 
    \`Должность\` LIKE '%${text}%'`, { type: QueryTypes.SELECT });
  };

  sort = async ({ sortBy, sortDesc, items }) => {
    return await sequelize.query(`SELECT * FROM \`Должности\` WHERE \`id должности\` IN ${prepareForIn(items)} ORDER BY \`${sortBy}\` ${sortDesc}`, { type: QueryTypes.SELECT });
  };

}

module.exports = new Posts();
