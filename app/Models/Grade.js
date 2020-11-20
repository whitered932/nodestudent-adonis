'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Grade extends Model {
  teacher() {
    return this.belongsTo('App/Models/Teacher', 'id', 'grade_id');
  }
}

module.exports = Grade
