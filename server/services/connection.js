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


async function createTrigger() {
  console.log('trigger created');
  try {
    const res = await sequelize.query(`
CREATE TRIGGER test_trigger BEFORE UPDATE ON \`Преподаватели\`
    FOR EACH ROW
    IF NEW.\`Общее_кол-во_часов\` > 50 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Sale has exceeded the allowed amount of 10000.' ;
    END IF
`)
    console.log(res, 'res')
  } catch (e) {
    console.log(e, 'error')
  }

}

createTrigger().then(res => res);


module.exports = sequelize

