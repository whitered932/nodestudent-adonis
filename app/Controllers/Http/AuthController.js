'use strict'

const User = use("App/Models/User");
const Hash = use('Hash');
const {validate} = use('Validator');

class AuthController {
  async register({request, response, session}) {

    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required'
    }

    const validation = await validate(request.all(), rules);

    const {username, email, password} = request.body;

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.json({success: false});
    }

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
    return response.status(201).json({
      success: true,
      message: "Регистрация прошла успешно"
    });

  };

  async login({request, response, auth}) {
    const {username, email, password} = request.body;
    try {
      const user = await User.findBy('username', username);
      if (!user) {
        return response.status(404).json({
          success: false,
          message: "Пользователь с таким именем не найден"
        })
      }
      try {
        await auth.attempt(email, password)
      } catch (e) {
        return response.status(500).send({
          success: false,
          message: "Уже авторизован",
          error: e
        });
      }
      return response.status(200).json({
        success: true
      });
    } catch (e) {
      return response.status(500).send({
        success: false,
        message: "Что-то пошло не так",
        error: e
      });
    }
  };

  async logout({auth, response}) {
    await auth.logout();
  };
}

module.exports = AuthController
