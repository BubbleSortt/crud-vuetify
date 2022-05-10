const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');


class QueryConsole {

  query = async ({ query }) => {
    try {
      const response = await sequelize.query(query);
      return response[0];
    } catch (e) {
      return { info: 'Что-то не так', status: 'error' }
    }

  };

}

module.exports = new QueryConsole();
