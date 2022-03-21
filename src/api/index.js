class Students {
  constructor() {
    this.base = '/rest';
  }
  rest = async (url, options) => {
    return await fetch(this.base + url, options);
  };

  students = () => this.rest('/students.json');

  add = ( student ) => this.rest('/add-student', {
    method: 'POST',
    data: student
  }).then(() => ({...student, id: new Date().getTime()}))

  remove = ( id ) => this.rest('/remove-student', {
    method: 'POST',
    data: id,
  }).then(() => id)

  update = ( student ) => this.rest('/update-student', {
    method: 'POST',
    data: student,
  }).then(() => student)
}

export default new Students();
