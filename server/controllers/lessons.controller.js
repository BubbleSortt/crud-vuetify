const lessonsModel = require('./../services/services.lessons')
const { map, toNumber, toString, get } = require('lodash');

class LessonsController {

  adapter = (posts) => {
    return map(posts, (post) => {
      return {
        id: toNumber(get(post, 'id', '')),
        name: toString(get(post, 'name', '')),
      }
    })
  }

  getLessons = async (req, res) => {
    let posts = await lessonsModel.getAll();
    posts = this.adapter(posts);
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

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await lessonsModel.search({ text });
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }
  sort = async (req, res) => {
    let { sortBy, sortDesc, items } = req.body;
    let sorted = await lessonsModel.sort({ sortBy, sortDesc, items });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }
}

module.exports = new LessonsController();
