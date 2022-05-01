const couplesModel = require('./../services/services.couples')
const { map, toNumber, toString, get } = require('lodash');

class CouplesController {

  getCouples = async (req, res) => {
    let couples = await couplesModel.getAll();
    couples = map(couples, (degree) => {
      return {
        id: toNumber(get(degree, 'id', '')),
        audience: toString(get(degree, 'Аудитория', '')),
        time: new Date(get(degree, 'Время', '')).toISOString().replace('Z', ''),
        capacityId: toNumber(get(degree, 'Нагрузка_id', '')),
      }
    })
    res.send(couples);
  }

  createCouple = async (req, res) => {
    const createdGroup = await couplesModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateCouple = async (req, res) => {
    const updatedRow = await couplesModel.update(req.body);
    res.status(200).json(updatedRow);
  }

  deleteCouple = async (req, res) => {
    const { id } = req.body;
    const removedId = await couplesModel.delete(id)
    res.status(200).json({ id: removedId })
  }
}

module.exports = new CouplesController();
