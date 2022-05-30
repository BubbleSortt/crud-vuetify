import Api from '@/api/index';

class Capacities extends Api {

  getAll = () => this.rest('capacities/');

  create = ({ hours, lessonId, teacherId, groupId }) => this.rest('capacities/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hours, lessonId, teacherId, groupId }),
  })

  delete = ( id ) => this.rest('capacities/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ({ id, hours, lessonId, teacherId, groupId }) => this.rest('capacities/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, hours, lessonId, teacherId, groupId }),
  })

  search = ({ text }) => this.rest('capacities/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  sort = ({ sortBy, sortDesc, items }) => this.rest('capacities/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sortBy, sortDesc, items }),
  })

  procedure = ({ lessonId, groupId, hours }) => this.rest('/capacities/procedure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lessonId, groupId, hours }),
  })

}

export default new Capacities();
