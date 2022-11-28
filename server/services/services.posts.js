const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const { prepareForIn } = require('../helpers');


class Posts {

  getAll = async () => {
    return await sequelize.query('SELECT * FROM posts', { type: QueryTypes.SELECT });
  };

  create = async ({ post }) => {
    await sequelize.query(`INSERT INTO posts (
    id,
    post) VALUES (
    default,
    '${post}'
    )`, { type: QueryTypes.INSERT });

    return await sequelize.query('SELECT * FROM posts ORDER BY ID DESC LIMIT 1;', { type: QueryTypes.SELECT });
  };

  update = async ({ id, post }) => {
    await sequelize.query(`UPDATE posts SET
    post = '${post}'
     WHERE id = ${id};`, { type: QueryTypes.UPDATE })

    return await sequelize.query(`SELECT * FROM posts WHERE id = ${id};`, { type: QueryTypes.SELECT })
  };

  delete = async (id) => {
    await sequelize.query(`DELETE FROM posts WHERE id = ${id};`, { type: QueryTypes.DELETE });
    return id;
  };

  search = async ({ text }) => {
    return await sequelize.query(`SELECT * FROM posts WHERE
    id LIKE '${text}%' OR 
    post LIKE '${text}%';`, { type: QueryTypes.SELECT });
  };

  sort = async ({ sortBy, sortDesc, items }) => {
    return await sequelize.query(`SELECT * FROM posts WHERE id IN ${prepareForIn(items)} ORDER BY ${sortBy} ${sortDesc}`, { type: QueryTypes.SELECT });
  };

}

module.exports = new Posts();
