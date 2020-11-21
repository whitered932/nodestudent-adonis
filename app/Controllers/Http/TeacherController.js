'use strict'

const Teacher = use('App/Models/Teacher');
const {validate} = use('Validator');


class TeacherController {
  async find({request, response, auth}) {
    try {
      const teacher = await Teacher.find(request.body.id);
      return response.status(200).json({teacher});
    } catch (e) {
      return response.status(500).json({
        success: false,
        message: "Что-то пошло не так"
      });
    }
  };

  async create({request, response, session}) {
    const {name, birthday} = request.body;

    const rules = {
      name: 'required',
    }
    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.status(500).json({success: false, errors: validation.messages()});
    }
    try {
      await Teacher.create({name, birthday});
      return response.status(200).json({
        success: true,
        message: "Профиль учителя создан успешно"
      })
    } catch (e) {
      return response.json({
        success: false,
        message: "Что-то пошло не так",
        error: e
      });
    }
  };

  async all({request, response, auth}) {
    try {
      const teachers = await Teacher.all();
      return response.status(200).json({
        success: true,
        teachers
      });
    } catch (e) {
      return response.status(500).json({
        success: false,
        message: "Что-то пошло не так"
      })
    }

  };
}

module.exports = TeacherController
