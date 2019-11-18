'use strict';

/**
 * Department.js controller
 *
 * @description: A set of functions called "actions" for managing `Department`.
 */

module.exports = {

  /**
   * Retrieve department records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.department.search(ctx.query);
    } else {
      return strapi.services.department.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a department record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.department.fetch(ctx.params);
  },

  /**
   * Count department records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.department.count(ctx.query);
  },

  /**
   * Create a/an department record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.department.add(ctx.request.body);
  },

  /**
   * Update a/an department record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.department.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an department record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.department.remove(ctx.params);
  }
};
