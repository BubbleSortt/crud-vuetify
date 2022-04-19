import Api from '@/api/index';

class Groups extends Api {

  getAll = () => this.rest('groups/');

  create = ( student ) => this.rest('groups/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })

  delete = ( id ) => this.rest('groups/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ( student ) => this.rest('groups/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })
}

export default new Groups({});
