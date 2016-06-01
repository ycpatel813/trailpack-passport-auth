'use strict'

const Trailpack = require('trailpack')
const _ = require('lodash')
const lib = require('./lib')

module.exports = class MongoosepassportTrailpack extends Trailpack {

  /**
   * Check express4 is used and verify session configuration
   */
  validate() {
    if (!_.includes(_.keys(this.app.packs), 'express4') && !_.includes(_.keys(this.app.packs), 'express')) {
      return Promise.reject(new Error('This Trailpack work only for express !'))
    }

    if (this.app.config.session.strategies && this.app.config.session.strategies.jwt &&
      _.get(this.app, 'config.session.jwt.tokenOptions.secret') === 'mysupersecuretoken') {
      return Promise.reject(new Error('You need to change the default token !'))
    }

    return Promise.all([
      lib.Validator.validatePassportsConfig(this.app.config.session)
    ])
  }

  /**
   * Initialise passport functions and load strategies
   */
  configure() {
    lib.Passports.init(this.app)
    lib.Passports.loadStrategies(this.app)
  }

  constructor(app) {
    super(app, {
      pkg: require('./package')
    })
  }
}

