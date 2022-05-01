import Api from '@/api/index';

class Posts extends Api {

  getAll = () => this.rest('teachers/');

  create = ({ name, surname, patronymic, rate, totalHours, postId, degreeId }) => this.rest('teachers/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, patronymic, rate, totalHours, postId, degreeId }),
  })

  delete = ( id ) => this.rest('teachers/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  update = ({ id, name, surname, patronymic, rate, totalHours, postId, degreeId }) => this.rest('teachers/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name, surname, patronymic, rate, totalHours, postId, degreeId }),
  })
}

export default new Posts();
