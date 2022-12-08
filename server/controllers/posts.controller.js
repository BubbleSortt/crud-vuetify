const postsModel = require('./../services/services.posts')
const { map, toNumber, toString, get } = require('lodash');

class PostsController {

  adapter = (posts) => {
    return map(posts, (post) => {
      return {
        id: toNumber(get(post, 'id', '')),
        post: toString(get(post, 'post', '')),
      }
    })
  }

  getGroups = async (req, res) => {
    let posts = await postsModel.getAll();
    posts = this.adapter(posts);
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

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await postsModel.search({ text });
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }

  sort = async (req, res) => {
    let { sortBy, sortDesc, items } = req.body;
    let sorted = await postsModel.sort({ sortBy, sortDesc, items });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }
}

module.exports = new PostsController();
