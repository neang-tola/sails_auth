/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res, next) {
    var params = {
                  'category_name': req.body.cat_name,
                  'description': req.body.description  };

    Category.create(params, function (err, results) {
      if (err)	return next(err);
      res.status(201);
      res.json(results);
    });
  },

  find: function (req, res, next) {
    var id = req.param('id');
    var isShortCut = isShortCut(id);

    if (isShortCut === true) {
      return next();
    }

    if (id) {
      Category.findOne(id, function (err, results) {
        if (results === undefined) return res.notFound();

        if (err)	return next(err);

        res.json(results);
      });
    } else {
      var conditional = req.param('where');

      if (_.isString(conditional)) {
        conditional = JSON.parse(conditional);
      }

      var options = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip') || undefined,
        sort: req.param('sort') || undefined,
        where: conditional || undefined
      }

      // console.log('This is the options ', options);
      Category.find(options, function (err, results) {
        if (results === undefined)	return res.notFound();

        if (err)	return next(err);

        res.json(results);
      });
    }

    function isShortCut(id) {
      if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
        return true;
      }
    }
  }
};

