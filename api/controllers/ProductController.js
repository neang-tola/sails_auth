/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res, next) {
    //var img_product;
    var img_file = uploadImg(req.file('photo'), res);
    console.log(img_file);
    return false;
    //if(pro_img.status == 200)
    //  img_product = pro_img.files;

    var params = { 'product_name': req.body.pro_name,
                   'product_image': '',
                   'price': req.body.price,
                   'description': req.body.description,
                   'sequance': req.body.order,
                   'categories': req.body.category};

    Product.create(params, function (err, results) {
      if (err)	return next(err);
      res.status(201);
      res.json(results);
    });

    function uploadImg(avatar, cb) {
      avatar.upload({
        dirname: '../../assets/images',
        // don't allow the total upload size to exceed ~10MB
        maxBytes: 10000000
      },function whenDone(err, uploadedFiles) {
        //sails.log.debug('file is :: ', +uploadedFiles);
        if (err) {
          return cb.json({ status: 400, message: err, files: '' });
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0){
          return cb.json({status: 400, message: 'No file was uploaded', files: '' });
        }
        //console.log(uploadedFiles[0].fd); return false;
        //var filename = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/')+1);
        return cb.json({ status: 200, message: 'uploaded successfully!', files: uploadedFiles[0].fd });
      });
    }
  },

  find: function (req, res, next) {
    var id = req.param('id');
    var isShortCut = isShortCut(id);

    if (isShortCut === true) {
      return next();
    }

    if (id) {

      Product.findOne(id).populate('categories', { select: ['category_name']}).exec(function (err, results) {
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
      Product.find(options).populate('categories', { select: ['category_name']}).exec(function (err, results) {
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

