const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //file system . No need to install comes in node js
const category = require("../models/category");

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
      if (file.photo.size > 3000000) {
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

exports.getAProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

//we need to create this middleware for photos . if we add mp3 then also we need to add this as well
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res, next) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this product",
      });
    }
    res.json({
      message: "Deletion was successful",
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res, next) => {
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

    //Updation of the code
    let product = req.product;
    product = _.extend(product, fields);
    //handle the files here
    //checking the size
    if (file.photo) {
      if (file.photo.size > 3000000) {
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
          error: "Updation of the product data failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  "-photo soo that it wont load that photo as because it wil take a lot of time to load";
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, items) => {
      if (err) {
        return res.status(400).json({
          error: "Couldn't Find the product",
        });
      }
      res.json(items);
    });
};

exports.getACategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myCalculation = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myCalculation, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "The bulk Operation failed",
      });
    }
    next();
  });
};
