'use strict'

const Model = require('trails-model')

/**
 * @module User
 * @description User model for basic auth
 */
module.exports = class User extends Model {

  static config() {

  }

  static schema() {
    return {
      username: {
        type: 'string',
        unique: true
      },
      email: {
        type: 'string',
        unique: true
      },
      passports: [{type: 'ObjectId', ref: 'Passport'}]
      //collection: 'Passport',
      //via: 'user'

    }
  }
}
