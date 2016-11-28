module.exports.policies = {

  '*': ['isAuthenticated'],

  AuthController: {
    '*': true
  },

  ProductController: {
    '*': true
  },

  CategoryController: {
    '*': true
  }
};
