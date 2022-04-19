const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'mydb',
  'root',
  'root',
  {
    dialect: 'mysql',
    port: 8889,
  }
)


module.exports = sequelize

