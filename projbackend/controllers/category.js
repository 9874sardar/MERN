const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, catrgy) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = catrgy;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, catgy) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to create Category in databse",
      });
    }
    res.json({ catgy });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find(id).exec((err, categryitems) => {
    if (err) {
      return res.status(400).json({
        error: "No category Found",
      });
    }
    res.json(categryitems);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  // return res.json(req.category);

  category.save((err, updateCategy) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to updated category",
      });
    }

    res.json(updateCategy);
  });
};
exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, catrgy) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to deleted category",
      });
    }
    res.json({
      message: `Successfully Deleted : ${catrgy.name}`,
    });
  });
};
