'use strict'

module.exports = {
  redirect: {
    login: '/login',//Login successful
    logout: '/logout'//Logout successful
  },

  onUserLogged: (app, user) => {
    return Promise.resolve(user)
  }
}
