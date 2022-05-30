const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');

class Teachers {

  getAll = async () => {
    return await sequelize.query(`SELECT
       \`id_Преподавателя\`, \`Фамилия\`,\`Имя\`,\`Отчество\`,\`Ставка\`,\`Общее_кол-во_часов\`, \`id_должности\`,
       \`id_ученой степени\`, \`Должность\`,\`Наименование_степени\` FROM \`Преподаватели\`
     INNER JOIN \`Должности\` ON \`Преподаватели\`.\`id_должности\` = \`Должности\`.\`id должности\`
     INNER JOIN \`Ученые степени\` ON \`Преподаватели\`.\`id_ученой степени\` = \`Ученые степени\`.\`id\``, {
      type: QueryTypes.SELECT
    });
  };

  create = async ({ name, surname, patronymic, rate, totalHours, postId, degreeId }) => {
    await sequelize.query(`INSERT INTO \`Преподаватели\`(
    \`id_Преподавателя\`,
    \`Фамилия\`,
    \`Имя\`,
    \`Отчество\`,
    \`Ставка\`,
    \`Общее_кол-во_часов\`,
    \`id_должности\`,
    \`id_ученой степени\`) VALUES (
    NULL,
    '${surname}',
    '${name}',
    '${patronymic}',
    '${rate}',
    '${totalHours}',
    '${postId}',
    '${degreeId}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Преподаватели\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, name, surname, patronymic, rate, totalHours, postId, degreeId }) => {
   try {
     await sequelize.query(`UPDATE \`Преподаватели\` SET
      \`Фамилия\` = '${surname}',
      \`Имя\` = '${name}',
      \`Отчество\` = '${patronymic}',
      \`Ставка\` = '${rate}',
      \`Общее_кол-во_часов\` = '${totalHours}',
      \`id_должности\` = '${postId}',
      \`id_ученой степени\` = '${degreeId}'
       WHERE \`Преподаватели\`.\`id_Преподавателя\` = ${id}`, { type: QueryTypes.UPDATE })

     return await sequelize.query(`SELECT * FROM \`Преподаватели\` WHERE \`id_Преподавателя\` = ${id}`, { type: QueryTypes.SELECT })

   } catch (e) {
     console.log(e, 'error serivces');
   }

  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Преподаватели\` WHERE \`Преподаватели\`.\`id_Преподавателя\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT 
       \`id_Преподавателя\`, \`Фамилия\`, \`Имя\`, \`Отчество\`, \`Ставка\`, \`Общее_кол-во_часов\`, \`Должность\`,\`Наименование_степени\` FROM \`Преподаватели\`
       INNER JOIN \`Должности\` ON \`Преподаватели\`.\`id_должности\` = \`Должности\`.\`id должности\`
       INNER JOIN \`Ученые степени\` ON \`Преподаватели\`.\`id_ученой степени\` = \`Ученые степени\`.\`id\` WHERE
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
       \`id_Преподавателя\`,\`Фамилия\`,\`Имя\`,\`Отчество\`,\`Ставка\`,\`Общее_кол-во_часов\`,\`Должность\`,\`Наименование_степени\`FROM \`Преподаватели\`
       INNER JOIN \`Должности\`ON \`Преподаватели\`.\`id_должности\` = \`Должности\`.\`id должности\`
       INNER JOIN \`Ученые степени\` ON \`Преподаватели\`.\`id_ученой степени\` = \`Ученые степени\`.\`id\` WHERE \`id_Преподавателя\` IN ${prepareForIn(items)} ORDER BY \`${sortBy}\` ${sortDesc}`, { type: QueryTypes.SELECT });
  }

}

module.exports = new Teachers();
