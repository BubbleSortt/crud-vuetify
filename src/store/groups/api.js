import Api from '@/api/index';

class Groups extends Api {

  getAll = () => this.rest('groups/');

  create = ( { speciality, name, leader, year } ) => this.rest('groups/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ speciality, name, leader, year }),
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
