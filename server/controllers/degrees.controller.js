const degreesModel = require('./../services/services.degrees')
const { map, toNumber, toString, get } = require('lodash');

class LessonsController {

  getDegrees = async (req, res) => {
    let degrees = await degreesModel.getAll();
    degrees = map(degrees, (degree) => {
      return {
        id: toNumber(get(degree, 'id', '')),
        name: toString(get(degree, 'Наименование_степени', '')),
      }
    })
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
}

module.exports = new LessonsController();
