const capacitiesModel = require('./../services/services.capacities')
const { map, toNumber, get } = require('lodash');

class CapacitiesController {

  getCapacities = async (req, res) => {
    let capacities = await capacitiesModel.getAll();
    capacities = map(capacities, (capacity) => {
      return {
        id: toNumber(get(capacity, 'id', '')),
        hours: toNumber(get(capacity, 'кол-во_часов', '')),
        lessonId: toNumber(get(capacity, 'id_предмета', '')),
        teacherId: toNumber(get(capacity, 'id_преподавателя', '')),
        groupId: toNumber(get(capacity, 'id_группы', '')),
      }
    })
    res.send(capacities);
  }

  createCapacity = async (req, res) => {
    const createdGroup = await capacitiesModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateCapacity = async (req, res) => {
    const updatedRow = await capacitiesModel.update(req.body);
    res.status(200).json(updatedRow);
  }

  deleteCapacity = async (req, res) => {
    const { id } = req.body;
    const removedId = await capacitiesModel.delete(id)
    res.status(200).json({ id: removedId })
  }
}

module.exports = new CapacitiesController();
