'use strict';

const Controller = require('./application');

class CommentController extends Controller {

  //POST /api/comments
  async create () {
    var comment = this.ctx.model.Comment.build(this.ctx.request.body)
    const user = await this.currentUser()
    if (user != undefined) {
      comment.created_by = user.id
      const result = await comment.save()
      this.success(result)
    } else {
      return this.render_405()
    }
  }
}

module.exports = CommentController