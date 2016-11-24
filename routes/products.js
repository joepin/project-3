const router       = require('express').Router();
const multer       = require('multer');
const productModel = require('../models/product.js');
const auth         = require('../lib/auth.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${file.originalname.split('.')[1]}`)
  },
});

const upload = multer({ storage: storage });

function sendAsJSON (req, res, next) {
  res.json(res.rows);
}

router.route('/:id')
  .get(auth.authenticate, productModel.getOneProduct, sendAsJSON)
  .put(auth.authenticate, productModel.editProduct, sendAsJSON)
  .delete(auth.authenticate, productModel.deleteProduct, sendAsJSON);

router.route('/')
  .get(productModel.getAllProducts, sendAsJSON)
  .post(auth.authenticate, productModel.createProduct, productModel.preparePicturesForUpload, upload.array('postImages', 5), sendAsJSON);

module.exports = router;
