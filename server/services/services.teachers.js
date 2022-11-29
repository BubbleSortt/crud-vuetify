const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');

class Teachers {

  getAll = async () => {
    return await sequelize.query(`SELECT *, teachers.id as id, teachers.name as name, post as postName, degrees.name as degreeName FROM teachers
        INNER JOIN posts ON teachers.postid = posts.id
        INNER JOIN degrees ON teachers.degreeid = degrees.id;`, {
      type: QueryTypes.SELECT
    });
  };

  create = async ({ name, surname, patronymic, rate, totalHours, postId, degreeId }) => {
    await sequelize.query(`INSERT INTO teachers(
    id,
    surname,
    name,
    patronymic,
    rate,
    totalhours,
    degreeid,
    postid
    ) VALUES (
    default,
    '${surname}',
    '${name}',
    '${patronymic}',
    '${rate}',
    '${totalHours}',
    '${postId}',
    '${degreeId}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM teachers ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, name, surname, patronymic, rate, totalHours, postId, degreeId }) => {
   try {
     await sequelize.query(`UPDATE teachers SET
        surname = '${surname}',
        name = '${name}',
        patronymic = '${patronymic}',
        rate = '${rate}',
        totalhours = '${totalHours}',
        degreeid = '${degreeId}',
        postid = '${postId}'
       WHERE teachers.id = ${id}`, { type: QueryTypes.UPDATE })

     return await sequelize.query(`SELECT * FROM teachers WHERE id = ${id}`, { type: QueryTypes.SELECT })

   } catch (e) {
     console.log(e, 'error serivces');
   }

  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM teachers WHERE id = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT teachers.id as id, surname, patronymic, rate, totalhours, teachers.name as name, post as postName, degrees.name as degreeName FROM teachers
     INNER JOIN posts ON teachers.postid = posts.id
     INNER JOIN degrees ON teachers.degreeid = degrees.id WHERE
      \`id_Преподавателя\` LIKE '%${text}%' OR 
      \`Имя\` LIKE '%${text}%' OR
      \`Фамилия\` LIKE '%${text}%' OR
      \`Отчество\` LIKE '%${text}%' OR
      \`Ставка\` LIKE '%${text}%' OR
      \`Общее_кол-во_часов\` LIKE '%${text}%' OR
      \`Должность\` LIKE '%${text}%' OR
      \`Наименование_степени\` LIKE '%${text}%'`, { type: QueryTypes.SELECT });
  }

  sort = async ({ sortBy, sortDesc, items }) => {
    return await sequelize.query(`SELECT 
       teachers.id as id, surname, teachers.name as name, patronymic, rate, totalhours, post as postName, degrees.name as degreeName FROM teachers
       INNER JOIN posts ON teachers.postid = posts.id
       INNER JOIN degrees ON teachers.degreeid = degrees.id WHERE teachers.id IN ${prepareForIn(items)} ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  }

}

module.exports = new Teachers();
