'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    this.table('students', (table) => {
      table.integer('grade_id').unsigned().references('id').inTable('grades')
    })
  }

  down () {
    this.alter('students', (table) => {
    })
  }
}

module.exports = StudentsSchema
