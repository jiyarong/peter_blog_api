'use strict';

const Controller = require('./application');

class CategoryController extends Controller {
  async index () {
    const categories = await this.ctx.model.Category.findAll()
    this.success(categories)
  }
}

module.exports = CategoryController