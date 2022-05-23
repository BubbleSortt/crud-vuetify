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

  search = ({ text }) => this.rest('degrees/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  sort = ({ sortBy, sortDesc, items }) => this.rest('degrees/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sortBy, sortDesc, items }),
  })
}

export default new Degrees();
