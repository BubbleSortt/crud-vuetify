const lessonsModel = require('./../services/services.lessons')
const { map, toNumber, toString, get } = require('lodash');

class LessonsController {

  getLessons = async (req, res) => {
    let posts = await lessonsModel.getAll();
    posts = map(posts, (post) => {
      return {
        id: toNumber(get(post, 'id', '')),
        name: toString(get(post, 'Название_предмета', '')),
      }
    })
    res.send(posts);
  }

  createLesson = async (req, res) => {
    const createdGroup = await lessonsModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateLesson = async (req, res) => {
    const updatedRow = await lessonsModel.update(req.body);
    res.status(200).json(updatedRow);
  }

  deleteLesson = async (req, res) => {
    const { id } = req.body;
    const removedId = await lessonsModel.delete(id)
    res.status(200).json({ id: removedId })
  }
}

module.exports = new LessonsController();
