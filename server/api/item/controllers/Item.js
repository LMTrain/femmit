'use strict';

/**
 * Item.js controller
 *
 * @description: A set of functions called "actions" for managing `Item`.
 */

module.exports = {

  /**
   * Retrieve item records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.item.search(ctx.query);
    } else {
      return strapi.services.item.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a item record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.item.fetch(ctx.params);
  },

  /**
   * Count item records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.item.count(ctx.query);
  },

  /**
   * Create a/an item record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.item.add(ctx.request.body);
  },

  /**
   * Update a/an item record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.item.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an item record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.item.remove(ctx.params);
  }
};
