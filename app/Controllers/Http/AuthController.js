'use strict'

const User = use("App/Models/User");
const Hash = use('Hash');

class AuthController {
  async register({request, response}) {

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
      await auth.attempt(email, password)
      return response.json({
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
    return response.json({
      success: true
    });
  };
}

module.exports = AuthController
