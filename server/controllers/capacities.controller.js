const capacitiesModel = require('./../services/services.capacities')
const { map, toNumber, get, toString } = require('lodash');

const DICTIONARY = {
  id: 'id',
  hours: 'кол-во_часов',
  lessonId: 'id_предмета',
  teacherId: 'id_преподавателя',
  groupId: 'id_группы',
}

class CapacitiesController {

  adapter = (capacities) => {
    return map(capacities, (capacity) => {
      return {
        id: toNumber(get(capacity, 'id', '')),
        hours: toNumber(get(capacity, 'hours', '')),
        lessonId: toNumber(get(capacity, 'lessonid', '')),
        teacherId: toNumber(get(capacity, 'teacherid', '')),
        groupId: toNumber(get(capacity, 'groupid', '')),
        groupName: toString(get(capacity, 'groupname', '')),
        teacherName: toString(get(capacity, 'teachername', '')),
        lessonName: toString(get(capacity, 'lessonname', '')),
      }
    })
  }

  getCapacities = async (req, res) => {
    let capacities = await capacitiesModel.getAll();
    capacities = this.adapter(capacities);
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

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await capacitiesModel.search({ text });
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }
  sort = async (req, res) => {
    let { sortBy, sortDesc, items } = req.body;
    let sorted = await capacitiesModel.sort({ sortBy, sortDesc, items });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }

  callProcedure = async (req, res) => {
    const { lessonId, groupId, hours } = req.body;
    const response = await capacitiesModel.callProcedure({ lessonId, groupId, hours });
    res.status(200).send(response);
  }
}

module.exports = new CapacitiesController();
