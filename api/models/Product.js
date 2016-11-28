/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    product_name: {
      type: 'string',
      required: true
    },
    product_image: {
      type: 'string'
    },
    price: {
      type: 'float',
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
    sequance: {
      type: 'integer',
      size: 10
    },
    categories: {
      model: 'category'
    }
  }
};

