import Api from '@/api/index';

class Lessons extends Api {

  getAll = () => this.rest('lessons/');

  create = ({ name }) => this.rest('lessons/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  delete = ( id ) => this.rest('lessons/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ({ id, name }) => this.rest('lessons/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
}

export default new Lessons();
