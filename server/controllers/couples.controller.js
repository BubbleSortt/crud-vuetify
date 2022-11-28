const couplesModel = require('./../services/services.couples')
const { map, toNumber, toString, get } = require('lodash');


class CouplesController {

  adapter = (couples) => {
    return map(couples, (degree) => {
      return {
        id: toNumber(get(degree, 'id', '')),
        audience: toString(get(degree, 'audience', '')),
        time: new Date(get(degree, 'time', '')).toISOString().replace('Z', ''),
        capacityId: toNumber(get(degree, 'capacityId', '')),
      }
    })
  }

  getCouples = async (req, res) => {
    let couples = await couplesModel.getAll();
    couples = this.adapter(couples);
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

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await couplesModel.search({ text });
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }
  sort = async (req, res) => {
    let { sortBy, sortDesc, items } = req.body;
    let sorted = await couplesModel.sort({ sortBy, sortDesc, items });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }

}

module.exports = new CouplesController();
