'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GradesSchema extends Schema {
  up () {
    this.table('grades', (table) => {
      table.integer('teacher_id').unsigned().references('id').inTable('teachers')
    })
  }

  down () {
    this.table('grades', (table) => {
    })
  }
}

module.exports = GradesSchema
