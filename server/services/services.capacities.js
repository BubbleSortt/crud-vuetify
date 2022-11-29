const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


class Capacities {

  getAll = async () => {
    return await sequelize.query(`SELECT *, capacities.id as id, lessons.name as lessonName, groups.name as groupName, teachers.surname as teacherName FROM capacities
      INNER JOIN lessons ON capacities.lessonId = lessons.id
      INNER JOIN teachers ON capacities.teacherId = teachers.id
      INNER JOIN groups ON capacities.groupId = groups.id order by capacities.id;`, { type: QueryTypes.SELECT });
  };

  create = async ({ hours, lessonId, teacherId, groupId }) => {
    await sequelize.query(`INSERT INTO capacities (
    id,
    hours,
    lessonid,
    teacherid,
    groupid
        ) VALUES (
    default,
    '${hours}',
    '${lessonId}',
    '${teacherId}',
    '${groupId}');`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM capacities ORDER BY ID DESC LIMIT 1;`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, hours, lessonId, teacherId, groupId }) => {
    await sequelize.query(`UPDATE capacities SET
    hours = '${hours}',
    lessonid = '${lessonId}',
    teacherid = '${teacherId}',
    groupid = '${groupId}' WHERE id = ${id};`, { type: QueryTypes.UPDATE });

    return await sequelize.query(`SELECT * FROM capacities WHERE id = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM capacities WHERE id = ${id};`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM capacities WHERE
    \`id\` LIKE '%${text}%' OR 
    \`кол-во_часов\` LIKE '%${text}%' OR
    \`id_предмета\` LIKE '%${text}%' OR
    \`id_преподавателя\` LIKE '%${text}%' OR
    \`id_группы\` LIKE '%${text}%'`, { type: QueryTypes.SELECT });
  }

  sort = async ({ sortBy, sortDesc, items }) => {
    return await sequelize.query(`SELECT * FROM capacities WHERE id IN ${prepareForIn(items)} ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  }

  callProcedure = async ({ lessonId, groupId, hours }) => {
    try {
      const response = await sequelize.query(`CALL set_capacity(:lessonId, :groupId, :hours)`, {replacements: {
          lessonId: lessonId,
          groupId: groupId,
          hours: hours,
        }})

      const { msg } = response[0];
      return { status: 'info', result: msg };
    } catch (err) {
      return {status: 'error', result: {msg: err.message}};
    }
  }
}

module.exports = new Capacities();
