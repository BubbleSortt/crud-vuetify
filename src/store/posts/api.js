import Api from '@/api/index';

class Posts extends Api {

  getAll = () => this.rest('posts/');

  create = ({ post }) => this.rest('posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post }),
  })

  delete = ( id ) => this.rest('posts/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ( post ) => this.rest('posts/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  search = ({ text }) => this.rest('posts/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  sort = ({ sortBy, sortDesc, items }) => this.rest('posts/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sortBy, sortDesc, items }),
  })
}

export default new Posts();
