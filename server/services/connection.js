const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'university_db',
  'postgres',
  '259647',
  {
    dialect: 'postgres',
    port: 5432,
  }
)


module.exports = sequelize

