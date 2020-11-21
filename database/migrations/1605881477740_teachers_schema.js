'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeachersSchema extends Schema {
  up () {
    this.table('teachers', (table) => {
      table.integer('grade_id').unsigned().references('id').inTable('grades')
    })
  }

  down () {
    this.alter('teachers', (table) => {
    })
  }
}

module.exports = TeachersSchema
