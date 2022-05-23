const groupsModel = require('./../services/services.groups')
const { map, toNumber, toString, get } = require('lodash');

const DICTIONARY = {
  id: 'id',
  speciality: 'Специальность',
  name: 'Название_группы',
  leader: 'Фамилия_старосты',
  year: 'Год_поступления',
}

class GroupsController {

  adapter = (groups) => {
    return map(groups, (group) => {
      return {
        id: toNumber(get(group, 'id', '')),
        speciality: toString(get(group, 'Специальность', '')),
        name: toString(get(group, 'Название_группы', '')),
        leader: toString(get(group, 'Фамилия_старосты', '')),
        year: toNumber(get(group, 'Год_поступления', ''))
      }
    })
  }

  getGroups = async (req, res) => {
    let groups =  await groupsModel.getAll();
    groups = this.adapter(groups);
    res.send(groups);
  }

  createGroup = async (req, res) => {
    const createdGroup = await groupsModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateGroup = async (req, res) => {
    const updatedRow = await groupsModel.update(req.body);
    res.status(200).json(updatedRow);
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
    let { sortBy, sortDesc, items } = req.body;
    sortBy = DICTIONARY[sortBy];
    let sorted = await groupsModel.sort({ sortBy, sortDesc, items });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }
}

module.exports = new GroupsController();
