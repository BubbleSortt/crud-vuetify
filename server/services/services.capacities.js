const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


class Capacities {

  getAll = async () => {
    return await sequelize.query(`SELECT *, \`Название_предмета\`, \`Специальность\`, \`Фамилия\` FROM \`Нагрузка\`
       INNER JOIN \`Предметы\`ON \`Нагрузка\`.\`id_предмета\` = \`Предметы\`.\`id\`
       INNER JOIN \`Преподаватели\`ON \`Нагрузка\`.\`id_преподавателя\` = \`Преподаватели\`.\`id_Преподавателя\`
       INNER JOIN \`Группы\`ON \`Нагрузка\`.\`id_группы\` = \`Группы\`.\`id\`
       `, { type: QueryTypes.SELECT });
  };

  create = async ({ hours, lessonId, teacherId, groupId }) => {
    await sequelize.query(`INSERT INTO \`Нагрузка\`(
    \`id\`,
    \`кол-во_часов\`,
    \`id_предмета\`,
    \`id_преподавателя\`,
    \`id_группы\`) VALUES (
    NULL,
    '${hours}',
    '${lessonId}',
    '${teacherId}',
    '${groupId}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Нагрузка\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, hours, lessonId, teacherId, groupId }) => {
    await sequelize.query(`UPDATE \`Нагрузка\` SET
    \`кол-во_часов\` = '${hours}',
    \`id_предмета\` = '${lessonId}',
    \`id_преподавателя\` = '${teacherId}',
    \`id_группы\` = '${groupId}' WHERE \`Нагрузка\`.\`id\` = ${id};`, { type: QueryTypes.UPDATE });

    return await sequelize.query(`SELECT * FROM \`Нагрузка\` WHERE \`id\` = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Нагрузка\` WHERE \`Нагрузка\`.\`id\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM \`Нагрузка\` WHERE
    \`id\` LIKE '%${text}%' OR 
    \`кол-во_часов\` LIKE '%${text}%' OR
    \`id_предмета\` LIKE '%${text}%' OR
    \`id_преподавателя\` LIKE '%${text}%' OR
    \`id_группы\` LIKE '%${text}%'`, { type: QueryTypes.SELECT });
  }

  sort = async ({ sortBy, sortDesc, items }) => {
    return await sequelize.query(`SELECT * FROM \`Нагрузка\` WHERE \`id\` IN ${prepareForIn(items)} ORDER BY \`${sortBy}\` ${sortDesc}`, { type: QueryTypes.SELECT });
  }

  callProcedure = async ({ lessonId, groupId, hours }) => {
    try {
      const response = await sequelize.query(`CALL set_capacity(:lessonId, :groupId, :hours)`, {replacements: {
          lessonId: +lessonId,
          groupId: +groupId,
          hours: +hours,
        }})
      return { status: 'success', result: {msg: 'Все окей'} };
    } catch (err) {
      return {status: 'error', result: {msg: err.message}};
    }
  }
}

module.exports = new Capacities();
