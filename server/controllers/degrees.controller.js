const degreesModel = require('./../services/services.degrees')
const { map, toNumber, toString, get } = require('lodash');


class LessonsController {

  adapter = (degrees) => {
    return map(degrees, (degree) => {
      return {
        id: toNumber(get(degree, 'id', '')),
        name: toString(get(degree, 'name', '')),
      }
    })
  }

  getDegrees = async (req, res) => {
    let degrees = await degreesModel.getAll();
    degrees = this.adapter(degrees)
    res.send(degrees);
  }

  createDegree = async (req, res) => {
    const createdGroup = await degreesModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateDegree = async (req, res) => {
    const updatedRow = await degreesModel.update(req.body);
    res.status(200).json(updatedRow);
  }

  deleteDegree = async (req, res) => {
    const { id } = req.body;
    const removedId = await degreesModel.delete(id)
    res.status(200).json({ id: removedId })
  }

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await degreesModel.search({ text });
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }
  sort = async (req, res) => {
    let { sortBy, sortDesc } = req.body;
    let sorted = await degreesModel.sort({ sortBy, sortDesc });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }
}

module.exports = new LessonsController();
