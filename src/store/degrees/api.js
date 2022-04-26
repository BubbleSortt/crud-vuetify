import Api from '@/api/index';

class Degrees extends Api {

  getAll = () => this.rest('degrees/');

  create = ({ name }) => this.rest('degrees/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  delete = ( id ) => this.rest('degrees/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ({ id, name }) => this.rest('degrees/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
}

export default new Degrees();
