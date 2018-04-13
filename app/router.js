'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //router.get('/', controller.home.index);
  router.resources('posts', '/api/posts', controller.post);
  router.post('/api/users/register', controller.user.register);
  router.post('/api/users/login', controller.user.login)
};
