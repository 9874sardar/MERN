const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //file system . No need to install comes in node js

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  //it takes 3 field parameters
  // 1. error 2. field description price etc 3. files
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem occured in an image",
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({
        error: "Please include all the fields",
      });
    }

    let product = new Product(fields);

    //handle the files here
    //checking the size
    if (file.photo) {
      if (file.photo.size > 3000000){
        return res.status(400).json({
          error: "File size should be less than 3 MB",
        });
    }
      product.photo.data = fs.readFileSync(file.photo.path); //filepath
      product.photo.contentType = file.photo.type;
    }

    //save to DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving the data failed",
        });
      }
      res.json(product);
    });
  });
};
