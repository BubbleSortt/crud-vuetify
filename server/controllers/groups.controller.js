const groupsModel = require('./../services/services.groups')
const { map, toNumber, toString, get } = require('lodash');

class GroupsController {

  getGroups = async (req, res) => {
    let groups =  await groupsModel.getAll();
    groups = map(groups, (group) => {
      return {
        id: toNumber(get(group, 'id', '')),
        speciality: toString(get(group, 'Специальность', '')),
        name: toString(get(group, 'Название_группы', '')),
        leader: toString(get(group, 'Фамилия_старосты', '')),
        year: toNumber(get(group, 'Год_поступления', ''))
      }
    })
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
}

module.exports = new GroupsController();