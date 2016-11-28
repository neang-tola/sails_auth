/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    category_name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      size: 500
    },
    status: {
      type: 'boolean',
      defaultsTo: true
    },
    products:{
      collection: 'product',
      via: 'categories'
    }
  }
};

