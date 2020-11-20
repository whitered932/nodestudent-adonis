'use strict'

const Teacher = use('App/Models/Teacher');

class TeacherController {
  async create({request, response, auth}) {
    const teacher = await Teacher.find('1');
    const grade = await teacher.grade().fetch();
    return response.send({grade});
  };
}

module.exports = TeacherController
