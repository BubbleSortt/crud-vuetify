const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Couples {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Проведенные пары`', { type: QueryTypes.SELECT });
  };

  create = async ({ audience, time, capacityId }) => {
    await sequelize.query(`INSERT INTO \`Проведенные пары\`(
    \`id\`,
    \`Аудитория\`,
    \`Время\`,
    \`Нагрузка_id\`) VALUES (
    NULL,
    '${audience}',
    '${time}',
    '${capacityId}')`, { type: QueryTypes.INSERT });

    return await sequelize.query(`SELECT * FROM \`Проведенные пары\` ORDER BY ID DESC LIMIT 1`, { type: QueryTypes.SELECT });
  };

  update = async ({ id, audience, time, capacityId }) => {
    await sequelize.query(`UPDATE \`Проведенные пары\` SET
    \`Аудитория\` = '${audience}',
    \`Время\` = '${time}',
    \`Нагрузка_id\` = '${capacityId}' WHERE \`Проведенные пары\`.\`id\` = ${id};`, { type: QueryTypes.UPDATE });

    return await sequelize.query(`SELECT * FROM \`Проведенные пары\` WHERE \`id\` = ${id}`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM \`Проведенные пары\` WHERE \`Проведенные пары\`.\`id\` = ${id}`, { type: QueryTypes.DELETE });
    return id;
  };
}

module.exports = new Couples();
