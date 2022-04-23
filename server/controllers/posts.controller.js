const postsModel = require('./../services/services.posts')
const { map, toNumber, toString, get } = require('lodash');

class PostsController {

  getGroups = async (req, res) => {
    let posts = await postsModel.getAll();
    posts = map(posts, (post) => {
      return {
        id: toNumber(get(post, 'id должности', '')),
        post: toString(get(post, 'Должность', '')),
      }
    })
    res.send(posts);
  }

  createGroup = async (req, res) => {
    const createdGroup = await postsModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateGroup = async (req, res) => {
    const updatedRow = await postsModel.update(req.body);
    res.status(200).json(updatedRow);
  }

  deleteGroup = async (req, res) => {
    const { id } = req.body;
    const removedId = await postsModel.delete(id)
    res.status(200).json({ id: removedId })
  }
}

module.exports = new PostsController();
