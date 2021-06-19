const Category = require("../models/category");

exports.getCategoryId = (req, res, next, id) => {
  Category.findById(id).exec((err, cat) => {
    if (err) {
      return res.status(400).json({
        error: "Category Not Found",
      });
    }
    req.category = cat;

    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category Not able to save",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  console.log(req.category);
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find({}).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No Category Found",
      });
    }
    res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Error updating Category ",
      });
    }
    res.json(updatedCategory);
  });
};
exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Error deleting Category ",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};
