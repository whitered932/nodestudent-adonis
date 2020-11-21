'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// AuthRoutes
Route.group('auth', () => {
  // Регистрация
  Route.post('/register', 'AuthController.register');
  // Логин
  Route.post('/login', 'AuthController.login');
  // Логаут
  Route.post('/logout', 'AuthController.logout');
}).prefix('api/auth');

// TeacherRoutes
Route.group('teacher', () => {
  // Найти по ID
  Route.post('/find', 'TeacherController.find');
  // Найти всех
  Route.post('/all', 'TeacherController.all');
  // Создать
  Route.post('/create', 'TeacherController.create');
}).prefix('api/teacher').middleware('auth');
