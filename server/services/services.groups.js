const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class Groups {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM `Группы`', { type: QueryTypes.SELECT });
  }

  create = async () => {

  }

  update = async (id) => {

  }

  delete = async (id) => {
    const remove = await sequelize.query(`DELETE FROM \`Группы\` WHERE \`Группы\`.\`id\` = ${id}`, { type: QueryTypes.DELETE })
    console.log(remove, 'removed from bd')
    return id;
  }
}

module.exports = new Groups();
