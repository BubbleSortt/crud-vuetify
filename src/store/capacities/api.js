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
}

export default new Capacities();
