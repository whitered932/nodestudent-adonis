'use strict'

const User = use("App/Models/User");
const Hash = use('Hash');

class AuthController {
  async register ({request, response, view}) {

    const {username, email, password} = request.body;
    try {
      const user = await User.create({
        username, email, password
      });
    } catch (e) {
      return response.status(500).send({
        success: false,
        message: "Что-то пошло не так",
        error: e
      });
    }
    return response.status(200).send({
      success: true,
      message: "Регистрация прошла успешно"
    });

  };
}

module.exports = AuthController
