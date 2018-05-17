'use strict';

const Controller = require('./application');

class CategoryController extends Controller {
  async index () {
    const categories = await this.ctx.model.Category.findAll(
      {
        where: {parent_id: null},
        include: [
          {
            model: this.app.model.Category,
            as: 'children',
            attributes: ['id', 'name', 'parent_id']
          }
        ]
      }
    )
    this.success(categories)
  }
}

module.exports = CategoryController