'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

//controllers
var sessions      = require('../controllers/sessions-controller');

module.exports    = function (app, passport) {

  // sessions
  app.route('/login')
     .all(setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/'}))
     .all(isUnauthenticated)
     .get(setRender('login'), sessions.getLogin)
     .post(sessions.postLogin);

	app.route('/logout')
     .all(setRedirect({auth: '/', success: '/'}))
     .all(isAuthenticated)     
     .get(sessions.logout);

};