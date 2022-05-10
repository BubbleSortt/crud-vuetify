const queryConsoleModel = require('./../services/services.queryConsole')

class queryConsoleController {

  query = async (req, res) => {
    const { query } = req.body;
    const response = await queryConsoleModel.query({ query });
    res.send(response)
  }

}

module.exports = new queryConsoleController();
