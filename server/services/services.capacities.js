const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Capacities {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Нагрузка`', { type: QueryTypes.SELECT });
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
}

module.exports = new Capacities();
