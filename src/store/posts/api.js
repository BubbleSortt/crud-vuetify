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
}

export default new Posts();
