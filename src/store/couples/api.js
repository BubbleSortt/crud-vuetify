import Api from '@/api/index';

class Couples extends Api {

  getAll = () => this.rest('couples/');

  create = ({ time, audience, capacityId }) => this.rest('couples/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ time, audience, capacityId }),
  })

  delete = ( id ) => this.rest('couples/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ({ id, time, audience, capacityId }) => this.rest('couples/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, time, audience, capacityId }),
  })

  search = ({ text }) => this.rest('couples/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  sort = ({ sortBy, sortDesc, items }) => this.rest('couples/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sortBy, sortDesc, items }),
  })
}

export default new Couples();
