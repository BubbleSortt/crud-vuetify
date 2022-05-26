const sequelize = require('./connection');


class QueryConsole {

  query = async ({ query }) => {
    try {
      const response = await sequelize.query(query);
      return { result: response[0], status: 'success' };
    } catch (e) {
      return { result: 'Что-то не так', status: 'error' };
    }
  };

}

module.exports = new QueryConsole();
