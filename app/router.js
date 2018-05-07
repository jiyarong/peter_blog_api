'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { validateUser, validateUserAdmin } = middleware
  //router.get('/', controller.home.index);
  //router.resources('posts', '/api/posts', controller.post);
  router.resources('categories', '/api/categories', controller.category);

  router.post('/api/comments', validateUser(), controller.comment.create);

  router.get('/api/posts', controller.post.index);
  router.get('/api/posts/recent_posts', controller.post.recent_posts);
  router.get('/api/posts/:id', controller.post.show);
  router.post('/api/posts', validateUser(), controller.post.create);
  router.put('/api/posts/:id/update', validateUser(), controller.post.update);
  router.delete('/api/posts/:id', validateUser(), controller.post.destroy)

  router.post('/api/users/register', controller.user.register);
  router.post('/api/users/login', controller.user.login);
  router.post('/api/users/update_avatar',validateUser(), controller.user.update_avatar);
  router.get('/api/users', validateUser(), validateUserAdmin(), controller.user.index);
  router.put('/api/users/:id', validateUser(), validateUserAdmin(), controller.user.update);
  router.get('/api/users/get_validate_code', controller.user.get_validate_code)
};
