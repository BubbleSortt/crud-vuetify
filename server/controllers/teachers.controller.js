const teachersModel = require('./../services/services.teachers')
const { map, toNumber, toString, get } = require('lodash');

const DICTIONARY = {
  id: 'id_Преподавателя',
  surname: 'Фамилия',
  name: 'Имя',
  patronymic: 'Отчество',
  rate: 'Ставка',
  totalHours: 'Общее_кол-во_часов',
  postId: 'id_должности',
  degreeId: 'id_ученой степени',
}

class TeachersController {

  getTeachers = async (req, res) => {
    let teachers = await teachersModel.getAll();
    teachers = this.adapter(teachers)
    res.send(teachers);
  }


  createTeacher = async (req, res) => {
    const createdGroup = await teachersModel.create(req.body);
    res.status(200).json(createdGroup);
  }

  updateTeacher = async (req, res) => {
    const updatedRow = await teachersModel.update(req.body);
    res.status(200).json(updatedRow);
  }

  deleteTeacher = async (req, res) => {
    const { id } = req.body;
    const removedId = await teachersModel.delete(id)
    res.status(200).json({ id: removedId })
  }

  search = async (req, res) => {
    const { text } = req.body;
    let teachers = await teachersModel.search(text);
    teachers = this.adapter(teachers)
    res.status(200).send(teachers);
  }
  sort = async (req, res) => {
    let { sortBy, sortDesc } = req.body;
    sortBy = DICTIONARY[sortBy];
    console.log(sortBy, 'sort by')
    let sorted = await teachersModel.sort({ sortBy, sortDesc });
    sorted = this.adapter(sorted);
    res.status(200).send(sorted);
  }

  adapter = (teachers) => {
    return map(teachers, (teacher) => {
      return {
        id: toNumber(get(teacher, 'id_Преподавателя', '')),
        surname: toString(get(teacher, 'Фамилия', '')),
        name: toString(get(teacher, 'Имя', '')),
        patronymic: toString(get(teacher, 'Отчество', '')),
        rate: toNumber(get(teacher, 'Ставка', '')),
        totalHours: toNumber(get(teacher, 'Общее_кол-во_часов', '')),
        postId: toNumber(get(teacher, 'id_должности', '')),
        degreeId: toNumber(get(teacher, 'id_ученой степени', '')),
      }
    })
  }

}

module.exports = new TeachersController();
