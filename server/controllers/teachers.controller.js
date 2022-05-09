const teachersModel = require('./../services/services.teachers')
const { map, toNumber, toString, get } = require('lodash');

class TeachersController {

  getTeachers = async (req, res) => {
    let teachers = await teachersModel.getAll();
    teachers = map(teachers, (teacher) => {
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
    const teachers = await teachersModel.search(text)
    console.log(teachers, '\nteachers search')
    res.status(200).send(teachers)

  }
}

module.exports = new TeachersController();
