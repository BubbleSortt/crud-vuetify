const queryConsoleModel = require('./../services/services.queryConsole')

class queryConsoleController {

  query = async (req, res) => {
    const { query } = req.body;
    const response = await queryConsoleModel.query({ query });
    res.send({...response});
  }

  // SELECT * FROM `Преподаватели`
  // INSERT INTO `Предметы` (`id`, `Название_предмета`) VALUES (NULL, 'Test')
  // UPDATE `Предметы` SET `Название_предмета` = 'Changed' WHERE `Предметы`.`id` = 35;
  // DELETE FROM `Предметы` WHERE `Предметы`.`id` = 35

}

module.exports = new queryConsoleController();
