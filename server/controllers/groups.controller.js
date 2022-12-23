const groupsModel = require('./../services/services.groups')
const { map, toNumber, toString, get } = require('lodash');

class GroupsController {

  adapter = (groups) => {
    return map(groups, (group) => {
      return {
        id: toNumber(get(group, 'id', '')),
        speciality: toString(get(group, 'speciality', '')),
        name: toString(get(group, 'name', '')),
        leader: toString(get(group, 'leader', '')),
        year: toNumber(get(group, 'year', ''))
      }
    })
  }

  getGroups = async (req, res) => {
    let groups =  await groupsModel.getAll();
    groups = this.adapter(groups);
    res.send(groups);
  }

  createGroup = async (req, res) => {
    try {
      const createdGroup = await groupsModel.create(req.body);
      res.status(200).json(createdGroup);
    } catch (e) {
      res.status(400).json({severity: 'error', message: e.message})
    }

  }

  updateGroup = async (req, res) => {
    try {
      const updatedRow = await groupsModel.update(req.body);
      res.status(200).json(updatedRow);
    } catch (e) {
      res.status(400).json({severity: 'error', message: e.message})
    }

  }

  deleteGroup = async (req, res) => {
    const { id } = req.body;
    const removedId = await groupsModel.delete(id)
    res.status(200).json({ id: removedId })
  }

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await groupsModel.search({ text });
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }
  sort = async (req, res) => {
    let { sortBy, sortDesc } = req.body;
    let sorted = await groupsModel.sort({ sortBy, sortDesc });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }
}

module.exports = new GroupsController();
