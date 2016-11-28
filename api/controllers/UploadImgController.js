/**
 * UploadImgController
 *
 * @description :: Server-side logic for managing Uploadimgs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crop: function (req, res) {
    ImageService
      .crop(req.param('file'), {
        x: req.param('x'),
        y: req.param('y'),
        width: req.param('width'),
        height: req.param('height')
      })
      .then(StorageService.upload)
      .then(res.ok)
      .catch(res.negotiate);
  }
};

